export const initialState = {
  user: null,
  basket: [],
};

export const getBasketTotal = (basket) => {
  let total = 0;
  basket.forEach((item) => (total += item.price));

  return total.toFixed(2);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BASKET":
      return {
        ...state,
        basket: action.basket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter((prod) => prod.id !== action.id),
      };

    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default reducer;
