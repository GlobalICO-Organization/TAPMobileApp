import { createSlice } from '@reduxjs/toolkit';

export const imageDataSlice = createSlice({
  name: 'imageData',
  initialState: {
    value: {},
  },
  reducers: {
    setImageData: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setImageData } = imageDataSlice.actions;
export default imageDataSlice.reducer;