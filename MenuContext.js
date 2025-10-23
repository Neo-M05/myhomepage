import React from 'react';

// Create the context
export const MenuContext = React.createContext();

// Create the provider component
export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = React.useState([]);
  
  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
};