import React from 'react';

// Hard-coded Today's Menu - This changes daily
const todaysSpecialMenu = [
  { 
    id: '1', 
    name: 'Garlic Butter Prawns', 
    price: 'R120', 
    image: require('./assets/buttergarlic.jpg'),
    course: 'Starter'
  },
  { 
    id: '2', 
    name: 'Grilledsteak', 
    price: 'R280', 
    image: require('./assets/grilledsteak.jpg'),
    course: 'Main'
  },
  { 
    id: '3', 
    name: 'Oreo', 
    price: 'R65', 
    image: require('./assets/oreo.png'),
    course: 'Dessert'
  },
  { 
    id: '4', 
    name: 'Quichesmini', 
    price: 'R85', 
    image: require('./assets/quichesmini.jpg'),
    course: 'Starter'
  },
];

// Create the context
export const MenuContext = React.createContext();

// Create the provider component
export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = React.useState([]);
  
  // Combine today's specials with chef-added items
  const allMenuItems = [...todaysSpecialMenu, ...menuItems];
  
  return (
    <MenuContext.Provider value={{ 
      menuItems, 
      setMenuItems,
      todaysSpecialMenu,
      allMenuItems 
    }}>
      {children}
    </MenuContext.Provider>
  );
};