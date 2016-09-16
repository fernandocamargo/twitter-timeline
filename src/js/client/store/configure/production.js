import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import appReducer from './../../reducers/app'

export default function configureStore (preloadedState) {
  return createStore(
    appReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
}
