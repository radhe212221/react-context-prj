import React, { useContext } from 'react';
import { WebsiteContext } from './App';
export default function Site() {
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
