import {
  index,
  pgTable,
  varchar,
  timestamp,
  integer,
  uuid,
  foreignKey,
} from "drizzle-orm/pg-core"
import { v7 } from "uuid"

export const protocosTable = pgTable("protocols", {
  name: varchar().primaryKey(),
})

export const servicesTable = pgTable(
  "services",
  {
    id: uuid().primaryKey().$defaultFn(v7),
    serviceName: varchar("service_name"),
    transportProtocol: varchar("transport_protocol"),
    description: varchar(),
    assignee: varchar(),
    contact: varchar(),
    registrationDate: timestamp("registration_date", { withTimezone: true }),
    modificationDate: timestamp("modification_date", { withTimezone: true }),
    reference: varchar(),
    serviceCode: varchar("service_code"),
    unauthorizedUseReported: varchar("unauthorized_use_reported"),
    assignmentNotes: varchar("assignment_notes"),
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

export const portsTable = pgTable(
  "ports",
  {
    id: uuid().primaryKey().$defaultFn(v7),
    port: integer().notNull(),
    serviceId: uuid("service_id").notNull(),
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
