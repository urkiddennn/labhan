// convex/services.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listServices = query({
    args: { shopId: v.id("shops") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("services")
            .withIndex("by_shop", (q) => q.eq("shopId", args.shopId))
            .collect();
    },
});

export const addService = mutation({
    args: {
        shopId: v.id("shops"),
        name: v.string(),
        price: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("services", {
            shopId: args.shopId,
            name: args.name,
            price: args.price,
        });
    },
});

export const updateService = mutation({
    args: {
        serviceId: v.id("services"),
        price: v.number(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.serviceId, {
            price: args.price,
        });
    },
});

export const deleteService = mutation({
    args: {
        serviceId: v.id("services"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.serviceId);
    },
});