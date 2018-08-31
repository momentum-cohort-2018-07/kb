import createRouter from './router'
import store from './store'
import views from './views'

const router = createRouter(store)
store.router = router

export default {
  router: router,
  store: store,
  views: views
}
