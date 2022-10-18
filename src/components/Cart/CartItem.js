import classes from "./CartItem.module.css";
import { useIntl } from "react-intl";

const CartItem = (props) => {
  const intl = useIntl();

  const price = `${props.price.toFixed(0)} ${
    intl.locale === "en" ? "Toman" : "تومان"
  }`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{intl.locale === "en" ? props.name : props.nameFa}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
