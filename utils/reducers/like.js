const INITIAL_STATE = {
  likes: [],
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LIKES":
      return {
        ...state,
        likes: action?.payload ?? [],
      };
    case "CLEAR_LIKES":
      return {
        ...state,
        likes: [],
      };
    default:
      return state;
  }
};
export default reducers;
