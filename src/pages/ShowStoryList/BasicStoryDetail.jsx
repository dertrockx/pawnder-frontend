import React from 'react';
import { useParams } from 'react-router-dom';

const BasicStoryDetail = ({ data }) => {
  const { id } = useParams();

  return(
    <div>
      {
        data
          .filter(story => story.id === id)
          .map(story => {
            <div key={story.id}>
              <h1 className="heading-1">{story.title}</h1>
              <p className="paragraph">{story.body}</p>
              <p className="caption">{story.institutionName}</p>
            </div>
          })
      }
    </div>
  );
}

export default BasicStoryDetail;