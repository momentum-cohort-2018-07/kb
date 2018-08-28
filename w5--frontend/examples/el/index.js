function el (tagName = 'div', attrs = {}, children = []) {
  let element = document.createElement(tagName)

  // TODO use attrs
  for (let pair of Object.entries(attrs)) {
    let [key, value] = pair
    if (key === 'className') {
      element.classList.add(value)
    } else if (key === 'classList') {
      for (let cssClass of value) {
        element.classList.add(cssClass)
      }
    } else if (key === 'dataset') {
      for (let dataKey of Object.keys(value)) {
        element.dataset[dataKey] = value[dataKey]
      }
    } else if (key.startsWith('on')) {
      element.addEventListener(key.slice(2), value)
    } else {
      element.setAttribute(key, value)
    }
  }

  for (let child of children) {
    if (typeof child === 'string') {
      child = document.createTextNode(child)
    }
    element.appendChild(child)
  }

  return element
}

export default el
