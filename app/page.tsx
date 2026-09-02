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
          <CardTitle className="-mt-3">
            <h1>
              <span
                className="font-display text-5xl"
                style={{ fontVariationSettings: '"MORF" 45, "SHLN" 30' }}
              >
                opor
              </span>
              <span className="font-mono text-muted-foreground">(.top)</span>
            </h1>
          </CardTitle>
          <h2 className="-mt-1 font-heading text-base text-muted-foreground">
            Lookup unassigned (<i>open</i>) ports
          </h2>
        </div>
        <ThemeSwitcher />
      </CardHeader>

      <CardContent className="flex-1 space-y-6 px-0">
        <SearchForm port={port} protocols={protocols} className="px-4" />

        {unassigned && (
          <UnassignedPortAlert className="border-x-0 px-4" port={port} />
        )}

        {assigned && (
          <>
            <AssignedPortAlert
              port={port}
              {...searchResponse}
              className="border-x-0 px-4"
            />
            <SearchResultTable
              services={searchResponse.services}
              className={"[&_td]:px-4 [&_th]:px-4"}
            />
          </>
        )}
      </CardContent>

      <Footer />
    </Card>
  )
}
