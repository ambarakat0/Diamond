/** @format */

import React, { createContext, useState } from "react";
import firebase from "../components/Firebase/Firebase";

let initState = null;

export const authStateContext = createContext(initState);

export const AuthStateProvider = ({ children }) => {
   const [state, setUser] = useState(null);
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         setUser(user);
      } else return setUser(null);
   });
   return (
      <authStateContext.Provider value={{ initState: state }}>
         {children}
      </authStateContext.Provider>
   );
};
