"use client";

import React from 'react';
import styles from './Menu.module.css';
import Header from './Header';

interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

interface RestaurantMenuProps {
  [key: string]: {
    menuItems: MenuItem[];
  };
}

const restaurantMenus: RestaurantMenuProps = {
  'South Kitchen + Bar': {
    menuItems: [
      { name: 'Shrimp and Grits', price: '$15.99', description: 'Savory shrimp with creamy grits.' },
      { name: 'Steak Frites', price: '$22.99', description: 'Grilled steak with fries.' },
      { name: 'Chicken Sandwich', price: '$12.99', description: 'Crispy chicken with house sauce.' },
    ],
  },
'The National': {
    menuItems: [
      { name: 'Lamb Burger', price: '$14.99', description: 'A delicious lamb patty with tzatziki.' },
      { name: 'Hummus Plate', price: '$9.99', description: 'Served with pita and fresh veggies.' },
      { name: 'Braised Short Ribs', price: '$24.99', description: 'Slow-cooked short ribs with mash.' },
    ],
  },
  'Hilltop Grille': {
    menuItems: [
      { name: 'Prime Rib Sandwich', price: '$18.99', description: 'Thinly sliced prime rib with au jus.' },
      { name: 'Hilltop Salad', price: '$10.99', description: 'Mixed greens with seasonal toppings.' },
      { name: 'Baked Salmon', price: '$19.99', description: 'Fresh salmon with a lemon butter sauce.' },
    ],
  },
  'Porterhouse Grill': {
    menuItems: [
      { name: 'Filet Mignon', price: '$29.99', description: 'Tender filet with garlic mash.' },
      { name: 'Lobster Bisque', price: '$12.99', description: 'Rich and creamy lobster soup.' },
      { name: 'Pork Chop', price: '$21.99', description: 'Juicy chop with seasonal vegetables.' },
    ],
  },
  'Flama Brazilian Steak House': {
    menuItems: [
      { name: 'Picanha', price: '$27.99', description: 'Grilled top sirloin with chimichurri.' },
      { name: 'Feijoada', price: '$16.99', description: 'Traditional Brazilian black bean stew.' },
      { name: 'Grilled Pineapple', price: '$8.99', description: 'Cinnamon-roasted pineapple slices.' },
    ],
  },
  'Clocked': {
    menuItems: [
      { name: 'Classic Cheeseburger', price: '$10.99', description: 'Juicy beef patty with cheddar cheese.' },
      { name: 'Vegan Burger', price: '$11.99', description: 'Plant-based patty with vegan aioli.' },
      { name: 'Sweet Potato Fries', price: '$5.99', description: 'Crispy and perfectly seasoned.' },
    ],
  },
};

interface MenuProps {
  restaurantName: string;
}

const Menu: React.FC<MenuProps> = ({ restaurantName }) => {
  const restaurantMenu = restaurantMenus[restaurantName];

  if (!restaurantMenu) {
    return <p>No menu available for this restaurant.</p>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>{restaurantName} Menu</h1>
      <div className={styles.menuItems}>
        {restaurantMenu.menuItems.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <h2 className={styles.itemName}>{item.name}</h2>
            <p className={styles.itemPrice}>{item.price}</p>
            {item.description && <p className={styles.itemDescription}>{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
