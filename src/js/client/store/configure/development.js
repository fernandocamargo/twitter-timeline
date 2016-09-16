import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import DevTools from './../../containers/devtools'
import appReducer from './../../reducers/app'

function replaceReducer (store) {
  store.replaceReducer(require('./../../reducers/app').default)
  return store
}

function acceptReducer (store, module) {
  module.hot.accept('./../../reducers/app', replaceReducer(store))
  return store
}

function checkHMR (store) {
  return (module.hot ? acceptReducer(store, module) : store)
}

export default function configureStore (preloadedState) {
  const store = createStore(
    appReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger()),
      applyMiddleware(thunk),
      DevTools.instrument()
    )
  )
  return checkHMR(store)
}
