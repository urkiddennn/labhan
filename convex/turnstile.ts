import type { ActionCtx } from "./_generated/server";

export async function verifyTurnstile(_ctx: ActionCtx, token: string) {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    // Check for "Always Pass" testing key for local development
    if (secretKey === "1x00000000000000000000000000000000") {
        return true;
    }

    if (!secretKey) {
        // Fallback or warning if not set
        console.warn("TURNSTILE_SECRET_KEY not set in Convex environment variables");
        return true; // Or throw if you want to enforce it strictly
    }

    const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${secretKey}&response=${token}`,
        }
    );

    const data = await response.json();
    return data.success;
}
