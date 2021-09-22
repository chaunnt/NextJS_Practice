import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAppStore, ICommonStore, TranslationLang } from '@/models/store.models'


const initialState: ICommonStore = {
  lang: TranslationLang.Vi
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLang(state: ICommonStore, action: PayloadAction<TranslationLang>) {
      state.lang = action.payload
    },
  },
})

// Selectors
export const commonStateSelectors = (state: IAppStore) => state.common

// Reducers and actions
export const commonStateActions = commonSlice.actions

export default commonSlice.reducer
