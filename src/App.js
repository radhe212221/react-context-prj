import React, { createContext, useState, useContext } from 'react';
const PRODUCTS = [
  { id: 1, title: 'nike1', price: 100 },
  { id: 2, title: 'nike2', price: 200 },
  { id: 3, title: 'nike3', price: 300 },
  { id: 4, title: 'nike4', price: 400 },
];

const WebsiteContext = createContext();

export default function App() {
  const [products, setproducts] = useState(PRODUCTS);
  const [cart, setcart] = useState([]);

  const removeFromCart = (id) => {
    setcart(cart.filter((x) => x.id !== id));
  };
  const updateQty = (ob) => {
    setcart(cart.map((x) => (x.id === ob.id ? ob : x)));
  };
  const addToCart = (x) => {
    // console.log('add to cart', x);
    if (cart.some((y) => y.id === x.id)) {
      let { id, qty } = cart.find((y) => y.id === x.id);
      setcart(cart.map((y) => (y.id === id ? { ...x, qty: qty + 1 } : y)));
    } else {
      setcart([...cart, { ...x, qty: 1 }]);
    }
  };

  const value = {
    products,
    cart,
    addToCart,
    removeFromCart,
    updateQty,
  };
  return (
    <WebsiteContext.Provider value={value}>
      <Site />
      <Cart />
    </WebsiteContext.Provider>
  );
}

function Site() {
  const data = useContext(WebsiteContext);
  // console.log(data);
  const addtocart = (product) => {
    data?.addToCart(product);
  };
  return (
    <div>
      <h1>all products {data?.products?.length}</h1>
      {data?.products?.map((x) => (
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
    data?.updateQty({ ...x, qty: x.qty + 1 });
  };
  const dec = (x) => {
    data?.updateQty({ ...x, qty: x.qty - 1 });
  };
  const remove = (x) => {
    data?.removeFromCart(x.id);
  };

  return (
    <div>
      <h1>Cart {data?.cart?.length}</h1>
      {data?.cart?.map((x) => (
        <li>
          {x.title}- {x.qty}
          <button disabled={x.qty>10} onClick={() => inc(x)}>+</button>
          <button disabled={x.qty===1} onClick={() => dec(x)}>-</button>
          <button  onClick={() => remove(x)}>remove</button>
        </li>
      ))}
    </div>
  );
}
