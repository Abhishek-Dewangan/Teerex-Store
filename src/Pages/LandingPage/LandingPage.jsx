import React, {useEffect, useState} from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState([]);
  const [color, setColor] = useState([]);
  const [gender, setGender] = useState([]);
  const [price, setPrice] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // Applying filter data
  const filterData = () => {
    setTemp([...products]);
    if (color.length) {
      let filterData = temp.filter(
        (el) =>
          el.color === color[0] ||
          el.color === color[1] ||
          el.color === color[2]
      );
      setTemp([...filterData]);
    }
    if (gender.length) {
      let filterData = temp.filter(
        (el) => el.gender === gender[0] || el.gender === gender[1]
      );
      setTemp([...filterData]);
    }
    if (type.length) {
      console.log(type);
      let filterData = temp.filter(
        (el) =>
          el.type === type[0] || el.type === type[1] || el.type === type[2]
      );
      setTemp([...filterData]);
    }
  };

  useEffect(() => {
    filterData();
  }, [color, gender, type, price]);

  // Collecting filter values
  const setFilterValues = (e) => {
    const {value, checked, name} = e.target;
    switch (name) {
      case 'color':
        if (checked) setColor([...color, value]);
        else {
          color.splice(color.indexOf(value), 1);
          setColor([...color]);
        }
        break;
      case 'gender':
        if (checked) setGender([...gender, value]);
        else {
          gender.splice(gender.indexOf(value), 1);
          setGender([...gender]);
        }
        break;
      case 'price':
        if (checked) setPrice([...price, value]);
        else {
          price.splice(price.indexOf(value), 1);
          setPrice([...price]);
        }
        break;
      case 'type':
        if (checked) setType([...type, value]);
        else {
          type.splice(type.indexOf(value), 1);
          setType([...type]);
        }
        break;
      default:
        break;
    }
  };

  // Api call to get products
  const getProducts = async () => {
    const res = await fetch(
      'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
    ).then((res) => res.json());
    setProducts(res);
    setTemp(res);
  };

  return (
    <div className={styles.main}>
      <div className={styles.filterBar}>
        <form onChange={setFilterValues}>
          <div>
            <p>Color</p>
            <label className={styles.label} htmlFor='color'>
              <input name='color' id='color' type={'checkbox'} value='Red' />
              <span>Red</span>
            </label>
            <label className={styles.label}>
              <input name='color' type={'checkbox'} value='Blue' />
              <span>Blue</span>
            </label>
            <label className={styles.label}>
              <input name='color' type={'checkbox'} value='Green' />
              <span>Green</span>
            </label>
          </div>
          <div>
            <p>Gender</p>
            <label className={styles.label}>
              <input name='gender' type={'checkbox'} value='Men' />
              <span>Men</span>
            </label>
            <label className={styles.label}>
              <input name='gender' type={'checkbox'} value='Women' />
              <span>Women</span>
            </label>
          </div>
          <div>
            <p>Price</p>
            <label className={styles.label}>
              <input name='price' type={'checkbox'} value='0-250' />
              <span>0-Rs 250</span>
            </label>
            <label className={styles.label}>
              <input name='price' type={'checkbox'} value='251-450' />
              <span>Rs 251-Rs 450</span>
            </label>
            <label className={styles.label}>
              <input name='price' type={'checkbox'} value='450' />
              <span>Rs 450</span>
            </label>
          </div>
          <div>
            <p>Type</p>
            <label className={styles.label}>
              <input name='type' type={'checkbox'} value='Polo' />
              <span>Polo</span>
            </label>
            <label className={styles.label}>
              <input name='type' type={'checkbox'} value='Hoodie' />
              <span>Hoodie</span>
            </label>
            <label className={styles.label}>
              <input name='type' type={'checkbox'} value='Basic' />
              <span>Basic</span>
            </label>
          </div>
        </form>
      </div>
      <div className={styles.products}>
        {temp &&
          temp.map((elem) => {
            return (
              <div className={styles.productBox} key={elem.id}>
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
