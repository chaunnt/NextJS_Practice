import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';
import commonReducer from './slices/common'

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    common: commonReducer,
  },
});
