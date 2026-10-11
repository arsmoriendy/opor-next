import { refreshDb } from "@/lib/refresh-db"
import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  console.assert(
    process.env.DATABASE_URL !== undefined,
    "DATABASE_URL shuld not be undefined"
  )

  const authHeader = request.headers.authorization

  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return response.status(401).json({ success: false })
  }

  await refreshDb({ databaseUrl: process.env.DATABASE_URl! })

  response.status(200).json({ success: true })
}
