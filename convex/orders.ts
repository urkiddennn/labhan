// convex/orders.ts - Triggering Sync
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
    args: {
        shopId: v.id("shops"),
        userId: v.id("users"),
        serviceName: v.optional(v.string()),
        totalAmount: v.number(),
    },
    handler: async (ctx, args) => {
        const orderId = await ctx.db.insert("orders", {
            shopId: args.shopId,
            userId: args.userId,
            serviceName: args.serviceName,
            status: "pending",
            totalAmount: args.totalAmount,
            createdAt: Date.now(),
        });
        return orderId;
    },
});

export const listUserOrders = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const orders = await ctx.db
            .query("orders")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
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
        orderId: v.id("orders"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.orderId, {
            status: args.status,
        });
    },
});