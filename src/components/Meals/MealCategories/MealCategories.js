import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useIntl } from "react-intl";

import classes from "./MealCategories.module.css";

const images = require.context("../../../assets", true);

const MEAL_CATEGORIES = [
  {
    id: "All",
    img: "All",
  },
  {
    id: "Main Course",
    img: "Main_Course",
  },
  {
    id: "Appetizer",
    img: "Appetizer",
  },
  {
    id: "Breakfast",
    img: "Breakfast",
  },
  {
    id: "Cold Drinks",
    img: "Cold_Drinks",
  },
  {
    id: "Hot Drinks",
    img: "Hot_Drinks",
  },
];

const MealCategories = (props) => {
  const intl = useIntl();
  // console.log(intl.locale);

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
            src={images(`./${item.img}_${intl.locale}.jpg`).default}
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
