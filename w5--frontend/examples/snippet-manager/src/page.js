export function mount (child) {
  const root = document.getElementById('root')
  if (root.firstChild) {
    root.replaceChild(child, root.firstChild)
  } else {
    root.appendChild(child)
  }
}
