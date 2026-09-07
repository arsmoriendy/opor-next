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
      <ComboboxChips
        ref={anchor}
        className="gap-0 [&>div:not(:last-of-type)]:mr-1"
      >
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}

              {protocols.length === 0 && (
                <ComboboxChip
                  className="bg-transparent text-muted-foreground"
                  showRemove={false}
                >
                  No filters
                </ComboboxChip>
              )}

              <ComboboxChipsInput className="field-sizing-content min-w-px" />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>

      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Not found</ComboboxEmpty>
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
