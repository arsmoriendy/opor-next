import { Footer } from "@/components/footer"
import { SearchForm } from "@/components/search-form"
import {
  AssignedPortAlert,
  UnassignedPortAlert,
} from "@/components/search-result-alert"
import { SearchResultTable } from "@/components/searh-result-table"
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
  const unassigned = port && !searchResponse
  const assigned = port && searchResponse

  return (
    <Card
      className="min-h-screen w-screen border-0 pb-0 shadow-none lg:min-h-0
        lg:w-[768px] lg:border lg:shadow-sm"
    >
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>
            <span
              className="font-heading text-3xl font-semibold tracking-tight
                text-accent"
            >
              opor
            </span>
            <span className="font-mono text-muted-foreground">(.top)</span>
          </CardTitle>
          <p className="-mt-1 font-heading text-base text-muted-foreground">
            Lookup unassigned (<i>open</i>) ports
          </p>
        </div>
        <ThemeSwitcher />
      </CardHeader>

      <CardContent className="flex-1">
        <SearchForm port={port} protocols={protocols} />
      </CardContent>

      {unassigned && <UnassignedPortAlert port={port} />}
      {assigned && (
        <>
          <AssignedPortAlert port={port} {...searchResponse} />
          <SearchResultTable services={searchResponse.services} />
        </>
      )}

      <Footer />
    </Card>
  )
}
