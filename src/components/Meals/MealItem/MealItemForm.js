import { useRef, useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
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
  }, [props.editingItem]);

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
      <Form.Group className="mb-3" controlId="itemForm.ControlInput1">
        <Form.Label>
          <FormattedMessage
            id="mealItemForm.mealName"
            defaultMessage="Meal name"
          />
        </Form.Label>
        <FormattedMessage
          id="mealItemForm.mealNamePlaceHolder"
          defaultMessage="Enter a name for the new meal item."
        >
          {(msg) => (
            <Form.Control
              type="text"
              placeholder={msg}
              ref={nameInputRef}
              autoFocus
            />
          )}
        </FormattedMessage>
      </Form.Group>
      <Form.Group className="mb-3" controlId="itemForm.ControlTextarea1">
        <Form.Label>
          <FormattedMessage
            id="mealItemForm.mealDescription"
            defaultMessage="Description"
          />
        </Form.Label>
        <Form.Control as="textarea" rows={3} ref={descriptionInputRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="itemForm.ControlInput2">
        <Form.Label>
          <FormattedMessage
            id="mealItemForm.mealImg"
            defaultMessage="Meal image"
          />
        </Form.Label>

        <InputGroup className="mb-3">
          <InputGroup.Text id="meal-item-image-link">
            <MdAddLink size={25} />
          </InputGroup.Text>
          <FormattedMessage
            id="mealItemForm.mealImgPlaceHolder"
            defaultMessage="Enter the URL of the image."
          >
            {(msg) => (
              <Form.Control
                placeholder={msg}
                aria-label={msg}
                aria-describedby="meal-item-image-link"
                ref={imgInputRef}
              />
            )}
          </FormattedMessage>
        </InputGroup>
      </Form.Group>

      <InputGroup className="mb-3">
        <FormattedMessage
          id="mealItemForm.mealCategory"
          defaultMessage="Category"
        >
          {(msg) => (
            <DropdownButton
              variant="outline-secondary"
              title={msg}
              id="input-group-dropdown-1"
            >
              <FormattedMessage
                id="mealItemForm.mealCategoryMainCourse"
                defaultMessage="Main Course"
              >
                {(msg) => (
                  <Dropdown.Item
                    id="mainCourse"
                    name={msg}
                    onClick={addCategoryHandler}
                  >
                    {msg}
                  </Dropdown.Item>
                )}
              </FormattedMessage>
              <FormattedMessage
                id="mealItemForm.mealCategoryAppetizer"
                defaultMessage="Appetizer"
              >
                {(msg) => (
                  <Dropdown.Item
                    id="appetizer"
                    name={msg}
                    onClick={addCategoryHandler}
                  >
                    {msg}
                  </Dropdown.Item>
                )}
              </FormattedMessage>
              <FormattedMessage
                id="mealItemForm.mealCategoryBreakfast"
                defaultMessage="Breakfast"
              >
                {(msg) => (
                  <Dropdown.Item
                    id="breakfast"
                    name={msg}
                    onClick={addCategoryHandler}
                  >
                    {msg}
                  </Dropdown.Item>
                )}
              </FormattedMessage>
              <Dropdown.Divider />
              <FormattedMessage
                id="mealItemForm.mealCategoryHotDrinks"
                defaultMessage="Hot Drinks"
              >
                {(msg) => (
                  <Dropdown.Item
                    id="hotDrinks"
                    name={msg}
                    onClick={addCategoryHandler}
                  >
                    {msg}
                  </Dropdown.Item>
                )}
              </FormattedMessage>
              <FormattedMessage
                id="mealItemForm.mealCategoryColdDrinks"
                defaultMessage="Cold Drinks"
              >
                {(msg) => (
                  <Dropdown.Item
                    id="coldDrinks"
                    name={msg}
                    onClick={addCategoryHandler}
                  >
                    {msg}
                  </Dropdown.Item>
                )}
              </FormattedMessage>
            </DropdownButton>
          )}
        </FormattedMessage>
        <FormattedMessage
          id="mealItemForm.mealCategoryPlaceholder"
          defaultMessage="Add or remove food categories"
        >
          {(msg) => (
            <Form.Control aria-label={msg} ref={categoryInputRef} disabled />
          )}
        </FormattedMessage>
      </InputGroup>

      <Form.Group className="mb-3" controlId="itemForm.price">
        <Form.Label>
          <FormattedMessage
            id="mealItemForm.mealPrice"
            defaultMessage="Meal price"
          />
        </Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="meal-item-price">
            <MdOutlinePriceChange size={25} />
          </InputGroup.Text>
          <FormattedMessage
            id="mealItemForm.mealPricePlaceholder"
            defaultMessage="Enter meal price."
          >
            {(msg) => (
              <Form.Control
                type="number"
                placeholder={msg}
                aria-label={msg}
                aria-describedby={msg}
                ref={priceInputRef}
              />
            )}
          </FormattedMessage>
        </InputGroup>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="outline-primary" size="lg" onClick={submitHandler}>
          {props.editingItem !== null ? (
            <FormattedMessage
              id="mealItemForm.editBtn"
              defaultMessage="Edit item"
            />
          ) : (
            <FormattedMessage
              id="mealItemForm.addBtn"
              defaultMessage="Add item"
            />
          )}
        </Button>
      </div>
    </Form>
  );
};

export default MealItemForm;
