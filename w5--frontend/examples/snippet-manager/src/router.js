import Router from 'vanilla-router'

export default (store) => {
  const router = new Router({
    mode: 'history'
  })

  router.add('', () => {
    store.changeView('main')
  })

  router.add('edit/{id}', (id) => {
    store.changeView('editSnippet', {id: id})
  })

  router.addUriListener()
  router.check()

  return router
}
