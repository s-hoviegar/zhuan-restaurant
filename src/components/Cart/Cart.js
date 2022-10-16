import React, { useContext, useState } from "react";

import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Button from "react-bootstrap/Button";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = () => {
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkout = (
    <>
      <p>Tell waiter/waitress your order...</p>
      <div className={classes.actions}>
        <Button variant="outline-dark" onClick={submitOrderHandler}>
          Clear all
        </Button>
        <Button variant="dark" onClick={props.onClose}>
          Ok
        </Button>
      </div>
    </>
  );

  const modalActions = (
    <div className={classes.actions}>
      <Button variant="outline-dark" onClick={props.onClose}>
        Close
      </Button>
      <Button variant="dark" onClick={orderHandler}>
        Order
      </Button>
    </div>
  );

  let cartModalContent = null;
  if (!hasItems) {
    cartModalContent = (
      <>
        <p>
          There is no items in your order list. Try adding some items to see
          them here!
        </p>
        <div className={classes.actions}>
          <Button variant="dark" onClick={props.onClose}>
            Ok
          </Button>
        </div>
      </>
    );
  } else {
    cartModalContent = (
      <React.Fragment>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && checkout}
        {!isCheckout && modalActions}
      </React.Fragment>
    );
  }

  return <div className={classes.cart}>{cartModalContent}</div>;
};

export default Cart;
