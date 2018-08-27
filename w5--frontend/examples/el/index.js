function el (tagName = 'div', attrs = {}, children = []) {
  let element = document.createElement(tagName)

  // TODO use attrs
  for (let key of Object.keys(attrs)) {
    if (key === 'classList') {
      for (let cssClass of attrs[key]) {
        element.classList.add(cssClass)
      }
    } else if (key === 'dataset') {
      for (let dataKey of Object.keys(attrs[key])) {
        element.dataset[dataKey] = attrs[key][dataKey]
      }
    } else if (key === 'onclick') {
      element.addEventListener('click', attrs[key])
    } else {
      element.setAttribute(key, attrs[key])
    }

    // switch (key) {
    //   case 'classList':
    //     for (let cssClass of attrs[key]) {
    //       element.classList.add(cssClass)
    //     }
    //     break
    //   case 'dataset':
    //     for (let dataKey of Object.keys(attrs[key])) {
    //       element.dataset[dataKey] = attrs[key][dataKey]
    //     }
    //     break
    //   case 'onclick':
    //     element.addEventListener('click', attrs[key])
    //     break
    //   default:
    //     element.setAttribute(key, attrs[key])
    // }
  }

  // for (let i = 0; i < children.length; i++) {
  //   let child = children[i]
  //   element.appendChild(child)
  // }

  for (let child of children) {
    if (typeof child === 'string') {
      child = document.createTextNode(child)
    }
    element.appendChild(child)
  }

  return element
}

export default el
