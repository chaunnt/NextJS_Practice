import { createContext, useReducer } from "react";

const SET_FILTERS = "SET_FILTERS";
const RESET_FILTERS = "RESET_FILTERS";

export const SearchAdvanceContext = createContext();

// actions
export const setFiltersAction = (filters = {}) => {
  return { type: SET_FILTERS, payload: filters };
};

export const resetFiltersAction = () => {
  return { type: RESET_FILTERS };
};

const initializeState = {
  filters: {},
};

const searchAdvanceReducer = (state, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        filters: {
          ...action.payload,
        },
      };
    case RESET_FILTERS:
      return initializeState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const SearchAdvanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchAdvanceReducer, initializeState);
  return (
    <SearchAdvanceContext.Provider value={[state, dispatch]}>
      {children}
    </SearchAdvanceContext.Provider>
  );
};

export default SearchAdvanceProvider;
