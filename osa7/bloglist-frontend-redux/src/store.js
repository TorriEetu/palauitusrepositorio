import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'

const store = configureStore(
  {
    reducer: {
      notification: notificationReducer,
    },
  },
  applyMiddleware(thunk)
)

export default store
