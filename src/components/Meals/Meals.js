import { useEffect, useState } from "react";
import { useContext } from "react";
import { ref, child, update, get, remove } from "firebase/database";

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
  const [mealCategory, setMealCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [showItemModal, setShowItemModal] = useState(false);
  const [showRemoveItemModal, setShowRemoveItemModal] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const authCtx = useContext(AuthContext);
  const isVerified =
    authCtx.isVerified === "true" || authCtx.isVerified === true;
  const isAdmin = authCtx.isAdmin === "true" || authCtx.isAdmin === true;

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
              description: responseData[key].description,
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
    if (mealCategory === "All") return true;
    else return meal.category === mealCategory;
  });

  const mealsList = filteredMeals.map((meal) => (
    <Col key={meal.id}>
      <MealItem
        id={meal.id}
        name={meal.name}
        description={meal.description}
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
      <section className={classes.meals}>
        <Modal show={showItemModal} onHide={onCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingItem !== null ? "Edit" : "Add new"} meal item
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
            <Modal.Title>Remove item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
              <p>Are you sure you want to delete this item?</p>
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
                      Delete item
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
                      Cancel
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
                    <Card.Title>Add</Card.Title>
                    <Card.Text>Add a new item!</Card.Text>
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
