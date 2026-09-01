import { Footer } from "@/components/footer"
import { SearchForm } from "@/components/search-form"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { queryServices } from "@/lib/query-services"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ port?: number; protocols?: string[] }>
}) {
  const { port, protocols } = await searchParams

  const searchResponse = port ? await queryServices(port, protocols) : undefined

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
          <p className="font-heading">Lookup unassigned ports</p>
        </div>
        <ThemeSwitcher />
      </CardHeader>

      <CardContent className="flex-1">
        <SearchForm port={port} protocols={protocols} />
      </CardContent>

      <Footer />
    </Card>
  )
}
