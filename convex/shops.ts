// convex/shops.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser } from "./helpers";
import { rateLimiter } from "./rateLimit";

export const getShopsByOwner = query({
    args: { token: v.string() },
    handler: async (ctx, args) => {
        const userId = await getAuthUser(args.token);
        return await ctx.db
            .query("shops")
            .withIndex("by_owner", (q) => q.eq("ownerId", userId))
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
        token: v.string(),
        name: v.string(),
        latitude: v.number(),
        longitude: v.number(),
    },
    handler: async (ctx, args) => {

        const userId = await getAuthUser(args.token);
        return await ctx.db.insert("shops", {
            ownerId: userId,
            name: args.name,
            latitude: args.latitude,
            longitude: args.longitude,
        });
    },
});
export const updateShop = mutation({
    args: {
        token: v.string(),
        shopId: v.id("shops"),
        name: v.optional(v.string()),
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUser(args.token);
        await rateLimiter.limit(ctx, "updateShop", { key: userId });
        const { token, shopId, ...updates } = args;

        const shop = await ctx.db.get(shopId);
        if (!shop || shop.ownerId !== userId) {
            throw new Error("Unauthorized: You do not own this shop");
        }

        await ctx.db.patch(shopId, updates);
    },
});

export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("shops").collect();
    },
});
