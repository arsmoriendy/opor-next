import { defineRelations } from "drizzle-orm"
import {
  portsTable,
  servicesTable,
  protocosTable,
  metadataTable,
} from "@/lib/db/schema"

export const relations = defineRelations(
  { portsTable, servicesTable, protocosTable, metadataTable },
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
      protocol: r.one.protocosTable({
        from: r.servicesTable.transportProtocol,
        to: r.protocosTable.name,
      }),
    },
  })
)
