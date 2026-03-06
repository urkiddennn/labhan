import { RateLimiter, MINUTE, HOUR } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";


export const rateLimiter = new RateLimiter(components.rateLimiter, {

    login: { kind: "token bucket", rate: 5, period: 5 * MINUTE },

    signup: { kind: "token bucket", rate: 3, period: HOUR },

})