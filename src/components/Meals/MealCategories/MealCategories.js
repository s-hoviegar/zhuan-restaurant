import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useIntl } from "react-intl";

import classes from "./MealCategories.module.css";

const images = require.context("../../../assets", true);

const MEAL_CATEGORIES = [
  {
    id: "all",
    img: "All",
  },
  {
    id: "mainCourse",
    img: "Main_Course",
  },
  {
    id: "appetizer",
    img: "Appetizer",
  },
  {
    id: "breakfast",
    img: "Breakfast",
  },
  {
    id: "hotDrinks",
    img: "Hot_Drinks",
  },
  {
    id: "coldDrinks",
    img: "Cold_Drinks",
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

  const leftBtn = (
    <MdChevronLeft className={classes.icons} onClick={slideLeft} size={40} />
  );
  const rightBtn = (
    <MdChevronRight className={classes.icons} onClick={slideRight} size={40} />
  );

  return (
    <div className={classes.container}>
      {intl.locale === "en" ? leftBtn : rightBtn}

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

      {intl.locale === "fa" ? leftBtn : rightBtn}
    </div>
  );
};

export default MealCategories;
