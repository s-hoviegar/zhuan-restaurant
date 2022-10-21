import classes from "./CartItem.module.css";
import { useIntl } from "react-intl";

const CartItem = (props) => {
  const intl = useIntl();

  const price = props.price.toFixed(0);

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{intl.locale === "en" ? props.name : props.nameFa}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>
            {intl.formatNumber(price)}{" "}
            {intl.locale === "en" ? "Toman" : "تومان"}
          </span>
          <span className={classes.amount}>
            {intl.locale === "en"
              ? `x ${intl.formatNumber(props.amount)}`
              : `${intl.formatNumber(props.amount)} x`}
          </span>
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
