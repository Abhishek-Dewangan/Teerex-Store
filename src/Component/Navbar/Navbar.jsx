import React from 'react';
import {GiShoppingCart} from 'react-icons/gi';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.main}>
      <div>
        <p>TeeRex Store</p>
      </div>
      <div className={styles.checkout}>
        <p>Products</p>
        <GiShoppingCart className={styles.shoppingIcon}/>
      </div>
    </div>
  );
};

export default Navbar;
