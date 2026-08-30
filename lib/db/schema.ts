import {
  pgTable,
  varchar,
  timestamp,
  integer,
  uuid,
  foreignKey,
} from "drizzle-orm/pg-core"
import { v7 } from "uuid"

export const servicesTable = pgTable("service", {
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
})

export const portsTable = pgTable(
  "port",
  {
    port: integer().primaryKey(),
    serviceId: uuid().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.serviceId],
      foreignColumns: [servicesTable.id],
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
)
