// convex/customers.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getByPhone = query({
    args: { shopId: v.id("shops"), phone: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("customers")
            .withIndex("by_shop_and_phone", (q) =>
                q.eq("shopId", args.shopId).eq("phone", args.phone)
            )
            .unique();
    },
});

export const create = mutation({
    args: { shopId: v.id("shops"), name: v.string(), phone: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.insert("customers", {
            shopId: args.shopId,
            name: args.name,
            phone: args.phone,
        });
    },
});