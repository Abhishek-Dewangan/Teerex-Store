import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './PreCheckoutPage.module.css';

const PreCheckoutPage = ({prop}) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    prop.setItem(items);
  }, []);

  useEffect(() => {
    countTotal();
  }, [prop.item]);

  const countTotal = () => {
    let total = 0;
    prop.item.forEach((elem) => {
      total += elem.price;
    });
    setTotalAmount(total);
  };

  const deleteProduct = (id) => {
    let newCart = prop.item.filter((elem) => elem.id !== id);
    prop.setItem(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    countTotal();
  };

  return (
    <div>
      <h2 className={styles.heading}>Shopping Cart</h2>
      <div>
        {prop.item &&
          prop.item.map((elem) => {
            return (
              <div className={styles.product} key={elem.id}>
                <div className={styles.image}>
                  <img
                    src={elem.imageURL}
                    alt='T-Shirt'
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productDetails}>
                  <p className={styles.producName}>{elem.name}</p>
                  <p className={styles.producPrice}>Rs {elem.price}</p>
                </div>
                <div>
                  <button onClick={() => deleteProduct(elem.id)}>Delete</button>
                </div>
              </div>
            );
          })}
      </div>
      {!prop.item.length && <h3 className={styles.empty}>Empty cart list</h3>}
      <h4 className={styles.homepage}>
        <Link to={'/'} className={styles.link}>
          Continue Shopping
        </Link>
      </h4>
      <hr className={styles.horizontalLine} />
      <h3 className={styles.totalAmount}>Total Amount = {totalAmount}</h3>
    </div>
  );
};

export default PreCheckoutPage;
