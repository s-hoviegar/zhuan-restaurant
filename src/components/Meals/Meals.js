import { useEffect, useState } from "react";
import { useContext } from "react";
import { ref, child, update, get, remove } from "firebase/database";
import { FormattedMessage } from "react-intl";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MdAddCircle } from "react-icons/md";

import AuthContext from "../../store/auth-context";
import firebaseDb from "../../utils/firebase-db";
import MealItem from "./MealItem/MealItem";
import MealItemForm from "./MealItem/MealItemForm";
import MealItemPlaceholder from "./MealItem/MealItemPlaceholder";
import MealCategories from "../Meals/MealCategories/MealCategories";

import classes from "./Meals.module.css";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [mealsChanged, setMealsChanged] = useState(false);
  const [mealCategory, setMealCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [showItemModal, setShowItemModal] = useState(false);
  const [showRemoveItemModal, setShowRemoveItemModal] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const authCtx = useContext(AuthContext);
  const isVerified = authCtx.isVerified;
  const isAdmin = authCtx.isAdmin;

  let loadingMeals = [];

  for (let i = 0; i < 10; i++) {
    loadingMeals.push(
      <Col key={i}>
        <MealItemPlaceholder />
      </Col>
    );
  }

  useEffect(() => {
    setIsLoading(true);

    const dbRef = ref(firebaseDb);
    get(child(dbRef, `meals/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          const responseData = snapshot.val();

          const loadedMeals = [];
          for (const key in responseData) {
            loadedMeals.push({
              id: key,
              name: responseData[key].name,
              nameFa: responseData[key].nameFa,
              description: responseData[key].description,
              descriptionFa: responseData[key].descriptionFa,
              price: responseData[key].price,
              img: responseData[key].img,
              category: responseData[key].category,
            });
          }
          setMeals(loadedMeals);
          setIsLoading(false);
        } else {
          console.log("No data available");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        // console.error(error);
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, []);

  const mealsClasses = `${classes.meals} ${
    mealsChanged ? classes.mealsAppear : ""
  }`;

  useEffect(() => {
    setMealsChanged(true);

    const timer = setTimeout(() => {
      setMealsChanged(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [mealCategory]);

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const showAddItemModal = () => {
    setShowItemModal(true);
    // console.log("set to show modal");
  };

  const showEditItemModal = (eItem) => {
    setEditingItem(eItem);
    setShowItemModal(true);
    // console.log("set to show modal");
  };

  const showRemoveModal = (id) => {
    setShowRemoveItemModal(id);
  };

  const onCloseModal = () => {
    setShowItemModal(false);
    setTimeout(() => {
      setEditingItem(null);
    }, 500);
    // console.log("set to hide modal");
  };

  const onCloseRemoveItemModal = () => {
    setShowRemoveItemModal(null);
  };

  const onAddItemHandler = (newItem) => {
    if (!authCtx.isAdmin) {
      return <p>You are not an admin to add an item.</p>;
    } else {
      const updates = {};
      updates[`meals/${newItem.id}`] = newItem;
      update(ref(firebaseDb), updates);

      setMeals((pervMeals) => {
        return [...pervMeals, newItem];
      });

      setShowItemModal(false);
      setEditingItem(null);
    }
  };

  const onEditItemHandler = (item) => {
    if (!authCtx.isAdmin) {
      return <p>You are not an admin to edit an item.</p>;
    } else {
      const updates = {};
      updates[`meals/${item.id}`] = item;
      update(ref(firebaseDb), updates);

      setMeals((pervMeals) => {
        const updatedMeals = pervMeals.filter((pervItem) => {
          return pervItem.id !== item.id;
        });
        return [...updatedMeals, item];
      });
    }

    setShowItemModal(false);
    setTimeout(() => {
      setEditingItem(null);
    }, 500);
  };

  const onDeleteItemHandler = () => {
    if (!authCtx.isAdmin) {
      return <p>You are not an admin to delete an item.</p>;
    } else {
      // console.log(`/meals/${showRemoveItemModal}`);
      remove(child(ref(firebaseDb), `meals/${showRemoveItemModal}`));

      const updatedMeals = meals.filter((item) => {
        return item.id !== showRemoveItemModal;
      });
      setMeals([...updatedMeals]);
      setShowRemoveItemModal(null);
    }
  };

  const onChangeMealCategoryHandler = (id) => {
    setMealCategory(id);
  };

  const filteredMeals = meals.filter((meal) => {
    if (mealCategory === "all") return true;
    else return meal.category === mealCategory;
  });

  const mealsList = filteredMeals.map((meal) => (
    <Col key={meal.id}>
      <MealItem
        id={meal.id}
        name={meal.name}
        nameFa={meal.nameFa}
        description={meal.description}
        descriptionFa={meal.descriptionFa}
        price={meal.price}
        img={meal.img}
        category={meal.category}
        editItem={showEditItemModal}
        deleteItem={showRemoveModal}
      />
    </Col>
  ));

  return (
    <>
      <MealCategories changeCategory={onChangeMealCategoryHandler} />
      <section className={mealsClasses}>
        <Modal show={showItemModal} onHide={onCloseModal} centered>
          <Modal.Header className={classes.header} closeButton>
            <Modal.Title>
              {editingItem !== null ? (
                <FormattedMessage id="meals.edit" defaultMessage="Edit" />
              ) : (
                <FormattedMessage id="meals.add" defaultMessage="Add" />
              )}{" "}
              <FormattedMessage id="meals.item" defaultMessage="item" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MealItemForm
              addItem={onAddItemHandler}
              editItem={onEditItemHandler}
              onHide={onCloseModal}
              editingItem={editingItem}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={showRemoveItemModal}
          onHide={onCloseRemoveItemModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage
                id="meals.remove"
                defaultMessage="Remove item"
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
              <p>
                <FormattedMessage
                  id="meals.removePrompt"
                  defaultMessage="Are you sure you want to delete this item?"
                />
              </p>
            </center>
            <Container>
              <Row>
                <Col>
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-danger"
                      size="lg"
                      onClick={onDeleteItemHandler}
                    >
                      <FormattedMessage
                        id="meals.delete"
                        defaultMessage="Delete item"
                      />
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="d-grid gap-2">
                    <Button
                      variant="dark"
                      size="lg"
                      onClick={onCloseRemoveItemModal}
                    >
                      <FormattedMessage
                        id="meals.cancelDelete"
                        defaultMessage="Cancel"
                      />
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>

        <Row xs={1} md={3} className="g-4">
          {isAdmin && isVerified && !isLoading && (
            <Col>
              <div onClick={showAddItemModal} style={{ cursor: "pointer" }}>
                <Card>
                  <Card.Body>
                    <MdAddCircle
                      size={300}
                      style={{
                        width: "100%",
                      }}
                    />
                    <Card.Title>
                      <FormattedMessage id="meals.add" defaultMessage="Add" />
                    </Card.Title>
                    <Card.Text>
                      <FormattedMessage
                        id="meals.addText"
                        defaultMessage="Add a new item!"
                      />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          )}
          {!isLoading && mealsList}
          {isLoading && loadingMeals}
        </Row>
      </section>
    </>
  );
};

export default Meals;
