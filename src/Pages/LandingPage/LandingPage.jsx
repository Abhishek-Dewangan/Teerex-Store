import React, {useEffect, useState} from 'react';
import FilterBar from '../../Component/FilterBar/FilterBar';
import styles from './LandingPage.module.css';

const LandingPage = ({prop}) => {
  let cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState([]);
  const [color, setColor] = useState([]);
  const [gender, setGender] = useState([]);
  const [price, setPrice] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // Applying filters
  const filterByColors = (array) => {
    return array.filter(
      (el) =>
        el.color === color[0] || el.color === color[1] || el.color === color[2]
    );
  };
  const filterByGender = (array) => {
    return array.filter(
      (el) => el.gender === gender[0] || el.gender === gender[1]
    );
  };
  const filterByType = (array) => {
    return array.filter(
      (el) => el.type === type[0] || el.type === type[1] || el.type === type[2]
    );
  };
  const filterByPrice = (array) => {
    console.log(price);
    let a1 = [],
      a2 = [],
      a3 = [];
    if (price.includes('1')) a1 = array.filter((el) => el.price <= 250);
    if (price.includes('2')) {
      a2 = array.filter((el) => el.price > 250 && el.price <= 450);
    }
    if (price.includes('3')) a3 = array.filter((el) => el.price >= 451);
    return [...a1, ...a2, ...a3];
  };

  useEffect(() => {
    let result = [...products];
    if (color.length) result = filterByColors(result);
    if (gender.length) result = filterByGender(result);
    if (type.length) result = filterByType(result);
    if (price.length) result = filterByPrice(result);
    if (search) result = findProduct(result);
    setTemp([...result]);
  }, [color, gender, type, price, search]);

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
    setProducts([...res]);
    setTemp([...res]);
  };

  const addToCart = (product) => {
    let isExist = cartData.find((elem) => elem.id === product.id);
    if (!isExist) {
      cartData = [...cartData, product];
      localStorage.setItem('cart', JSON.stringify(cartData));
      prop.setItem(cartData);
    } else {
      alert('Item already exist in cart');
    }
  };
  useEffect(() => {}, [search]);

  const findProduct = (array) => {
    return array.filter((elem) =>
      elem.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.filterBar}>
        <FilterBar prop={{setFilterValues}} />
      </div>
      <div className={styles.content}>
        <div className={styles.search}>
          <input
            type={'text'}
            className={styles.searchInput}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.searchBtn} onClick={findProduct}>
            Search
          </button>
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
                    <button onClick={() => addToCart(elem)}>Add to cart</button>
                  </div>
                </div>
              );
            })}
          {!temp.length && (
            <img src='https://www.gitaa.in/img/NoRecordFound.png' alt='img' className={styles.notFound}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
