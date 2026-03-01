import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    shops: defineTable({
        ownerId: v.string(), // identifier for the shop owner (e.g., auth userId)
        name: v.string(),
        latitude: v.number(),
        longitude: v.number(),
    }).index("by_owner", ["ownerId"]),

    customers: defineTable({
        shopId: v.id("shops"),
        name: v.string(),
        phone: v.string()
    }).index("by_shop_and_phone", ["shopId", "phone"]),

    orders: defineTable({
        shopId: v.id("shops"),
        userId: v.optional(v.id("users")), // Connect directly to the authenticated user
        serviceName: v.optional(v.string()), // Added to track selected service
        status: v.string(),
        totalAmount: v.number(),
        createdAt: v.optional(v.number()),
    }).index("by_shop", ["shopId"])
        .index("by_user", ["userId"]),

    services: defineTable({
        shopId: v.id("shops"),
        name: v.string(),
        price: v.number(),
    }).index("by_shop", ["shopId"]),

    users: defineTable({
        name: v.optional(v.string()),
        email: v.string(),
        password: v.string(),
        role: v.optional(v.string()),
    }).index("by_email", ["email"]),
});