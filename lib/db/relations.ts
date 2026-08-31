import { defineRelations } from "drizzle-orm"
import { registeredPortsTable, servicesTable } from "@/lib/db/schema"

export const relations = defineRelations(
  { portsTable: registeredPortsTable, servicesTable },
  (r) => ({
    portsTable: {
      service: r.one.servicesTable({
        from: r.portsTable.serviceId,
        to: r.servicesTable.id,
      }),
    },
    servicesTable: {
      ports: r.many.portsTable({
        from: r.servicesTable.id,
        to: r.portsTable.serviceId,
      }),
    },
  })
)
