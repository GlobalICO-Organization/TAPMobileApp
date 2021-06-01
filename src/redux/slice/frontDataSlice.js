import { createSlice } from '@reduxjs/toolkit'

export const frontDataSlice = createSlice({
  name: 'frontData',
  initialState: {
    value: {},
  },
  reducers: {
    setFrontData: (state, action) => {
      state.value = action.payload
    },
  },
})
export const { setFrontData } = frontDataSlice.actions
export default frontDataSlice.reducer