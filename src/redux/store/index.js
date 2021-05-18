import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import imageDataReducer from '../slice/imageDataSlice'

const middleware = [
  ...getDefaultMiddleware({ thunk: false }),
];

export default configureStore({
  reducer: {
    imageData:imageDataReducer,
  },
  middleware,
});
