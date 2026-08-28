import { ThemeSwitcher } from "@/components/theme-switcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div>
      <Card
        className="w-[100vw] border-0 shadow-none lg:w-[768px] lg:border
          lg:shadow-sm"
      >
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle className="font-heading text-3xl text-accent">
              Phantom Ports
            </CardTitle>
            <p className="font-heading">Lookup unregistered ports</p>
          </div>
          <ThemeSwitcher />
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  )
}
