"use server"

import { db } from "@/lib/db"
import { portsTable, servicesTable } from "@/lib/db/schema"
import {
  and,
  asc,
  desc,
  eq,
  getColumns,
  gte,
  lte,
  inArray,
  isNull,
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
    const nextUnassignedPort = await findUnassignedPort({
      gte: portNumber,
      protocols,
    })
    const prevUnassignedPort = await findUnassignedPort({
      lte: portNumber,
      protocols,
    })

    return {
      services,
      nextUnassignedPort,
      prevUnassignedPort,
      lastRefresh,
      assigned: true as const,
    }
  }

  return { lastRefresh, assigned: false as const }
}

export type ServiceQuery = Awaited<ReturnType<typeof queryServices>>

async function findUnassignedPort({
  gte: gten,
  lte: lten,
  protocols,
}: Partial<{
  gte: number
  lte: number
  protocols: string[]
}>) {
  // column filtering
  const { id, port, transportProtocol } = {
    ...getColumns(servicesTable),
    port: portsTable.port,
  }

  const adjacentPortQuery = db
    .select({
      port: portsTable.port,
    })
    .from(portsTable)
    .innerJoin(servicesTable, eq(portsTable.serviceId, servicesTable.id))
    .orderBy(({ port }) => (gten ? asc(port) : desc(port)))
    .where(({ port }) =>
      and(
        gten ? gte(port, gten) : lten ? lte(port, lten) : undefined,
        eq(servicesTable.description, "Unassigned")
      )
    )
    .limit(1)

  const serviceRows = await db
    .select({ id, port, transportProtocol })
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

  const firstRow = serviceRows.at(0)
  const rowProtocols = serviceRows.map((row) => row.transportProtocol)

  const unassignedPort = firstRow
    ? {
        port: firstRow.port,
        protocols: rowProtocols.includes(null)
          ? null
          : rowProtocols.filter((protocol) => protocol !== null),
      }
    : undefined

  return unassignedPort
}
