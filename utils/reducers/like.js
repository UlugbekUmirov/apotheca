const INITIAL_STATE = {
  likes: [],
  results: [],
  resultImage: "",
  baskets: [],
  count: 1,
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
    case "SET_RESULTS":
      console.log("reducer", action?.payload);
      return {
        ...state,
        results: action?.payload ?? [],
      };
    case "SET_IMAGE":
      return {
        ...state,
        resultImage: action?.payload ?? "",
      };
    case "SET_BASKET":
      return {
        ...state,
        baskets: [...state.baskets, { id: action?.payload ?? 0, count: 1 }],
      };
    case "DEL_BASKET":
      const b = state.baskets;
      let l = [];
      b.forEach((obj) => {
        if (obj.id !== action.payload) {
          l.push(obj);
          console.log("llll", l);
        }
      });
      return {
        ...state,
        baskets: l,
      };
    case "SET_COUNT":
      console.log('count' ,count);
      return {
        ...state,
        count: action?.payload ?? 1,
      };
    default:
      return state;
  }
};
export default reducers;
