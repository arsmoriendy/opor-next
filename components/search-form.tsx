"use client"

import Form from "next/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
  ComponentProps,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import SearchButton from "@/components/search-button"
import { ProtocolCombobox } from "@/components/protocol-combobox"

export const SearchForm = forwardRef<
  HTMLFormElement,
  HTMLAttributes<HTMLFormElement> & {
    port?: number
    protocols?: string[]
    allProtocols: string[]
  }
>(({ port, protocols, className, allProtocols, ...props }, ref) => {
  const [portStr, setPortStr] = useState(port?.toString() ?? "")

  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <Form action="/" ref={ref} className={className} {...props}>
      <div className="grid w-max grid-cols-[auto_auto] place-items-start gap-4">
        {/* port field */}
        <FormLabel description={<>Port number to search</>} htmlFor="port">
          Port Number
        </FormLabel>
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

        {/* protocol field */}
        <FormLabel htmlFor="protocol" description={<>Protocols to filter</>}>
          Protocols (<i>Optional</i>)
        </FormLabel>
        <ProtocolCombobox protocols={protocols} allProtocols={allProtocols} />
      </div>

      <SearchButton portStr={portStr} />
    </Form>
  )
})

function FormLabel({
  htmlFor,
  description,
  children,
  ...divProps
}: Pick<ComponentProps<"label">, "htmlFor"> &
  ComponentProps<"div"> & { description?: ReactNode }) {
  return (
    <div {...divProps}>
      <label htmlFor={htmlFor}>{children}</label>
      {description && (
        <label
          className="block text-xs text-muted-foreground"
          htmlFor={htmlFor}
        >
          {description}
        </label>
      )}
    </div>
  )
}
