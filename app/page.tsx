import { Footer } from "@/components/footer"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <Card
      className="min-h-screen w-screen border-0 pb-0 shadow-none lg:min-h-0
        lg:w-[768px] lg:border lg:shadow-sm"
    >
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="font-heading text-3xl text-accent">
            Opor
          </CardTitle>
          <p className="font-heading">Lookup unregistered ports</p>
        </div>
        <ThemeSwitcher />
      </CardHeader>

      <CardContent className="flex-1"></CardContent>

      <Footer />
    </Card>
  )
}
