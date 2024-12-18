// darkModeContext.jsx

import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer"; // Ensure the path is correct

const INITIAL_STATE = {
  darkMode: false, // Initial state (light mode by default)
};

export const DarkModeContext = createContext(INITIAL_STATE); // Creating the context

// Provider component to wrap the app and provide darkMode state and dispatch function
export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE); // Use the reducer to manage state

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}  {/* Wrap the app components that need access to the context */}
    </DarkModeContext.Provider>
  );
};
