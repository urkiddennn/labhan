// convex/services.ts
import { query } from "./_generated/server";
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