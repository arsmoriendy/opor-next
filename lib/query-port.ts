"use server"

import { db } from "@/lib/db"

export async function queryPort(portNumber: number) {
  const service = (
    await db.query.portsTable.findFirst({
      where: { port: portNumber },
      with: {
        service: {
          with: {
            ports: { columns: { port: true }, orderBy: { port: "asc" } },
          },
        },
      },
      columns: { serviceId: false, port: false, id: false },
    })
  )?.service

  return service
}
