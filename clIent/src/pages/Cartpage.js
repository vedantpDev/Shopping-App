import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Actions";
import { updatePrice } from "../Actions";

const Cartpage = () => {
  const dispatch = useDispatch();

  const [price, setPrice] = useState();

  const { cartList } = useSelector((store) => store.productDataReducer);
  const [quantity, setQuantity] = useState(10);
  const minusHandler = (id) => {
    setQuantity(quantity - 1);
    dispatch(updatePrice(id, quantity));
  };

  const deleteItem = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((data, i) => {
            return (
              <tr key={i}>
                <th>{data.id}</th>
                <td>{data.name}</td>
                <td>
                  <img src={data.pic} />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => minusHandler(data.id)}
                    className="btn btn-danger"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  {/* <span>{data.price * 80 * quantity}</span> */}

                  <button type="button" className="btn btn-primary">
                    +
                  </button>
                </td>
                <td> {data.price * 80 * quantity}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => deleteItem(data.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Cartpage;
