import { createSlice } from '@reduxjs/toolkit'

export const backDataSlice = createSlice({
  name: 'backData',
  initialState: {
    value: {},
  },
  reducers: {
    setBackData: (state, action) => {
      state.value = action.payload
    },
  },
})
export const { setBackData } = backDataSlice.actions
export default backDataSlice.reducer