import { Footer } from "@/components/footer"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between
        lg:pt-6"
    >
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
      <Footer />
    </div>
  )
}
