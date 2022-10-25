import { useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { RiAddBoxFill } from "react-icons/ri";
import { RiEditBoxFill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";

import CartContext from "../../../store/cart-context";
import AuthContext from "../../../store/auth-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const intl = useIntl();

  // const price = `$${props.price.toFixed(2)}`;
  // const price = props.price;

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      nameFa: props.nameFa,
      amount: 1,
      price: props.price,
      img: props.img,
      category: props.category,
    });
  };

  const onEditHandler = () => {
    // console.log("edit" + props.id);
    const editingItem = {
      id: props.id,
      name: props.name,
      nameFa: props.nameFa,
      description: props.description,
      descriptionFa: props.descriptionFa,
      price: props.price,
      img: props.img,
      category: props.category,
    };
    props.editItem(editingItem);
  };

  const onDeleteHandler = () => {
    // console.log("delete" + props.id);
    props.deleteItem(props.id);
  };

  let category;
  switch (props.category) {
    case "mainCourse":
      category = (
        <FormattedMessage
          id="mealItemForm.mealCategoryMainCourse"
          defaultMessage="Main Course"
        />
      );
      break;
    case "appetizer":
      category = (
        <FormattedMessage
          id="mealItemForm.mealCategoryAppetizer"
          defaultMessage="Appetizer"
        />
      );
      break;
    case "breakfast":
      category = (
        <FormattedMessage
          id="mealItemForm.mealCategoryBreakfast"
          defaultMessage="Breakfast"
        />
      );
      break;
    case "hotDrinks":
      category = (
        <FormattedMessage
          id="mealItemForm.mealCategoryHotDrinks"
          defaultMessage="Hot Drinks"
        />
      );
      break;
    case "coldDrinks":
      category = (
        <FormattedMessage
          id="mealItemForm.mealCategoryColdDrinks"
          defaultMessage="Cold Drinks"
        />
      );
      break;
    default:
      category = (
        <FormattedMessage
          id="mealItemForm.mealCategoryNone"
          defaultMessage="Misc"
        />
      );
  }

  let editBtns = null;
  if (authCtx.isLoggedIn && authCtx.isAdmin && authCtx.isVerified) {
    editBtns = (
      <div>
        <Button variant="dark" size="sm" onClick={onEditHandler}>
          <RiEditBoxFill />
        </Button>{" "}
        <Button variant="dark" size="sm" onClick={onDeleteHandler}>
          <RiDeleteBin5Fill />
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>
          {intl.locale === "en" ? props.name : props.nameFa}
        </Card.Title>
        <h6>
          <Badge pill bg="dark" text="light">
            {category}
          </Badge>
        </h6>
        <Card.Text>
          {intl.locale === "en" ? props.description : props.descriptionFa}
        </Card.Text>

        <h6>
          <Button variant="success" size="sm" onClick={addToCartHandler}>
            <RiAddBoxFill />{" "}
            <FormattedMessage
              id="mealItem.addToOrderlist"
              defaultMessage="Add to order list"
            />
          </Button>
        </h6>
        {editBtns}
      </Card.Body>
      <Card.Footer>
        {intl.formatNumber(props.price)}{" "}
        {intl.locale === "en" ? "Toman" : "تومان"}
      </Card.Footer>
    </Card>
  );
};

export default MealItem;
