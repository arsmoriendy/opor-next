"use client"

import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react"

function getURLport(): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  const pstring = urlParams.get("port")

  return pstring
}

function setURLport(port: string) {
  const url = new URL(document.URL)
  url.searchParams.set("port", port)
  history.pushState("", "", url)
}

export const PortForm = forwardRef<
  HTMLFormElement,
  HTMLAttributes<HTMLFormElement>
>(({ ...props }, ref) => {
  const [portStr, setPortStr] = useState("")
  const [portNum, setPortNum] = useState<number | null>(null)

  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    input.current?.focus()

    const urlPort = getURLport()
    if (urlPort !== null && !/[^0-9]/.test(urlPort)) {
      setPortStr(urlPort)
      setPortNum(parseInt(urlPort))
    }
  }, [])

  return (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault()
        setPortNum(parseInt(portStr))
        setURLport(portStr)
      }}
      {...props}
    >
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
              className="block text-sm text-muted-foreground"
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
      <Button
        className="mt-3"
        type="submit"
        size="sm"
        disabled={portStr.length === 0}
      >
        Search
      </Button>
    </form>
  )
})
