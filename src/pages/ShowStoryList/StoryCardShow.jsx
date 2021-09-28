import React from 'react';
import { Link } from 'react-router-dom';
import { IoCalendarOutline, IoFolderOutline } from 'react-icons/io5';

import styles from './StoryCardShow.module.css';

import StoryTag from 'components/StoryTag';

import moment from 'moment';

const StoryCardShow = ({ story }) => {
  return (
    <div className={styles.baseStyles}>
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
          <StoryTag data={ story.tags } />
        </div>
      </div>
    </div>
  );
}

export default StoryCardShow;