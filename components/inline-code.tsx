import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type InlineCodeProps = HTMLAttributes<HTMLElement> & {
  // Toggle click to copy
  copy?: boolean
  tooltip?: string
  before?: ReactNode
  after?: ReactNode
}
export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(
  ({ copy, className, tooltip, before, after, ...props }, ref) => {
    const code = <code {...props} />

    function handleClick() {
      navigator.clipboard.writeText(props.children?.toString() ?? "")
    }

    return (
      <span
        ref={ref}
        className={cn(
          "rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono",
          className
        )}
        onClick={copy ? handleClick : undefined}
      >
        {tooltip !== undefined ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {before}
                {code}
                {after}
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          code
        )}
      </span>
    )
  }
)
