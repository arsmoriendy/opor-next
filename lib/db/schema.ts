import {
  index,
  snakeCase,
  varchar,
  timestamp,
  integer,
  uuid,
  foreignKey,
} from "drizzle-orm/pg-core"
import { v7 } from "uuid"

export const protocosTable = snakeCase.table("protocols", {
  name: varchar().primaryKey(),
})

export const servicesTable = snakeCase.table(
  "services",
  {
    id: uuid().primaryKey().$defaultFn(v7),
    serviceName: varchar(),
    transportProtocol: varchar(),
    description: varchar(),
    assignee: varchar(),
    contact: varchar(),
    registrationDate: timestamp({ withTimezone: true }),
    modificationDate: timestamp({ withTimezone: true }),
    reference: varchar(),
    serviceCode: varchar(),
    unauthorizedUseReported: varchar(),
    assignmentNotes: varchar(),
  },
  (table) => [
    foreignKey({
      columns: [table.transportProtocol],
      foreignColumns: [protocosTable.name],
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    index().on(table.transportProtocol), // to optimize protocol filtering
    index().on(table.description), // to optimize "Unassigned" ports
  ]
)

export const portsTable = snakeCase.table(
  "ports",
  {
    id: uuid().primaryKey().$defaultFn(v7),
    port: integer().notNull(),
    serviceId: uuid().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.serviceId],
      foreignColumns: [servicesTable.id],
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    index().on(table.port), // to optimize port filtering
    index().on(table.serviceId), // to optimize relational queries
  ]
)

export const metadataTable = snakeCase.table("metadata", {
  lastRefresh: timestamp({ withTimezone: true }).defaultNow().notNull(),
})
