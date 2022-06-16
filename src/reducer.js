export const PRODUCTS = [
  { id: 1, title: 'nike1', price: 100 },
  { id: 2, title: 'nike2', price: 200 },
  { id: 3, title: 'nike3', price: 300 },
  { id: 4, title: 'nike4', price: 400 },
];
export const initialState = {
  products: PRODUCTS,
  cart: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'add-to-cart':
      return { ...state, cart: action.payload };
    case 'update-cart':
      return { ...state, cart: action.payload };
    case 'remove-from-cart':
      return { ...state, cart: action.payload };

    default:
      return state;
  }
}
