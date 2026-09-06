"use client"

import Form from "next/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react"
import SearchButton from "@/components/search-button"

export const SearchForm = forwardRef<
  HTMLFormElement,
  HTMLAttributes<HTMLFormElement> & { port?: number; protocols?: string[] }
>(({ port, protocols, className, ...props }, ref) => {
  const [portStr, setPortStr] = useState(port?.toString() ?? "")

  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <Form action="/" ref={ref} className={className} {...props}>
      <div className="flex gap-4">
        <div>
          <label htmlFor="port">Port Number</label>
          <label className="block text-xs text-muted-foreground" htmlFor="port">
            Press enter to search
          </label>
        </div>

        <InputOTP
          ref={input}
          id="port"
          name="port"
          type="search"
          pattern={REGEXP_ONLY_DIGITS}
          value={portStr}
          maxLength={10}
          onChange={(value) => setPortStr(value)}
        >
          <InputOTPGroup>
            {[...portStr, ""].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <SearchButton portStr={portStr} />
    </Form>
  )
})
