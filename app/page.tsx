import { Footer } from "@/components/footer"
import { SearchForm } from "@/components/search-form"
import {
  AssignedPortAlert,
  UnassignedPortAlert,
} from "@/components/search-result-alert"
import { SearchResultTable } from "@/components/searh-result-table"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { listProtocols } from "@/lib/query-protocols"
import { queryServices } from "@/lib/query-services"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ port?: number; protocol?: string | string[] }>
}) {
  const { port, protocol } = await searchParams
  const protocols = protocol ? [protocol].flat() : undefined
  const searchResponse = port ? await queryServices(port, protocols) : undefined
  const allProtocols = await listProtocols()

  return (
    <Card
      className="min-h-screen w-screen border-0 pb-0 shadow-none lg:min-h-0
        lg:w-[768px] lg:border lg:shadow-sm"
    >
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="-mt-3">
            <h1>
              <a
                href="/"
                className="text-muted-foreground hover:text-accent
                  hover:no-underline"
              >
                <span
                  className="font-display text-5xl"
                  style={{ fontVariationSettings: '"MORF" 45, "SHLN" 30' }}
                >
                  opor
                </span>
                <span className="font-mono">(.top)</span>
              </a>
            </h1>
          </CardTitle>
          <h2 className="-mt-1 font-heading text-base text-muted-foreground">
            Lookup unassigned (<i>open</i>) ports
          </h2>
        </div>
        <ThemeSwitcher />
      </CardHeader>

      <main // custom <main/> CardContent
        data-slot="card-content"
        className="flex-1 space-y-6 px-(--card-spacing) px-0"
      >
        <SearchForm
          port={port}
          protocols={protocols}
          allProtocols={allProtocols}
          className="px-4"
        />

        {port && !searchResponse?.assigned && (
          <UnassignedPortAlert
            className="border-x-0 px-4"
            port={port}
            lastRefresh={searchResponse!.lastRefresh!}
          />
        )}

        {port && searchResponse?.assigned && (
          <>
            <AssignedPortAlert
              port={port}
              className="border-x-0 px-4"
              {...searchResponse}
            />

            <div className="border-y">
              <h3 className="m-4 font-bold">Assigned service details</h3>
              <SearchResultTable
                services={searchResponse.services!}
                className="[&_td]:px-4 [&_th]:px-4"
              />
            </div>
          </>
        )}
      </main>

      <Footer />
    </Card>
  )
}
