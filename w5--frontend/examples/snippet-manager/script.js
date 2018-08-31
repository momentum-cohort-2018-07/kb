import 'shoelace-css/dist/shoelace.css'
import './styles.css'

import Router from 'vanilla-router'
import store from './src/store'
import views from './src/views'

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

app.start()
