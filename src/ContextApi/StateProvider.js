// Setup data layer
// We need this to track the basket

import React, { createContext, useContext, useReducer } from "react";

// This is the data layer
export const StateContext = createContext();

// Build A Provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// This is how we use it inside of a component
export const useStateValue = () => useContext(StateContext);

// --> Then I need to do some work with Index.js file---
// // import { StateProvider } from "./ContextApi/StateProvider";
// // import reducer, { initialState } from "./ContextApi/reducer";

// // <StateProvider initialState={initialState} reducer={reducer}>
// // <App />
// // </StateProvider>

// -->> To use it on a page o component---
// // import { useStateValue } from "../../ContextApi/StateProvider";
// //   const [{ basket }, dispatch] = useStateValue();
