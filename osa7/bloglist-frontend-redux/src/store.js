import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import thunk from 'redux-thunk'
import blogFormReducer from './reducers/blogFormReducer'
import loggedReducer from './reducers/loginReducer'

const store = configureStore(
  {
    reducer: {
      notification: notificationReducer,
      blogs: blogReducer,
      form: blogFormReducer,
      login: loggedReducer,
    },
  },
  applyMiddleware(thunk)
)

export default store
