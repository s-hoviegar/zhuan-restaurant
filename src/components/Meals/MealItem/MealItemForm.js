import { useRef, useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import { MdAddLink } from "react-icons/md";
import { MdOutlinePriceChange } from "react-icons/md";

const MealItemForm = (props) => {
  const [priceIsValid, setPriceIsValid] = useState(true);
  const [categoryId, setCategoryId] = useState("misc");

  const nameInputRef = useRef();
  const faNameInputRef = useRef();
  const descriptionInputRef = useRef();
  const faDescriptionInputRef = useRef();
  const imgInputRef = useRef();
  const priceInputRef = useRef();
  const categoryInputRef = useRef();

  const intl = useIntl();

  useEffect(() => {
    if (props.editingItem !== null) {
      let category;
      switch (props.editingItem.category) {
        case "mainCourse":
          category = intl.locale === "en" ? "Main Course" : "غذای اصلی";
          break;
        case "appetizer":
          category = intl.locale === "en" ? "Appetizer" : "پیش غذا";
          break;
        case "breakfast":
          category = intl.locale === "en" ? "Breakfast" : "صبحانه";
          break;
        case "hotDrinks":
          category = intl.locale === "en" ? "Hot Drinks" : "نوشیدنی گرم";
          break;
        case "coldDrinks":
          category = intl.locale === "en" ? "Cold Drinks" : "نوشیدنی سرد";
          break;
        default:
          category = intl.locale === "en" ? "Misc" : "متفرقه";
      }
      setCategoryId(props.editingItem.category);
      nameInputRef.current.value = props.editingItem.name;
      faNameInputRef.current.value = props.editingItem.nameFa;
      descriptionInputRef.current.value = props.editingItem.description;
      faDescriptionInputRef.current.value = props.editingItem.descriptionFa;
      categoryInputRef.current.value = category;
      imgInputRef.current.value = props.editingItem.img;
      priceInputRef.current.value = props.editingItem.price;
    }
  }, [props.editingItem, intl.locale]);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPrice = priceInputRef.current.value;
    const enteredPriceNumber = +enteredPrice;
    const enteredName = nameInputRef.current.value;
    const enteredNameFa = faNameInputRef.current.value;
    const enteredDesc = descriptionInputRef.current.value;
    const enteredDescFa = faDescriptionInputRef.current.value;
    const enteredImg = imgInputRef.current.value;
    const enteredCategory = categoryId;

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
        nameFa: enteredNameFa,
        description: enteredDesc,
        descriptionFa: enteredDescFa,
        category: enteredCategory,
        img: enteredImg,
        price: enteredPriceNumber,
      });
    } else {
      const rand = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
      generatedId = enteredName + rand;
      props.addItem({
        id: generatedId,
        name: enteredName,
        nameFa: enteredNameFa,
        description: enteredDesc,
        descriptionFa: enteredDescFa,
        category: enteredCategory,
        img: enteredImg,
        price: enteredPriceNumber,
      });
    }
  };

  const addCategoryHandler = (event) => {
    // console.log(categoryInputRef.current);
    categoryInputRef.current.value = event.target.name;
    setCategoryId(event.target.id);
  };

  const categoryInput = (
    <FormattedMessage
      id="mealItemForm.mealCategoryPlaceholder"
      defaultMessage="Add or remove food categories"
    >
      {(msg) => (
        <Form.Control aria-label={msg} ref={categoryInputRef} disabled />
      )}
    </FormattedMessage>
  );
  const categoryText = (
    <FormattedMessage id="mealItemForm.mealCategory" defaultMessage="Category">
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
          <Dropdown.Divider />
          <FormattedMessage
            id="mealItemForm.mealCategoryNone"
            defaultMessage="Misc"
          >
            {(msg) => (
              <Dropdown.Item id="misc" name={msg} onClick={addCategoryHandler}>
                {msg}
              </Dropdown.Item>
            )}
          </FormattedMessage>
        </DropdownButton>
      )}
    </FormattedMessage>
  );

  const imageInput = (
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
  );
  const imageText = (
    <InputGroup.Text id="meal-item-image-link">
      <MdAddLink size={25} />
    </InputGroup.Text>
  );

  const priceText = (
    <InputGroup.Text id="meal-item-price">
      <MdOutlinePriceChange size={25} />
    </InputGroup.Text>
  );
  const priceInput = (
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
          style={
            !priceIsValid
              ? { backgroundColor: "#e63946", color: "white" }
              : null
          }
        />
      )}
    </FormattedMessage>
  );

  const englishTab = (
    <Tab
      eventKey="en"
      title={intl.locale === "en" ? "English menu" : "منوی انگلیسی"}
    >
      <Form.Group className="mb-3" controlId="itemForm.mealName">
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
              style={{ direction: "ltr" }}
              autoFocus
            />
          )}
        </FormattedMessage>
      </Form.Group>
      <Form.Group className="mb-3" controlId="itemForm.mealDescription">
        <Form.Label>
          <FormattedMessage
            id="mealItemForm.mealDescription"
            defaultMessage="Description"
          />
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          ref={descriptionInputRef}
          style={{ direction: "ltr" }}
        />
      </Form.Group>
    </Tab>
  );

  const persianTab = (
    <Tab
      eventKey="fa"
      title={intl.locale === "en" ? "Persian menu" : "منوی فارسی"}
    >
      <Form.Group className="mb-3" controlId="itemForm.mealNameFa">
        <Form.Label>
          <FormattedMessage
            id="mealItemForm.mealNameFa"
            defaultMessage="Meal name (Persian)"
          />
        </Form.Label>
        <FormattedMessage
          id="mealItemForm.mealNamePlaceHolderFa"
          defaultMessage="Enter a name for the new meal item."
        >
          {(msg) => (
            <Form.Control
              type="text"
              placeholder={msg}
              ref={faNameInputRef}
              style={{ direction: "rtl" }}
              autoFocus
            />
          )}
        </FormattedMessage>
      </Form.Group>
      <Form.Group className="mb-3" controlId="itemForm.mealDescriptionFa">
        <Form.Label>
          <FormattedMessage
            id="mealItemForm.mealDescriptionFa"
            defaultMessage="Description"
          />
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          ref={faDescriptionInputRef}
          style={{ direction: "rtl" }}
        />
      </Form.Group>
    </Tab>
  );

  return (
    <Form>
      <Tabs
        defaultActiveKey={intl.locale}
        id="justify-tab-meal-item-form"
        className="mb-3"
        justify
      >
        {intl.locale === "en" ? englishTab : persianTab}
        {intl.locale === "en" ? persianTab : englishTab}
      </Tabs>

      <InputGroup className="mb-3" style={{ direction: "ltr" }}>
        {intl.locale === "en" ? categoryText : categoryInput}
        {intl.locale === "en" ? categoryInput : categoryText}
      </InputGroup>

      <Form.Group className="mb-3" controlId="itemForm.mealImg">
        <Form.Label>
          <FormattedMessage
            id="mealItemForm.mealImg"
            defaultMessage="Meal image"
          />
        </Form.Label>
        <InputGroup className="mb-3" style={{ direction: "ltr" }}>
          {intl.locale === "en" ? imageText : imageInput}
          {intl.locale === "en" ? imageInput : imageText}
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="itemForm.mealPrice">
        <Form.Label>
          <FormattedMessage
            id="mealItemForm.mealPrice"
            defaultMessage="Meal price"
          />
        </Form.Label>
        <InputGroup className="mb-3" style={{ direction: "ltr" }}>
          {intl.locale === "en" ? priceText : priceInput}
          {intl.locale === "en" ? priceInput : priceText}
        </InputGroup>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="outline-dark" size="lg" onClick={submitHandler}>
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
