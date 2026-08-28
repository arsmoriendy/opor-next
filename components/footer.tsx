import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  ArrowUpIcon,
  CoffeeIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/dist/ssr"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

type FooterProps = HTMLAttributes<HTMLDivElement>

export const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full justify-center bg-muted", className)}
        {...props}
      >
        <div className="w-full p-6 lg:w-[768px]">
          <div id="socialbar" className="flex space-x-1.5">
            <SocialBtn link="#" tooltip="Back to top">
              <ArrowUpIcon />
            </SocialBtn>
            <SocialBtn
              link="https://github.com/arsmoriendy/opor-next"
              tooltip="Star on Github"
            >
              <GithubLogoIcon />
            </SocialBtn>
            <SocialBtn
              link="https://ko-fi.com/arsmoriendy"
              tooltip="Buy me a coffee"
            >
              <CoffeeIcon />
            </SocialBtn>
          </div>

          <Separator className="my-3" />
          <small>
            Sourced from&nbsp;
            <a href="https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml">
              IANA's Service Name and Transport Protocol Port Number Registry
            </a>
          </small>
        </div>
      </div>
    )
  }
)

const SocialBtn = ({
  link,
  tooltip,
  children,
}: {
  link: string
  tooltip: string
  children: ReactNode
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={link}
            className={cn(
              "text-inherit",
              buttonVariants({ variant: "outline", size: "icon" })
            )}
          >
            {children}
          </a>
        }
      ></TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)
