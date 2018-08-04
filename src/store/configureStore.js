import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import serverApi from '../middleware/serverApi'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const logger = createLogger({
    duration: true,
    diff: false
  })

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, serverApi, logger)
  )

  return store
}