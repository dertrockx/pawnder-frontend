import React from 'react';

import StoryCard from './StoryCard';

const StoryContainer = (props) => {
  const data = props.data;
  console.log(`container: ${data}`);

  return (
    <div className="storyContainer">
      {/* <StoryCard data={ data } /> */}
    </div>
  );
}

export default StoryContainer;