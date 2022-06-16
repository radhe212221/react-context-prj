import React, { createContext, useReducer, useContext } from 'react';
const PRODUCTS = [
  { id: 1, title: 'nike1', price: 100 },
  { id: 2, title: 'nike2', price: 200 },
  { id: 3, title: 'nike3', price: 300 },
  { id: 4, title: 'nike4', price: 400 },
];
const WebsiteContext = createContext();

const initialState = {
  products: PRODUCTS,
  cart: [],
};
function reducer(state = initialState, action) {
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
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WebsiteContext.Provider value={{ state, dispatch }}>
      <Site />
      <Cart />
    </WebsiteContext.Provider>
  );
}

function Site() {
  const data = useContext(WebsiteContext);
  // console.log(data);
  const addtocart = (product) => {
    let payload = null;
    if (data?.state?.cart?.some((x) => x?.id === product?.id)) {
      payload = data?.state?.cart?.map((x) =>
        x.id === product.id ? { ...x, qty: x.qty + 1 } : x
      );
    } else {
      payload = [...data?.state?.cart, { ...product, qty: 1 }];
    }
    data?.dispatch({ type: 'add-to-cart', payload });
  };
  return (
    <div>
      <h1>all products {data?.state?.products?.length}</h1>
      {data?.state?.products?.map((x) => (
        <div>
          <h4>
            {x.title}- {x.price}
          </h4>
          <button onClick={() => addtocart(x)}>add to cart</button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const data = useContext(WebsiteContext);
  const inc = (x) => {
    let payload = data?.state?.cart?.map((y) =>
      y.id === x.id ? { ...y, qty: y.qty + 1 } : y
    );
    
    data?.dispatch({ type: 'update-cart', payload });

  };
  const dec = (x) => {
    let payload = data?.state?.cart?.map((y) =>
      y.id === x.id ? { ...y, qty: y.qty - 1 } : y
    );
    
    data?.dispatch({ type: 'update-cart', payload });

  };

  const remove = (x) => {
    let payload = data?.state?.cart?.filter((y) => y.id !== x.id);
    data?.dispatch({ type: 'remove-from-cart', payload });
  };

  return (
    <div>
      <h1>Cart {data?.state?.cart?.length}</h1>
      {data?.state?.cart?.map((x) => (
        <li>
          {x.title}- {x.qty}
          <button disabled={x.qty > 10} onClick={() => inc(x)}>
            +
          </button>
          <button disabled={x.qty === 1} onClick={() => dec(x)}>
            -
          </button>
          <button onClick={() => remove(x)}>remove</button>
        </li>
      ))}
    </div>
  );
}
