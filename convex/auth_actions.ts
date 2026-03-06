import { action } from "./_generated/server";
import { v } from "convex/values";
import { signToken } from "./auth";
import { rateLimiter } from "./rateLimit";
import { api } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import bcrypt from "bcryptjs";
import { verifyTurnstile } from "./turnstile";

interface LoginResult {
    token: string;
    user: {
        id: Id<"users">;
        email: string;
        name?: string;
        role: string;
    };
}

export const login = action({
    args: {
        email: v.string(),
        password: v.string(),
        turnstileToken: v.string(),
    },
    handler: async (ctx, args): Promise<LoginResult> => {
        // Verify Turnstile token first
        const isHuman = await verifyTurnstile(ctx, args.turnstileToken);
        if (!isHuman) {
            throw new Error("Bot detection failed. Please try again.");
        }

        // Apply rate limiting by email
        await rateLimiter.limit(ctx, "login", { key: args.email });

        // Find user by email
        const user = await ctx.runQuery(api.users.getUserByEmail, { email: args.email });

        if (!user) {
            throw new Error("User not found");
        }

        // Verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(args.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        // Generate JWT
        const token = await signToken({ userId: user._id, email: user.email });

        return {
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role ?? "customer",
            }
        };
    },
});

export const signup = action({
    args: {
        email: v.string(),
        password: v.string(),
        name: v.optional(v.string()),
        role: v.string(),
        turnstileToken: v.string(),
    },
    handler: async (ctx, args): Promise<LoginResult> => {
        // Verify Turnstile token first
        const isHuman = await verifyTurnstile(ctx, args.turnstileToken);
        if (!isHuman) {
            throw new Error("Bot detection failed. Please try again.");
        }

        // Apply rate limiting by email
        await rateLimiter.limit(ctx, "signup", { key: args.email });

        // 1. Hash the password before saving
        const hashedPassword = await bcrypt.hash(args.password, 10);

        // 2. Create the user using the mutation with hashed password
        const userId: Id<"users"> = await ctx.runMutation(api.users.create, {
            ...args,
            password: hashedPassword,
        });

        const token = await signToken({ userId, email: args.email });

        return {
            token,
            user: {
                id: userId,
                email: args.email,
                name: args.name,
                role: args.role,
            }
        };
    },
});