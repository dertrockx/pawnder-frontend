import { story } from 'constants/ActionTypes';

const initialState = {
  fetchError: null, // Error message
  fetchingStories: false,
  stories: [],
};

export default function reducer(state = initialState, action={}) {
  switch(action.type) {
    case story.FETCH_STORIES_PENDING: {
      return {
        ...state,
        fetchingStories: true,
      };
    }

    case story.FETCH_STORIES_COMPLETED: {
      const { stories } = action.payload;
      return {
        ...state,
        fetchingStories: false,
        fetchError: false,
        stories,
      };
    }

    case story.FETCH_STORIES_FAILED: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        fetchingStories: false,
        fetchError: errorMessage,
      };
    }

    default:
      return state;
  }
}