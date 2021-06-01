import { createSlice } from '@reduxjs/toolkit'

export const routeDataSlice = createSlice({
  name: 'routeData',
  initialState: {
    value: {},
  },
  reducers: {
    setRouteData: (state, action) => {
      state.value = action.payload
    },
  },
})
export const { setRouteData } = routeDataSlice.actions
export default routeDataSlice.reducer
