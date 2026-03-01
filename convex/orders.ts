// convex/orders.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
    args: {
        shopId: v.id("shops"),
        customerId: v.id("customers"),
        totalAmount: v.number(),
    },
    handler: async (ctx, args) => {
        const orderId = await ctx.db.insert("orders", {
            shopId: args.shopId,
            customerId: args.customerId,
            status: "pending",
            totalAmount: args.totalAmount,
        });
        return orderId;
    },
});

export const listActiveOrders = query({
    args: { shopId: v.id("shops") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("orders")
            .withIndex("by_shop", (q) => q.eq("shopId", args.shopId))
            .filter((q) => q.neq(q.field("status"), "collected"))
            .collect();
    },
});