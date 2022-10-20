import { useState } from "react";
import { FormattedMessage } from "react-intl";
import Modal from "react-bootstrap/Modal";

import HeaderCartButton from "../Layout/HeaderCartButton";
import Cart from "../Cart/Cart";
import Meals from "../Meals/Meals";

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
          <Modal.Header className={classes.header} closeButton>
            <Modal.Title>
              <FormattedMessage
                id="startingPage.orderList"
                defaultMessage="Your order list"
              />
            </Modal.Title>
          </Modal.Header>
          <Cart onClose={hideCartModal} />
        </Modal>
      }
      <HeaderCartButton onClick={showCartModal}></HeaderCartButton>
      <section className={classes.starting}>
        <h2>
          <FormattedMessage
            id="startingPage.welcomeTitle"
            defaultMessage="Welcome to Zhuan Restaurant"
          />
        </h2>
        <h6>
          <FormattedMessage
            id="startingPage.welcomeBody"
            defaultMessage="Please choose your favourite meals and add them in your order list."
          />
        </h6>

        <Meals />
      </section>
    </>
  );
};

export default StartingPageContent;
