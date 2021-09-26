import React from 'react';
import { useParams } from 'react-router-dom';

const BasicStoryDetail = ({ data }) => {
  const { id } = useParams();
  console.log(id);

  // const storyDetail = data.filter(story => story.id === parseInt(id))
  // console.log(storyDetail)

  return(
    <>
      Detail
      {
        data
          .filter(story => (story.id === parseInt(id)))
          .map(story => (
            <>
              {console.log(story.id)}
              <h1 className="heading-1">{story.title}</h1>
              <p className="paragraph">{story.body}</p>
              <p className="caption">{story.institutionName}</p>
            </>
          ))
      }
    </>
  );
}

export default BasicStoryDetail;