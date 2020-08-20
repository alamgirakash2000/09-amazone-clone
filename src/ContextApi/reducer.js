export const initialState = {
  basket: [
    {
      id: "0001",
      title: "Harry Potter and the Philosopher's Stone",
      price: 10.49,
      rating: 5,
      image: "https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg",
    },
    {
      id: "0001",
      title: "Harry Potter and the Philosopher's Stone",
      price: 10.49,
      rating: 5,
      image: "https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg",
    },
  ],
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
  console.log(action);
  switch (action.type) {
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
    default:
      return state;
  }
};

export default reducer;
