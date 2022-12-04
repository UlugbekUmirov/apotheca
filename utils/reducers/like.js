const INITIAL_STATE = {
  likes: [],
  results: [],
  resultImage: "",
  baskets: [],
  slug: [],
  slug: 0,
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LIKES":
      return {
        ...state,
        likes: [...state.baskets, { id: action?.payload ?? 0 }],
      };
    case "CLEAR_LIKES":
      const bl = state.likes;
      let llll = [];
      bl.forEach((obj) => {
        if (obj.id !== action.payload) {
          llll.push(obj);
        }
      });
      return {
        ...state,
        baskets: llll,
      };

    case "SET_RESULTS":
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
    case "SET_COUNT":
      const cc = state.results;
      let sl = cc
        .filter((item) => item.id === action?.payload)
        .forEach(({ slug }) => {
          return slug;
        });
      return {
        ...state,
        results: sl,
      };
    case "DEL_BASKET":
      const b = state.baskets;
      let l = [];
      b.forEach((obj) => {
        if (obj.id !== action.payload) {
          l.push(obj);
        }
      });
      return {
        ...state,
        baskets: l,
      };
    case "INCREMENT":
      return {
        ...state,
        baskets: [...state.baskets, { id, count: action?.payload ?? 1 }],
      };
    case "ADD_COUNT_BASKET":
      const bb = state.baskets;
      let ll = [];
      bb.forEach((obj) => {
        if (obj.id === action.payload) {
          ll.push({ ...obj, count: obj.count + 1 });
        } else {
          ll.push(obj);
        }
      });
      return {
        ...state,
        baskets: ll,
      };
    case "MINUS_COUNT_BASKET":
      const bbb = state.baskets;
      let lll = [];
      bbb.forEach((obj) => {
        if (obj.id === action.payload) {
          lll.push({
            ...obj,
            count: obj.count === 1 ? obj.count : obj.count - 1,
          });
        } else {
          lll.push(obj);
        }
      });
      return {
        ...state,
        baskets: lll,
      };
    default:
      return state;
  }
};
export default reducers;
