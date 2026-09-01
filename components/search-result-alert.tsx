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
      Port <b>{port}</b> is unregistered
    </AlertTitle>
    <AlertDescription>
      If you want to register this port, check out{" "}
      <a href="https://www.iana.org/protocols/apply">
        IANA's port registration forms
      </a>
    </AlertDescription>
  </SearchResultAlert>
))

export const AssignedPortAlert = forwardRef<
  HTMLDivElement,
  AlertProps & ServiceQuery & { port: number }
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
        Port <b>{port}</b> is registered
      </AlertTitle>
      <AlertDescription>
        <p>Registration details listed in the table below.</p>
        {(nextUnassignedPort || prevUnassignedPort) && (
          <>
            <Separator className="my-1.5 bg-destructive/20" />
            Suggested open ports:
            {nextUnassignedPort && (
              <InlineCode copy tooltip="Next open port, click to copy">
                {nextUnassignedPort.port}
              </InlineCode>
            )}
            &nbsp;
            {prevUnassignedPort && (
              <InlineCode copy tooltip="Previous open port, click to copy">
                {prevUnassignedPort.port}
              </InlineCode>
            )}
          </>
        )}
      </AlertDescription>
    </SearchResultAlert>
  )
)
