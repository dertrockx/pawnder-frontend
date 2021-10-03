import React from 'react'; 
import styles from './StoryDetailsTag.module.css';

const StoryDetailsTag = ({ data }) => {
    const tagArr = data.split(", "); 

    return (
        <>
        {
            tagArr.map(tag => (
                <div className = {styles.tags}>
                    <span className = 'caption'>{tag}</span>
                </div>
            ))
        }
        </>
    );
}

export default StoryDetailsTag;

