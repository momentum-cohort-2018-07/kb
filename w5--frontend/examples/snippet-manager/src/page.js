export function mount (child) {
  const root = document.getElementById('root')
  console.log('child', child)
  console.log('firstChild', root.firstChild)
  if (root.firstChild) {
    root.replaceChild(child, root.firstChild)
  } else {
    root.appendChild(child)
  }
}
