// convex/services.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUser } from "./helpers";

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
        token: v.string(),
        shopId: v.id("shops"),
        name: v.string(),
        price: v.number(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUser(args.token);
        const shop = await ctx.db.get(args.shopId);

        if (!shop || shop.ownerId !== userId) {
            throw new Error("Unauthorized: You do not own this shop");
        }
        if (args.price <= 0) {
            throw new Error("Price must be greater than 0");
        }

        return await ctx.db.insert("services", {
            shopId: args.shopId,
            name: args.name,
            price: args.price,
        });
    },
});

export const updateService = mutation({
    args: {
        token: v.string(),
        serviceId: v.id("services"),
        price: v.number(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUser(args.token);
        const service = await ctx.db.get(args.serviceId);
        if (!service) throw new Error("Service not found");

        const shop = await ctx.db.get(service.shopId);
        if (!shop || shop.ownerId !== userId) {
            throw new Error("Unauthorized: You do not own this shop");
        }
        if (args.price <= 0) {
            throw new Error("Price must be greater than 0");
        }

        await ctx.db.patch(args.serviceId, {
            price: args.price,
        });
    },
});

export const deleteService = mutation({
    args: {
        token: v.string(),
        serviceId: v.id("services"),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUser(args.token);
        const service = await ctx.db.get(args.serviceId);
        if (!service) throw new Error("Service not found");

        const shop = await ctx.db.get(service.shopId);
        if (!shop || shop.ownerId !== userId) {
            throw new Error("Unauthorized: You do not own this shop");
        }

        await ctx.db.delete(args.serviceId);
    },
});