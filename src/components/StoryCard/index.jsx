import React from 'react';
import styles from './StoryCard.module.css';
import { Link } from 'react-router-dom';
import StoryTag from 'components/StoryTag';

import { IoCalendarOutline, IoFolderOutline } from 'react-icons/io5';

import moment from 'moment';

const StoryCard = (props) => {
  const {
    children, // will use children prop for when the loginType is institution
    data,
    type,
  } = props;
  
  return(
    <>
    { (type === "user" || type === null) 
      ? data.map(story => (
        <div key={story.id} className={styles.baseStyles}>
          <img src={story.headlineURL} alt="" className={styles.image} />
          <div className={styles.rightContainer}>
            <div className={styles.titleContainer}>
              <h2 className="heading-2">{story.title}</h2>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.paragraphContainer}>
                <p className="paragraph">{story.body}</p>
              </div>
              <p className={`link-text ${styles.linkText}`}>
                <Link to={`stories/${story.id}`}>
                  Read More
                </Link>
              </p>
            </div>
            <div className={styles.bottomContainer}>
              <p className={`caption ${styles.icon}`} ><IoCalendarOutline /> {moment(`${story.publishedAt}`, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format("MMMM D YYYY")}</p>
              <p className={`caption ${styles.icon}`} ><IoFolderOutline /> {story.institutionName}</p>
              {/* <p className="caption">Tags: {story.tags}</p> */}
              <StoryTag data={ story.tags } className={styles.tagContainer}/>
            </div>
          </div>
        </div>
        )) 
      : <h1>Institution</h1>
    }
    </>
  );
}

export default StoryCard;