// darkModeReducer.jsx

const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT":
      return { darkMode: false };  // Set light mode
    case "DARK":
      return { darkMode: true };   // Set dark mode
    case "TOGGLE":
      return { darkMode: !state.darkMode }; // Toggle between light and dark mode
    default:
      return state; // Return current state if action type is unrecognized
  }
};

export default DarkModeReducer;
