import { useConvex, useMutation, usePaginatedQuery } from "convex/react"
import type { FunctionReturnType } from "convex/server"
import { useEffect, useState } from "react"
import {
  Button,
  Card,
  confirmDelete,
  Empty,
  IconButton,
  Input,
  Loading,
  PageHeader,
} from "@/admin/ui"
import { api } from "../../convex/_generated/api"

function csvCell(value: string) {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

export function SubscribersAdmin() {
  const [search, setSearch] = useState("")
  const [debounced, setDebounced] = useState("")
  const convex = useConvex()
  const remove = useMutation(api.inquiries.removeSubscriber)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(search), 300)
    return () => window.clearTimeout(t)
  }, [search])

  const { results, status, loadMore } = usePaginatedQuery(
    api.inquiries.listSubscribers,
    { search: debounced || undefined },
    { initialNumItems: 50 },
  )

  const exportCsv = async () => {
    setExporting(true)
    try {
      const rows: typeof results = []
      let cursor: string | null = null
      for (;;) {
        const page: FunctionReturnType<typeof api.inquiries.listSubscribers> = await convex.query(
          api.inquiries.listSubscribers,
          { paginationOpts: { numItems: 500, cursor } },
        )
        rows.push(...page.page)
        if (page.isDone) break
        cursor = page.continueCursor
      }
      const csv = [
        "email,name,source,signed_up,consent_text",
        ...rows.map((r) =>
          [r.email, r.name ?? "", r.source, new Date(r._creationTime).toISOString(), r.consentText]
            .map(csvCell)
            .join(","),
        ),
      ].join("\n")
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
      const a = document.createElement("a")
      a.href = url
      a.download = `sienna-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Email subscribers"
        description="People who opted in to marketing emails from the footer, popup or catering checkout. Each record keeps the consent text they agreed to."
        actions={
          <Button onClick={exportCsv} disabled={exporting}>
            <i className="ph ph-download-simple" /> {exporting ? "Exporting..." : "Export CSV"}
          </Button>
        }
      />
      <div className="relative mb-4 max-w-md">
        <i className="ph ph-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-ink-soft" />
        <Input
          placeholder="Search email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      {status === "LoadingFirstPage" ? (
        <Loading />
      ) : results.length === 0 ? (
        <Empty>No subscribers yet.</Empty>
      ) : (
        <Card>
          <table className="w-full text-sm">
            <thead className="border-b border-ink/10 text-left text-xs text-ink-soft">
              <tr>
                <th className="px-4 py-2.5 font-medium">Email</th>
                <th className="hidden px-4 py-2.5 font-medium sm:table-cell">Name</th>
                <th className="hidden px-4 py-2.5 font-medium sm:table-cell">Source</th>
                <th className="px-4 py-2.5 font-medium">Joined</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {results.map((row) => (
                <tr key={row._id}>
                  <td className="px-4 py-2.5">{row.email}</td>
                  <td className="hidden px-4 py-2.5 text-ink-soft sm:table-cell">{row.name}</td>
                  <td className="hidden px-4 py-2.5 text-ink-soft sm:table-cell">{row.source}</td>
                  <td className="px-4 py-2.5 text-ink-soft">
                    {new Date(row._creationTime).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-2 text-right">
                    <IconButton
                      icon="ph-trash"
                      label="Delete"
                      onClick={() => confirmDelete(row.email) && remove({ id: row._id })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {status === "CanLoadMore" && (
            <div className="border-t border-ink/5 p-3 text-center">
              <Button size="sm" onClick={() => loadMore(50)}>
                Load more
              </Button>
            </div>
          )}
        </Card>
      )}
    </>
  )
}
