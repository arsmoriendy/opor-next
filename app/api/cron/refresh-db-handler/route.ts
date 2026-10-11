import { refreshDb } from "@/lib/refresh-db"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")

  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  await refreshDb({ databaseUrl: process.env.DATABASE_URl! })

  return Response.json({ success: true })
}
