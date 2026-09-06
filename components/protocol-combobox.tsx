"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

export function ProtocolCombobox({
  protocols: protocolsProp,
  allProtocols,
}: {
  protocols?: string[]
  allProtocols: string[]
}) {
  const anchor = useComboboxAnchor()
  const [protocols, setProtocols] = React.useState(protocolsProp ?? [])

  return (
    <Combobox
      multiple
      autoHighlight
      value={protocols}
      onValueChange={setProtocols}
      items={allProtocols}
      name="protocol"
      id="protocol"
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>

      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Protocol not found.</ComboboxEmpty>
        <ComboboxList>
          {(protocol) => (
            <ComboboxItem key={protocol} value={protocol}>
              {protocol}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
