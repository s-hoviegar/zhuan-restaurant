import { useContext } from "react";
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

  // const price = `$${props.price.toFixed(2)}`;
  // const price = props.price;

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
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
      description: props.description,
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

  return (
    <Card>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <h6>
          <Badge pill bg="dark" text="light">
            {props.category}
          </Badge>
        </h6>
        <Card.Text>{props.description}</Card.Text>

        <h6>
          <Button variant="success" size="sm" onClick={addToCartHandler}>
            <RiAddBoxFill /> Add to order list
          </Button>
        </h6>
        {authCtx.isLoggedIn && authCtx.isAdmin && authCtx.isVerified && (
          <div>
            <Button variant="dark" size="sm" onClick={onEditHandler}>
              <RiEditBoxFill />
            </Button>{" "}
            <Button variant="dark" size="sm" onClick={onDeleteHandler}>
              <RiDeleteBin5Fill />
            </Button>
          </div>
        )}
      </Card.Body>
      <Card.Footer>{props.price} $</Card.Footer>
    </Card>
  );
};

export default MealItem;
