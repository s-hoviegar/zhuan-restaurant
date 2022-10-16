import { useState } from "react";
import HeaderCartButton from "../Layout/HeaderCartButton";
import Cart from "../Cart/Cart";
import Meals from "../Meals/Meals";

import Modal from "react-bootstrap/Modal";

import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const [showCart, setShowCart] = useState(false);

  const showCartModal = () => {
    setShowCart(true);
  };
  const hideCartModal = () => {
    setShowCart(false);
  };

  return (
    <>
      {
        <Modal show={showCart} onHide={hideCartModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Your order list</Modal.Title>
          </Modal.Header>
          <Cart onClose={hideCartModal} />
        </Modal>
      }
      <HeaderCartButton onClick={showCartModal}></HeaderCartButton>
      <section className={classes.starting}>
        <h2>Welcome to Zhuan Restaurant</h2>
        <h6>
          Please choose your favourite meals and add them in your order list.
        </h6>

        <Meals />
      </section>
    </>
  );
};

export default StartingPageContent;
