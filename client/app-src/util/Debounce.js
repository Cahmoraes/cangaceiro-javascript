export function debounce(fn, milissegundos) {
  let timer = 0
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(), milissegundos)
  }
}
