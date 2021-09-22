import React from 'react';
import { Link } from 'react-router-dom';

const StoryCard = ({ data }) => {
  console.log(`card: ${data}`)
  return (
    <>
      {data.map(story => {
        <div key={story.id} >
          <img src={story.headlineURL} />
          <h3 className="heading-3">{story.title}</h3>
          {/* Only print 3 lines in body */}
          <p className="paragraph">{story.body}</p>
          <p className="caption">{story.institutionName}</p>
          {/* Create component for Tag */}
          <p className="caption">Tags: {
            story.tags.map(tag => {
              <div style={{color: "white", backgroundColor:"grey"}}>
                <p className="caption">{tag}</p>
              </div>
            })
          }</p>
          <Link to={`stories/wat/${story.id}`}>
            <p className="link">Read More</p>
          </Link>
        </div>
      })}
    </>
  );
}
 
export default StoryCard;