"use client"

import { InlineCode } from "@/components/inline-code"
import {
  Alert,
  AlertDescription,
  AlertProps,
  AlertTitle,
} from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import type { ServiceQuery } from "@/lib/query-services"
import { cn } from "@/lib/utils"
import { SealCheckIcon, SealWarningIcon } from "@phosphor-icons/react/dist/ssr"
import { forwardRef } from "react"

export const SearchResultAlert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, ...props }, ref) => (
    <Alert ref={ref} className={cn(className, "my-6 border-x-0")} {...props} />
  )
)

export const UnassignedPortAlert = forwardRef<
  HTMLDivElement,
  AlertProps & { port: number }
>(({ port, className, ...props }, ref) => (
  <SearchResultAlert {...props} ref={ref}>
    <SealCheckIcon className="h-4 w-4" />
    <AlertTitle>
      Port <b>{port}</b> is unassigned
    </AlertTitle>
    <AlertDescription>
      You may register to assign this port at{" "}
      <a href="https://www.iana.org/form/ports-services">
        IANA's port registration forms
      </a>
    </AlertDescription>
  </SearchResultAlert>
))

export const AssignedPortAlert = forwardRef<
  HTMLDivElement,
  AlertProps & Exclude<ServiceQuery, undefined> & { port: number }
>(
  (
    {
      port,
      services,
      nextUnassignedPort,
      prevUnassignedPort,
      className,
      ...props
    },
    ref
  ) => (
    <SearchResultAlert variant={"destructive"} ref={ref} {...props}>
      <SealWarningIcon className="h-4 w-4" />
      <AlertTitle>
        Port <b>{port}</b> is assigned
      </AlertTitle>
      <AlertDescription>
        <p>Registration details listed in the table below.</p>
        {(nextUnassignedPort || prevUnassignedPort) && (
          <>
            <Separator className="my-1.5 bg-destructive/20" />
            Adjacent unassigned ports:{" "}
            {prevUnassignedPort && (
              <InlineCode
                copy
                tooltip="Previous unnasigned port, click to copy"
              >
                {prevUnassignedPort.port}
              </InlineCode>
            )}
            ,{" "}
            {nextUnassignedPort && (
              <InlineCode copy tooltip="Next unassigned port, click to copy">
                {nextUnassignedPort.port}
              </InlineCode>
            )}
          </>
        )}
      </AlertDescription>
    </SearchResultAlert>
  )
)
