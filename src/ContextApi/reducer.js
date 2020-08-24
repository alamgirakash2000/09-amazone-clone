import { database } from "../Firebase/Firebase";

export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) => {
  let sum = 0;
  basket.map((item) => {
    sum += item.price;
  });
  return sum;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD":
      // Logic for adding item to basket
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE":
      // Logic for the Removing item from basket
      let newBasket = [...state.basket];
      const index = state.basket.findIndex((item) => item.id === action.id);
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove the product of id: ${action.id}.`);
      }
      return { ...state, basket: newBasket };
    case "EMPTY":
      return {
        ...state,
        basket: [],
      };
    case "ADD_ARRAY":
      return {
        ...state,
        basket: action.array,
      };
    default:
      return state;
  }
};

export default reducer;
