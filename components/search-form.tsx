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
>(({ port, protocols, ...props }, ref) => {
  const [portStr, setPortStr] = useState(port?.toString() ?? "")

  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <Form action="/" ref={ref} {...props}>
      <InputOTP
        ref={input}
        name="port"
        type="search"
        pattern={REGEXP_ONLY_DIGITS}
        value={portStr}
        maxLength={10}
        onChange={(value) => setPortStr(value)}
      >
        <div className="flex items-center gap-6">
          <div>
            <label htmlFor="port">Port Number</label>
            <label
              className="block text-xs text-muted-foreground"
              htmlFor="port"
            >
              Press enter to search
            </label>
          </div>
          <InputOTPGroup>
            {[...portStr, ""].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </div>
      </InputOTP>
      <SearchButton portStr={portStr} />
    </Form>
  )
})
