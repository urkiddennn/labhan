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
        customerId: v.id("customers"),
        status: v.string(),
        totalAmount: v.number(),
    }).index("by_shop", ["shopId"]),

    services: defineTable({
        shopId: v.id("shops"),
        name: v.string(),
        price: v.number(),
    }).index("by_shop", ["shopId"])
});