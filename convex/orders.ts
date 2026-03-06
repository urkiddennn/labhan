// convex/orders.ts - Triggering Sync
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser } from "./helpers";
import { rateLimiter } from "./rateLimit";

export const createOrder = mutation({
    args: {
        token: v.string(),
        shopId: v.id("shops"),
        serviceName: v.optional(v.string()),
        totalAmount: v.number(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUser(args.token);
        await rateLimiter.limit(ctx, "createOrder", { key: userId });
        const orderId = await ctx.db.insert("orders", {
            shopId: args.shopId,
            userId: userId,
            serviceName: args.serviceName,
            status: "pending",
            totalAmount: args.totalAmount,
            createdAt: Date.now(),
        });
        return orderId;
    },
});

export const listUserOrders = query({
    args: { token: v.string() },
    handler: async (ctx, args) => {
        const userId = await getAuthUser(args.token);
        const orders = await ctx.db
            .query("orders")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .order("desc")
            .collect();

        const ordersWithShop = await Promise.all(
            orders.map(async (order) => {
                const shop = await ctx.db.get(order.shopId);
                return {
                    ...order,
                    shopName: shop?.name || "Unknown Shop",
                };
            })
        );

        return ordersWithShop;
    },
});

export const listActiveOrders = query({
    args: { shopId: v.id("shops") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("orders")
            .withIndex("by_shop", (q) => q.eq("shopId", args.shopId))
            .filter((q) => q.neq(q.field("status"), "collected"))
            .order("desc")
            .collect();
    },
});

export const updateStatus = mutation({
    args: {
        token: v.string(),
        orderId: v.id("orders"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUser(args.token);
        const order = await ctx.db.get(args.orderId);
        if (!order) throw new Error("Order not found");

        const shop = await ctx.db.get(order.shopId);
        if (!shop || shop.ownerId !== userId) {
            throw new Error("Unauthorized: You do not own this shop");
        }

        await ctx.db.patch(args.orderId, {
            status: args.status,
        });
    },
});