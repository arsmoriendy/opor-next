"use server"

import { db } from "@/lib/db"

export async function queryServices(
  portNumber: number,
  protocols: string[] | undefined
) {
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
    })
    const prevUnassignedPort = await findAdjacentUnassignedPort({
      lt: portNumber,
    })

    return {
      services: services.map((serviceRow) => ({
        ...serviceRow,
        ports: serviceRow.ports.map((portRow) => portRow.port),
      })),
      nextUnassignedPort,
      prevUnassignedPort,
    }
  }

  return
}

async function findAdjacentUnassignedPort({
  gt,
  lt,
  protocols,
}: Partial<{
  gt: number
  lt: number
  protocols: string[]
}>) {
  return (
    await db.query.portsTable.findFirst({
      where: {
        port: { gt, lt },
        service: {
          description: "Unassigned",
          transportProtocol: { in: protocols },
        },
      },
      columns: { port: true },
      orderBy: { port: gt ? "asc" : "desc" },
    })
  )?.port
}
