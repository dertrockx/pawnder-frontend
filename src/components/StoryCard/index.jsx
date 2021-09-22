import React from 'react';
import styles from './StoryCard.module.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import StoryTag from 'components/StoryTag';

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
          <img src={story.headlineURL} alt="" />
          <h3 className="heading-3">{story.title}</h3>
          {/* Only print 3 lines in body */}
          <p className="paragraph">{story.body}</p>
          <p className="link-text">
            <Link to={`stories/${story.id}`}>
              Read More
            </Link>
          </p>
          <div>
            <p className="caption">{moment(`${story.publishedAt}`, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format("MMMM D YYYY")}</p>
            <p className="caption">{story.institutionName}</p>
            {/* <p className="caption">Tags: {story.tags}</p> */}
            <StoryTag data={story.tags} />

          </div>
          
        </div>
        )) 
      : <h1>Institution</h1>
    }
    {/* <h1>hey</h1> */}
    </>
  );
}

export default StoryCard;
