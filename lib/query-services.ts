"use server"

import { db } from "@/lib/db"

export async function queryServices(
  portNumber: number,
  protocols: string[] | undefined
) {
  const services = (
    await db.query.portsTable.findMany({
      where: { port: portNumber },
      with: {
        service: {
          where: { transportProtocol: { in: protocols } },
          with: {
            ports: { columns: { port: true }, orderBy: { port: "asc" } },
          },
        },
      },
      columns: { serviceId: false, port: false, id: false },
    })
  ).map((row) => row.service)

  return services
}
