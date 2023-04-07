import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import thunk from 'redux-thunk'
import blogFormReducer from './reducers/blogFormReducer'

const store = configureStore(
  {
    reducer: {
      notification: notificationReducer,
      blogs: blogReducer,
      form: blogFormReducer,
    },
  },
  applyMiddleware(thunk)
)

export default store
