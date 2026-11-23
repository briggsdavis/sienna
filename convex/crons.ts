import { cronJobs } from "convex/server"
import { internal } from "./_generated/api"

const crons = cronJobs()

crons.cron("purge old visitor days", "15 8 * * *", internal.analytics.purgeVisitorDays, {})

export default crons
