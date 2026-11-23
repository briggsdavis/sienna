import rateLimiter from "@convex-dev/rate-limiter/convex.config"
import resend from "@convex-dev/resend/convex.config"
import { defineApp } from "convex/server"
import { v } from "convex/values"

const app = defineApp({
  env: {
    ADMIN_EMAILS: v.optional(v.string()),
    NOTIFY_EMAIL: v.optional(v.string()),
    EMAIL_FROM: v.optional(v.string()),
    RESEND_API_KEY: v.optional(v.string()),
    SITE_URL: v.optional(v.string()),
  },
})

app.use(resend)
app.use(rateLimiter)

export default app
