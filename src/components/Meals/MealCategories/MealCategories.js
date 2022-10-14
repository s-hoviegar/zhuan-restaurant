import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import classes from "./MealCategories.module.css";

const images = require.context("../../../assets", true);

const MEAL_CATEGORIES = [
  {
    id: "All",
    img_en: "All_en.jpg",
    img_fa: "All_fa.jpg",
  },
  {
    id: "Main Course",
    img_en: "Main_Course_en.jpg",
    img_fa: "Main_Course_fa.jpg",
  },
  {
    id: "Appetizer",
    img_en: "Appetizer_en.jpg",
    img_fa: "Appetizer_fa.jpg",
  },
  {
    id: "Breakfast",
    img_en: "Breakfast_en.jpg",
    img_fa: "Breakfast_fa.jpg",
  },
  {
    id: "Cold Drink",
    img_en: "Cold_Drinks_en.jpg",
    img_fa: "Cold_Drinks_fa.jpg",
  },
  {
    id: "Hot Drink",
    img_en: "Hot_Drinks_en.jpg",
    img_fa: "Hot_Drinks_fa.jpg",
  },
];

const MealCategories = (props) => {
  // const [mealCategories, setMealCategories] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 200;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 200;
  };

  const onChangeCategoryHandler = (event) => {
    // console.log(event.target.alt);
    props.changeCategory(event.target.alt);
  };

  return (
    <div className={classes.container}>
      <MdChevronLeft className={classes.icons} onClick={slideLeft} size={40} />
      <div id="slider" className={classes.item}>
        {MEAL_CATEGORIES.map((item) => (
          <img
            key={item.id}
            className={classes.pic}
            src={images(`./${item.img_en}`).default}
            alt={item.id}
            onClick={onChangeCategoryHandler}
          />
        ))}
      </div>
      <MdChevronRight
        className={classes.icons}
        onClick={slideRight}
        size={40}
      />
    </div>
  );
};

export default MealCategories;
