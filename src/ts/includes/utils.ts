export function prependBase() {
  const base = import.meta.env?.BASE_URL || '/'
  if (base === '/') return

  document.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href')

    if (href?.startsWith('/')) {
      link.setAttribute('href', base + href.slice(1))
    }
  })

  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src')
    if (!src || src?.startsWith(base)) return
    img.setAttribute('src', base + src.slice(1))
  })
}
