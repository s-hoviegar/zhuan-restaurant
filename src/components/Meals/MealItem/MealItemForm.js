import { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import { MdAddLink } from "react-icons/md";
import { MdOutlinePriceChange } from "react-icons/md";

const MealItemForm = (props) => {
  const [priceIsValid, setPriceIsValid] = useState(true);
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const imgInputRef = useRef();
  const priceInputRef = useRef();
  const categoryInputRef = useRef();

  useEffect(() => {
    if (props.editingItem !== null) {
      nameInputRef.current.value = props.editingItem.name;
      descriptionInputRef.current.value = props.editingItem.description;
      imgInputRef.current.value = props.editingItem.img;
      priceInputRef.current.value = props.editingItem.price;
      categoryInputRef.current.value = props.editingItem.category;
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPrice = priceInputRef.current.value;
    const enteredPriceNumber = +enteredPrice;
    const enteredName = nameInputRef.current.value;
    const enteredDesc = descriptionInputRef.current.value;
    const enteredImg = imgInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    if (enteredPrice.trim().length === 0 || enteredPriceNumber < 1) {
      setPriceIsValid(false);
      return;
    }

    let generatedId;
    if (props.editingItem !== null) {
      generatedId = props.editingItem.id;
      props.editItem({
        id: generatedId,
        name: enteredName,
        description: enteredDesc,
        price: enteredPriceNumber,
        img: enteredImg,
        category: enteredCategory,
      });
    } else {
      const rand = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
      generatedId = enteredName + rand;
      props.addItem({
        id: generatedId,
        name: enteredName,
        description: enteredDesc,
        price: enteredPriceNumber,
        img: enteredImg,
        category: enteredCategory,
      });
    }
  };

  const addCategoryHandler = (event) => {
    // console.log(event.target.name);
    categoryInputRef.current.value = event.target.name;
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Meal name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a name for the new meal item."
          ref={nameInputRef}
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} ref={descriptionInputRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Meal image</Form.Label>

        <InputGroup className="mb-3">
          <InputGroup.Text id="meal-item-image-link">
            <MdAddLink size={25} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Enter the URL of the image."
            aria-label="Enter the URL of the image."
            aria-describedby="meal-item-image-link"
            ref={imgInputRef}
          />
        </InputGroup>
      </Form.Group>

      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title="Category"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item name="Main Course" onClick={addCategoryHandler}>
            Main Course
          </Dropdown.Item>
          <Dropdown.Item name="Appetizer" onClick={addCategoryHandler}>
            Appetizer
          </Dropdown.Item>
          <Dropdown.Item name="Breakfast" onClick={addCategoryHandler}>
            Breakfast
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item name="Hot Drink" onClick={addCategoryHandler}>
            Hot Drink
          </Dropdown.Item>
          <Dropdown.Item name="Cold Drink" onClick={addCategoryHandler}>
            Cold Drink
          </Dropdown.Item>
        </DropdownButton>
        <Form.Control
          aria-label="Add or remove food categories"
          ref={categoryInputRef}
          disabled
        />
      </InputGroup>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Meal Price</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="meal-item-price">
            <MdOutlinePriceChange size={25} />
          </InputGroup.Text>
          <Form.Control
            type="number"
            placeholder="Meal Price"
            aria-label="Price"
            aria-describedby="Enter the Price of the meal."
            ref={priceInputRef}
          />
        </InputGroup>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="outline-primary" size="lg" onClick={submitHandler}>
          {props.editingItem !== null ? "Edit item" : "Add item"}
        </Button>
      </div>
    </Form>
  );
};

export default MealItemForm;
