import React, { useContext } from 'react';
import { WebsiteContext } from './App';
export default function Cart() {
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
