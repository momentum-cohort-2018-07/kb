import Router from 'vanilla-router'
import store from './store'
import views from './views'

const router = new Router({
  mode: 'history'
})

router.add('', () => {
  store.changeView('main')
})

router.add('edit/{id}', (id) => {
  store.changeView('editSnippet', {id: id})
})

function mount (child) {
  const root = document.getElementById('root')
  if (root.firstChild) {
    root.replaceChild(child, root.firstChild)
  } else {
    root.appendChild(child)
  }
}

const app = {
  router: router,
  store: store,
  views: views,
  start: () => {
    app.store.router = router
    app.store.refreshFn = () => mount(views.app())
    app.router.addUriListener()
    app.router.check()
    app.store.retrieveSnippets()
  }
}

export default app
