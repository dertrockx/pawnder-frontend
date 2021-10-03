import React from 'react';
import styles from './StoryTag.module.css';

const StoryTag = ({ data }) => {
  const tagArr = data.split(", ");
  
  return (
    <div className={styles.baseStyles}>
    {
      tagArr.map(tag => (
        <div className={styles.tagContainer}>
          <div className={styles.triangle} />
          <p className="caption">
            {tag}
          </p>
        </div>
      ))
    }
    </div>
  );
}

export default StoryTag;
