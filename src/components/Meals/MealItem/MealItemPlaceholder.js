import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import classes from "./MealItemPlaceholder.module.css";

const MealItemPlaceholder = () => {
  return (
    <Card>
      <div className={classes.container}>
        <div className={classes.loading}></div>
      </div>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>

        <Placeholder animation="glow" size="sm">
          <Placeholder variant="secondary" xs={4} />
        </Placeholder>

        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder animation="wave" size="sm">
          <Placeholder.Button variant="success" xs={4} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default MealItemPlaceholder;
