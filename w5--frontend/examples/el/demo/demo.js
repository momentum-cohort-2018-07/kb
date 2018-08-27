import el from '../index'

document.body.appendChild(el(
  'div',
  {
    id: 'main',
    classList: ['container', 'weird'],
    dataset: {
      previewUrl: 'http://google.com',
      userId: 1
    }
  },
  [
    el('h1', {
      onclick: () => window.alert('hi!')
    }, ['Hello world!']),
    el('p', {}, ['This is some ', el('strong', {}, ['strong']), ' text'])
  ]
))
