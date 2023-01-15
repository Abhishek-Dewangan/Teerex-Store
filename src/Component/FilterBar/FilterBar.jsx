import React from 'react';
import styles from './FilterBar.module.css';

const FilterBar = ({prop}) => {
  return (
    <div className={styles.filterBar}>
      <form onChange={prop.setFilterValues}>
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
            <input name='price' type={'checkbox'} value={1} />
            <span>0-Rs 250</span>
          </label>
          <label className={styles.label}>
            <input name='price' type={'checkbox'} value={2} />
            <span>Rs 251-Rs 450</span>
          </label>
          <label className={styles.label}>
            <input name='price' type={'checkbox'} value={3} />
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
  );
};

export default FilterBar;
