"use server"

import { db } from "@/lib/db"

export async function queryServices(
  portNumber: number,
  protocols: string[] | undefined
) {
  const services = (
    await db.query.portsTable.findMany({
      where: {
        port: portNumber,
        service: {
          transportProtocol: { in: protocols },
        },
      },
      with: {
        service: {
          with: {
            ports: { columns: { port: true }, orderBy: { port: "asc" } },
          },
        },
      },
      columns: { serviceId: false, port: false, id: false },
    })
  )
    .map((row) => row.service)
    .filter((service) => service?.description !== "Unassigned")

  if (services.length !== 0) {
    const nextUnassignedPort = await findAdjacentUnassignedPort({
      gt: portNumber,
    })
    const prevUnassignedPort = await findAdjacentUnassignedPort({
      lt: portNumber,
    })

    return { services, nextUnassignedPort, prevUnassignedPort }
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
