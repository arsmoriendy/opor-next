"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import {
  MagnifyingGlassIcon,
  SpinnerIcon,
} from "@phosphor-icons/react/dist/ssr"
import { useFormStatus } from "react-dom"

export default function SearchButton({
  portStr,
  ...props
}: ButtonProps & { portStr: string }) {
  const status = useFormStatus()

  return (
    <Button
      className="mt-3"
      type="submit"
      disabled={portStr.length === 0 || status.pending}
      {...props}
    >
      {status.pending ? (
        <>
          <SpinnerIcon className="animate-spin" />
          Searching...
        </>
      ) : (
        <>
          <MagnifyingGlassIcon />
          Search
        </>
      )}
    </Button>
  )
}
