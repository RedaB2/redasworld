export const CODEX_PROFILE_URL = "https://chatgpt.com/u/wayzfut"
export const CODEX_PROFILE_HANDLE = "wayzfut"

export type CodexProfile = {
  name: string
  handle: string
  avatarUrl: string | null
}

function decodeEntities(value: string): string {
  const entities: Record<string, string> = {
    amp: "&",
    apos: "'",
    quot: '"',
    lt: "<",
    gt: ">",
    nbsp: " ",
  }

  return value.replace(/&(#x[\da-f]+|#\d+|amp|apos|quot|lt|gt|nbsp);/gi, (match, entity: string) => {
    if (!entity.startsWith("#")) return entities[entity.toLowerCase()] ?? match

    const hexadecimal = entity[1].toLowerCase() === "x"
    const codePoint = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10)
    return codePoint > 0 && codePoint <= 0x10ffff && !(codePoint >= 0xd800 && codePoint <= 0xdfff)
      ? String.fromCodePoint(codePoint)
      : match
  })
}

function publicAvatarUrl(value: string | undefined): string | null {
  if (!value) return null

  try {
    const url = new URL(value)
    if (
      url.origin !== "https://chatgpt.com" ||
      url.username ||
      url.password ||
      !url.pathname.startsWith("/backend-api/estuary/public_content/")
    ) {
      return null
    }
    return url.href
  } catch {
    return null
  }
}

// Read only the public profile's link-preview metadata. The full profile requires
// login and explicitly disallows framing; no authenticated content is requested.
export function parseCodexProfile(html: string): CodexProfile | null {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1]
  if (!head) return null

  const metadata = new Map<string, string>()
  const cleanHead = head.replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "")
  const tags = cleanHead.match(/<meta\b(?:"[^"]*"|'[^']*'|[^'">])*>/gi) ?? []

  for (const tag of tags) {
    const attributes = new Map<string, string>()
    const attributePattern = /([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g
    let attribute: RegExpExecArray | null
    while ((attribute = attributePattern.exec(tag))) {
      attributes.set(attribute[1].toLowerCase(), decodeEntities(attribute[2] ?? attribute[3] ?? attribute[4]))
    }
    const property = attributes.get("property")?.toLowerCase()
    const content = attributes.get("content")
    if (property && content !== undefined && !metadata.has(property)) metadata.set(property, content)
  }

  if (
    metadata.get("og:type") !== "profile" ||
    metadata.get("profile:username") !== CODEX_PROFILE_HANDLE ||
    metadata.get("og:url") !== CODEX_PROFILE_URL
  ) {
    return null
  }

  const title = metadata.get("og:title") ?? ""
  const name = title.match(/^(.+)\s+\(@wayzfut\)\s+\|\s+ChatGPT$/)?.[1].trim()
  if (
    !name ||
    name.length > 100 ||
    /[<>\u0000-\u001f\u007f]/.test(name) ||
    /^(log\s?in|sign\s?in|sign\s?up|just a moment|access denied|attention required|chatgpt)[.!…]*$/i.test(name)
  ) {
    return null
  }

  return {
    name,
    handle: CODEX_PROFILE_HANDLE,
    avatarUrl: publicAvatarUrl(metadata.get("og:image")),
  }
}
