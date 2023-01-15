import React, {useEffect, useState} from 'react';
import {GiShoppingCart} from 'react-icons/gi';
import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({prop}) => {
  const [totalItem, setTotalItem] = useState();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setTotalItem(cartData.length);
  }, [prop.item]);

  return (
    <div className={styles.main}>
      <div>
        <Link to={'/'} className={styles.home}>
          <p>TeeRex Store</p>
        </Link>
      </div>
      <div className={styles.checkout}>
        <p>Products</p>
        <div className={styles.shoppingCart}>
          <span className={styles.countNotification}>{totalItem}</span>
          <Link to={'/precheckout'}>
            <GiShoppingCart className={styles.shoppingIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
