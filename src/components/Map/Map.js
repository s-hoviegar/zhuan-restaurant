import map from "../../assets/map.jpg";
import classes from "./Map.module.css";

const Map = () => {
  return (
    <a
      href="https://goo.gl/maps/65MvyNguwrWpmq896"
      target="_blank"
      rel="noreferrer"
    >
      <img className={classes.img} alt="Zhuan Restaurant Map" src={map} />
    </a>
  );
};

export default Map;
