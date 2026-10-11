import { refreshDb } from "@/lib/refresh-db"
import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(
  _request: VercelRequest,
  response: VercelResponse
) {
  console.assert(
    process.env.DATABASE_URL !== undefined,
    "DATABASE_URL shuld not be undefined"
  )

  await refreshDb({ databaseUrl: process.env.DATABASE_URl! })

  response.status(200).json({ success: true })
}
