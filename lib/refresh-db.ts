import {
  drizzle,
  NodePgDatabase,
  type NodePgQueryResultHKT,
} from "drizzle-orm/node-postgres"
import { camelCase } from "es-toolkit/string"
import { range } from "es-toolkit/math"
import { defaults } from "es-toolkit/compat"
import Papa from "papaparse"
import { parsedServiceSchema, rawServiceSchema } from "@/lib/iana-schema"
import {
  metadataTable,
  portsTable,
  protocosTable,
  servicesTable,
} from "@/lib/db/schema.js"
import { v7 } from "uuid"
import type { PgAsyncTransaction, PgTable } from "drizzle-orm/pg-core"

export async function refreshDb(params: {
  databaseUrl: string
  ianaPortsCsvUrl?: string
}) {
  const { protocols, services, ports } = await fetchCsv(
    params.ianaPortsCsvUrl ??
      "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv"
  )

  const db = drizzle(params.databaseUrl)
  await insertDb(db, protocols, services, ports)
}

async function insertDb(
  db: NodePgDatabase<any>,
  protocols: (typeof protocosTable.$inferInsert)[],
  services: (typeof servicesTable.$inferInsert)[],
  ports: (typeof portsTable.$inferInsert)[]
) {
  await db.transaction(async (tx) => {
    await tx.delete(protocosTable)
    await tx.delete(servicesTable)
    await tx.delete(portsTable)
    await tx.delete(metadataTable)

    await batchInsert(tx, protocosTable, protocols)
    await batchInsert(tx, servicesTable, services)
    await batchInsert(tx, portsTable, ports)
    await tx.insert(metadataTable).values({})
  })
}

function strToDate(str: string | undefined) {
  return str ? new Date(str) : undefined
}

async function fetchCsv(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "curl/8.18.0",
    },
  })

  const csvString = await res.text()

  const parsedCsv = Papa.parse(csvString, {
    header: true,
    transformHeader: camelCase,
    // transform empty strings to `undefined`
    transform: (value) => (value === "" ? undefined : value),
    skipEmptyLines: true,
  })

  const protocolSet: Set<string> = new Set()
  const services: (typeof servicesTable.$inferInsert)[] = []
  const ports: (typeof portsTable.$inferInsert)[] = []

  for (const row of parsedCsv.data) {
    const raw = rawServiceSchema.parse(row)

    const { portNumberRange, registrationDate, modificationDate, ...service } =
      parsedServiceSchema.parse({
        ...raw,
        portNumberRange: raw.portNumber
          ? defaults(
              raw.portNumber.split("-").map((portStr) => parseInt(portStr)),
              [-1, -1]
            ).map((v, i, arr) => (v === -1 ? arr[i - 1] : v))
          : undefined,
      })

    if (raw.transportProtocol) protocolSet.add(raw.transportProtocol)

    const serviceId = v7()

    services.push({
      id: serviceId,
      registrationDate: strToDate(registrationDate),
      modificationDate: strToDate(modificationDate),
      ...service,
    })

    for (const port of portNumberRange
      ? range(portNumberRange[0], portNumberRange[1] + 1)
      : []) {
      ports.push({ port, serviceId })
    }
  }

  const protocols: (typeof protocosTable.$inferInsert)[] = []
  for (const protocol of protocolSet) {
    protocols.push({ name: protocol })
  }

  return { protocols, services, ports }
}

async function batchInsert<T extends Record<string, unknown>>(
  tx: PgAsyncTransaction<NodePgQueryResultHKT, any>,
  table: PgTable,
  rows: T[],
  batchSize = 1000
) {
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)
    await tx.insert(table).values(batch)
  }
}
