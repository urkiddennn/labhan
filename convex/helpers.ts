import { verifyToken } from "./auth";
import type { Id } from "./_generated/dataModel";

// validate JWT token and return user ID
export async function getAuthUser(token: string | undefined): Promise<Id<"users">> {
    if (!token) {
        throw new Error("Authenticaton required: Token missing");
    }
    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
        throw new Error("Authentication failed: Invalid or expired token");
    }


    return payload.userId as Id<"users">;

}