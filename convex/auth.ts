/// <reference types="node" />
import { SignJWT, jwtVerify } from "jose";

const jwtSecretEnv = process.env.JWT_SECRET;
if (!jwtSecretEnv) {
    throw new Error("Missing JWT_SECRET environment variable. Please set it in your Convex deployment settings.");
}
const JWT_SECRET = new TextEncoder().encode(jwtSecretEnv);

export async function signToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (e) {
        return null;
    }
}
