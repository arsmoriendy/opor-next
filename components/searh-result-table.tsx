"use client"

import { InlineCode } from "@/components/inline-code"
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { ServiceQuery } from "@/lib/query-services"
import { ComponentProps } from "react"

export function SearchResultTable({
  services,
  ...props
}: ComponentProps<"table"> & {
  services: NonNullable<NonNullable<ServiceQuery>["services"]>
}) {
  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>Service name</TableHead>
          <TableHead>Transport protocol</TableHead>
          <TableHead>Ports</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {services.map((service, i) => (
          <TableRow key={i}>
            <TableCell>{service.serviceName ?? "-"}</TableCell>
            <TableCell>{service.transportProtocol ?? "-"}</TableCell>
            <TableCell className="flex flex-wrap gap-2">
              {service.ports?.map((port, i) => (
                <InlineCode key={i} copy tooltip="Click to copy">
                  {port.port}
                </InlineCode>
              )) ?? "-"}
            </TableCell>
            <TableCell>{service.description ?? "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
