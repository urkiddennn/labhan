import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();
    },
});

export const create = mutation({
    args: {
        email: v.string(),
        password: v.string(),
        name: v.optional(v.string()),
        role: v.string(),
    },
    handler: async (ctx, args) => {
        // Check if user already exists
        const existing = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();

        if (existing) {
            throw new Error("Email already registered");
        }
        return await ctx.db.insert("users", {
            email: args.email,
            password: args.password,
            name: args.name,
            role: args.role,
        });
    },
});