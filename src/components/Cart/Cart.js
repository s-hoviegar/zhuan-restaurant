import React, { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Button from "react-bootstrap/Button";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const intl = useIntl();

  const totalAmount = `${cartCtx.totalAmount.toFixed(0)} ${
    intl.locale === "en" ? "Toman" : "تومان"
  }`;
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
          nameFa={item.nameFa}
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
      <p>
        <FormattedMessage
          id="cart.orderText"
          defaultMessage="Tell waiter/waitress your order..."
        />
      </p>
      <div className={classes.actions}>
        <Button variant="outline-dark" onClick={submitOrderHandler}>
          <FormattedMessage id="cart.clearAll" defaultMessage="Clear all" />
        </Button>
        <Button variant="dark" onClick={props.onClose}>
          <FormattedMessage id="cart.ok" defaultMessage="Ok!" />
        </Button>
      </div>
    </>
  );

  const modalActions = (
    <div className={classes.actions}>
      <Button variant="outline-dark" onClick={props.onClose}>
        <FormattedMessage id="cart.close" defaultMessage="Close" />
      </Button>
      <Button variant="dark" onClick={orderHandler}>
        <FormattedMessage id="cart.order" defaultMessage="Order" />
      </Button>
    </div>
  );

  let cartModalContent = null;
  if (!hasItems) {
    cartModalContent = (
      <>
        <p>
          <FormattedMessage
            id="cart.noItemInOrderList"
            defaultMessage="There is no items in your order list. Try adding some items to see
          them here!"
          />
        </p>
        <div className={classes.actions}>
          <Button variant="dark" onClick={props.onClose}>
            <FormattedMessage id="cart.ok" defaultMessage="Ok!" />
          </Button>
        </div>
      </>
    );
  } else {
    cartModalContent = (
      <React.Fragment>
        {cartItems}
        <div className={classes.total}>
          <span>
            <FormattedMessage
              id="cart.totalAmount"
              defaultMessage="Total Amount"
            />
          </span>
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
