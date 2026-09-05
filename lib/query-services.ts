"use server"

import { db } from "@/lib/db"

export async function queryServices(portNumber: number, protocols?: string[]) {
  const { lastRefresh } = (await db.query.metadataTable.findFirst())!

  const services = await db.query.servicesTable.findMany({
    where: {
      ports: { port: portNumber },
      description: { NOT: "Unassigned" },
      transportProtocol: { in: protocols },
    },
    with: { ports: { columns: { port: true }, orderBy: { port: "asc" } } },
  })

  if (services.length !== 0) {
    const nextUnassignedPort = await findAdjacentUnassignedPort({
      gt: portNumber,
      protocols,
    })
    const prevUnassignedPort = await findAdjacentUnassignedPort({
      lt: portNumber,
      protocols,
    })

    return {
      services,
      nextUnassignedPort,
      prevUnassignedPort,
      lastRefresh,
      assigned: true,
    }
  }

  return { lastRefresh, assigned: false }
}

export type ServiceQuery = Awaited<ReturnType<typeof queryServices>>

async function findAdjacentUnassignedPort({
  gt,
  lt,
  protocols,
}: Partial<{
  gt: number
  lt: number
  protocols: string[]
}>) {
  return await db.query.portsTable.findFirst({
    where: {
      port: { gt, lt },
      service: {
        description: "Unassigned",
        transportProtocol: { in: protocols },
      },
    },
    with: {
      service: { columns: { transportProtocol: true } },
    },
    columns: { id: false },
    orderBy: { port: gt ? "asc" : "desc" },
  })
}
