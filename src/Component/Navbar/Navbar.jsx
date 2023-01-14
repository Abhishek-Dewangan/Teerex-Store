import React, {useState} from 'react';
import {GiShoppingCart} from 'react-icons/gi';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.main}>
      <div>
        <p>TeeRex Store</p>
      </div>
      <div className={styles.checkout}>
        <p>Products</p>
        <div className={styles.shoppingCart}>
          <span className={styles.countNotification}>{count}</span>
          <GiShoppingCart
            onClick={() => setCount(count + 1)}
            className={styles.shoppingIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
