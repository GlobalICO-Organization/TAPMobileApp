import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import imageDataReducer from '../slice/imageDataSlice'
import userDataReducer from '../slice/userDataSlice'

const middleware = [
  ...getDefaultMiddleware({ thunk: false }),
]

export default configureStore({
  reducer: {
    imageData:imageDataReducer,
    userData:userDataReducer,
  },
  middleware,
})
