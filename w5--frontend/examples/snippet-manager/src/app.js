import createRouter from './router'
import store from './store'

const router = createRouter(store)
store.router = router

export default {
  router: router,
  store: store
}
