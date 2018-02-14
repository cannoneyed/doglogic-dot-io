import createRouter from 'router5'
import loggerPlugin from 'router5/plugins/logger'
import listenersPlugin from 'router5/plugins/listeners'
import browserPlugin from 'router5/plugins/browser'

const routes = [{ name: 'default', path: '/' }]

export default function configureRouter() {
  const router = createRouter(routes, {
    defaultRoute: 'default',
  })
  // Plugins
  router.usePlugin(browserPlugin()).usePlugin(listenersPlugin())

  if (process.env.NODE_ENV === 'development') {
    router.usePlugin(loggerPlugin)
  }

  router.canActivate('default', (_router) => (toState, fromState) => {
    return true
  })

  return router
}
