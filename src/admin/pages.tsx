import { useMutation, useQuery } from "convex/react"
import { useState } from "react"
import {
  Button,
  Card,
  ErrorText,
  Field,
  Input,
  Loading,
  PageHeader,
  Textarea,
  useAsync,
} from "@/admin/ui"
import { PAGE_SEO } from "@/lib/pages"
import { api } from "../../convex/_generated/api"

export function PagesAdmin() {
  const overrides = useQuery(api.seo.list)
  const [editing, setEditing] = useState<string | null>(null)

  const openEditor = (path: string) => {
    localStorage.setItem("sm_edit", "1")
    window.open(path, "_blank")
  }

  return (
    <>
      <PageHeader
        title="Pages & SEO"
        description="Edit page text, images and buttons right on the page, and set the title and description search engines show."
      />
      <Card className="mb-6 p-5 text-sm leading-relaxed text-ink-soft">
        <strong className="text-ink">How page editing works:</strong> click "Edit on page". While
        signed in you'll see outlined text, "Replace image" buttons and outlined buttons. Click text
        to type, click a button to change its label or link. Changes save when you click away. Clear
        a text box to restore the original. Layout and sections can't be rearranged.
      </Card>
      {overrides === undefined ? (
        <Loading />
      ) : (
        <Card>
          <ul className="divide-y divide-ink/5">
            {Object.entries(PAGE_SEO).map(([path, page]) => {
              const override = overrides.find((o) => o.path === path)
              return (
                <li key={path} className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">
                        {page.name} <span className="font-mono text-xs text-ink-soft">{path}</span>
                      </div>
                      <div className="truncate text-xs text-ink-soft">
                        {override?.title || page.title}
                        {override && <span className="ml-2 text-sienna">custom</span>}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => setEditing(editing === path ? null : path)}>
                      <i className="ph ph-magnifying-glass" /> SEO
                    </Button>
                    {page.editable ? (
                      <Button size="sm" variant="primary" onClick={() => openEditor(path)}>
                        <i className="ph ph-pencil-simple" /> Edit on page
                      </Button>
                    ) : (
                      <a
                        href={path}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg px-2.5 py-1.5 text-xs text-ink-soft hover:bg-ink/5"
                      >
                        View
                      </a>
                    )}
                  </div>
                  {editing === path && (
                    <SeoForm
                      path={path}
                      defaults={page}
                      initial={override}
                      onDone={() => setEditing(null)}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </Card>
      )}
    </>
  )
}

function SeoForm({
  path,
  defaults,
  initial,
  onDone,
}: {
  path: string
  defaults: { title: string; description: string }
  initial?: { title: string; description: string }
  onDone: () => void
}) {
  const save = useMutation(api.seo.save)
  const [title, setTitle] = useState(initial?.title ?? "")
  const [description, setDescription] = useState(initial?.description ?? "")
  const { busy, error, run } = useAsync()

  return (
    <div className="mt-4 space-y-3 rounded-lg bg-ink/[0.03] p-4">
      <Field label={`Title (${(title || defaults.title).length}/60 recommended)`}>
        <Input
          placeholder={defaults.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>
      <Field
        label={`Description (${(description || defaults.description).length}/160 recommended)`}
      >
        <Textarea
          placeholder={defaults.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <p className="text-xs text-ink-soft">Leave blank to use the default shown in grey.</p>
      <ErrorText message={error} />
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          disabled={busy}
          onClick={async () => {
            if (await run(() => save({ path, title, description }))) onDone()
          }}
        >
          Save
        </Button>
        <Button size="sm" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
