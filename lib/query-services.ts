"use server"

import { db } from "@/lib/db"
import { portsTable, servicesTable } from "@/lib/db/schema"
import {
  and,
  asc,
  desc,
  eq,
  getColumns,
  gt,
  inArray,
  isNull,
  lt,
  or,
} from "drizzle-orm"

export async function queryServices(portNumber: number, protocols?: string[]) {
  const { lastRefresh } = (await db.query.metadataTable.findFirst())!

  const services = await db.query.servicesTable.findMany({
    where: {
      ports: { port: portNumber },
      description: { NOT: "Unassigned" },
      transportProtocol: {
        OR: protocols ? [{ in: protocols }, { isNull: true }] : undefined,
      },
    },
    with: { ports: { columns: { port: true }, orderBy: { port: "asc" } } },
  })

  if (services.length !== 0) {
    const nextUnassignedServices = await findAdjacentUnassignedServices({
      gt: portNumber,
      protocols,
    })
    const prevUnassignedServices = await findAdjacentUnassignedServices({
      lt: portNumber,
      protocols,
    })

    return {
      services,
      nextUnassignedServices,
      prevUnassignedServices,
      lastRefresh,
      assigned: true,
    }
  }

  return { lastRefresh, assigned: false }
}

export type ServiceQuery = Awaited<ReturnType<typeof queryServices>>

async function findAdjacentUnassignedServices({
  gt: gtn,
  lt: ltn,
  protocols,
}: Partial<{
  gt: number
  lt: number
  protocols: string[]
}>) {
  const { ...columns } = {
    ...getColumns(servicesTable),
    port: portsTable.port,
  }

  const adjacentPortQuery = db
    .select({
      port: portsTable.port,
    })
    .from(portsTable)
    .innerJoin(servicesTable, eq(portsTable.serviceId, servicesTable.id))
    .orderBy(({ port }) => (gtn ? asc(port) : desc(port)))
    .where(({ port }) =>
      and(
        gtn ? gt(port, gtn) : ltn ? lt(port, ltn) : undefined,
        eq(servicesTable.description, "Unassigned")
      )
    )
    .limit(1)

  const services = await db
    .select(columns)
    .from(servicesTable)
    .innerJoin(portsTable, eq(portsTable.serviceId, servicesTable.id))
    .where(
      and(
        eq(portsTable.port, adjacentPortQuery),
        eq(servicesTable.description, "Unassigned"),
        protocols
          ? or(
              inArray(servicesTable.transportProtocol, protocols),
              isNull(servicesTable.transportProtocol)
            )
          : undefined
      )
    )

  return services
}
