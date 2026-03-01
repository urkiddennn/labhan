// convex/shops.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getShopsByOwner = query({
    args: { ownerId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("shops")
            .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
            .collect();
    },
});

export const getShop = query({
    args: { shopId: v.id("shops") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.shopId);
    },
});

export const createShop = mutation({
    args: {
        ownerId: v.string(),
        name: v.string(),
        latitude: v.number(),
        longitude: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("shops", {
            ownerId: args.ownerId,
            name: args.name,
            latitude: args.latitude,
            longitude: args.longitude,
        });
    },
});
export const updateShop = mutation({
    args: {
        shopId: v.id("shops"),
        name: v.optional(v.string()),
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { shopId, ...updates } = args;
        await ctx.db.patch(shopId, updates);
    },
});

export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("shops").collect();
    },
});
