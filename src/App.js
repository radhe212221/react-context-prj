import React, { createContext, useReducer, useContext } from 'react';
import { reducer, initialState } from './reducer';
import Site from './site';
import Cart from './Cart';

export const WebsiteContext = createContext();
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WebsiteContext.Provider value={{ state, dispatch }}>
      <Site />
      <Cart />
    </WebsiteContext.Provider>
  );
}
