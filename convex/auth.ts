import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"
import { ConvexError } from "convex/values"
import type { QueryCtx } from "./_generated/server"
import { isAdminEmail, normalizeEmail } from "./lib"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        return { email: normalizeEmail(String(params.email ?? "")) }
      },
    }),
  ],
  callbacks: {
    async beforeSessionCreation(ctx, { userId }) {
      const queryCtx = ctx as unknown as QueryCtx
      const user = await queryCtx.db.get("users", userId)
      if (!(await isAdminEmail(queryCtx, user?.email))) {
        throw new ConvexError("This email is not on the admin list")
      }
    },
  },
})
