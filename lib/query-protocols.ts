"use server"

import { db } from "@/lib/db"

export async function listProtocols() {
  const protocolRows = await db.query.protocosTable.findMany()

  return protocolRows.map((row) => row.name)
}
