import React, {useEffect, useState} from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await fetch(
      'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
    ).then((res) => res.json());
    console.log(res);
    setProducts(res);
  };
  return (
    <div className={styles.main}>
      <div className={styles.filterBar}>FilterBar</div>
      <div className={styles.products}>
        {products &&
          products.map((elem, i) => {
            return (
              <div className={styles.productBox}>
                <p className={styles.productName}>{elem.name}</p>
                <div className={styles.imageBox}>
                  <img
                    className={styles.productImage}
                    src={elem.imageURL}
                    alt='T-Shirt'
                  />
                </div>
                <div className={styles.price}>
                  <p>Rs {elem.price}</p>
                  <button>Add to cart</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LandingPage;
