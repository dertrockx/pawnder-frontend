import React from 'react';
import { Link } from 'react-router-dom';
import { IoCalendarOutline, IoFolderOutline, IoTrashBin } from 'react-icons/io5';
import { IconButton } from '@chakra-ui/react';

import styles from './StoryCard.module.css';

import StoryTag from 'components/StoryTag';

import moment from 'moment';

const StoryCard = (props) => {
  const {
    children,
    data,
    type,
    publish,
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
            <div className={styles.bottomContainerView}>
              <p className={`caption ${styles.icon}`} ><IoCalendarOutline /> {moment(`${story.publishedAt}`, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format("MMMM D YYYY")}</p>
              <p className={`caption ${styles.icon}`} ><IoFolderOutline /> {story.institutionName}</p>
              <StoryTag data={ story.tags } />
            </div>
          </div>
        </div>
        ))
      : data.map(story => (
        <div key={story.id} className={styles.baseStyles}>
          <img src={story.headlineURL} alt="" className={styles.image} />
          <div className={styles.rightContainer}>
          <React.Fragment>{children}</React.Fragment>
            <div className={styles.titleContainer}>
              <h2 className="heading-2">{story.title}</h2>
            </div>
            <div className={styles.paragraphContainer}>
              <p className="paragraph">{story.body}</p>
            </div>
            <div className={styles.bottomAndButtonsContainer}>
              <div className={styles.bottomContainerManage}>
                <p className={`caption ${styles.icon}`} ><IoCalendarOutline style={{color: `var(--color-brand-default)`}} /> Created on {moment(`${story.createdAt}`, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format("MMMM D YYYY")}</p>
                { story.isDraft === true
                  ? <p className={`caption ${styles.icon}`} ><IoCalendarOutline style={{color: `var(--color-brand-darker)`}} /> To Be Published</p>
                  : <p className={`caption ${styles.icon}`} ><IoCalendarOutline style={{color: `var(--color-brand-darker)`}} /> Published on {moment(`${story.publishedAt}`, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format("MMMM D YYYY")}</p>
                }
                <div className={styles.tagContainer}>
                  <p className="caption">Tags: <i>{story.tags}</i></p>
                </div>
              </div>
              <div className={styles.buttons}>
                <Link to={`/manage-stories/${story.id}`}>
                  <div className={styles.outline}>Edit</div>
                </Link>
                {story.isDraft === true && <>{publish}</>}
              </div>
            </div>
          </div>
        </div>
      ))
    }
    </>
  );
}

export default StoryCard;
