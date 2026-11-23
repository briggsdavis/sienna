import { useMutation } from "convex/react"
import { useCallback } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"

export function useUpload() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  return useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) throw new Error("Choose an image file")
      if (file.size > 8 * 1024 * 1024) throw new Error("Images must be under 8 MB")
      const url = await generateUploadUrl()
      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
      if (!result.ok) throw new Error("Upload failed")
      const { storageId } = (await result.json()) as { storageId: Id<"_storage"> }
      return storageId
    },
    [generateUploadUrl],
  )
}

export function pickFile(): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = () => resolve(input.files?.[0] ?? null)
    input.click()
  })
}
