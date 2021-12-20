export function convertTextToDOM(buffer: BufferSource): Document {
  const decoder = new TextDecoder("windows-1251")
  const text = decoder.decode(buffer)
  let parser = new DOMParser()
  return parser.parseFromString(text, "text/xml")
}

export function debounce(func: () => void) {
  let timer: number
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func, 1000)
  }
}
