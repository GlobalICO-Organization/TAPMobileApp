import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import frontDataReducer from '../slice/frontDataSlice'
import backDataReducer from '../slice/backDataSlice'
import userDataReducer from '../slice/userDataSlice'
import routeDataReducer from '../slice/routeDataSlice'

const middleware = [
  ...getDefaultMiddleware({ thunk: false }),
]

export default configureStore({
  reducer: {
    frontData:frontDataReducer,
    backData:backDataReducer,
    userData:userDataReducer,
    routeData:routeDataReducer,
  },
  middleware,
})
