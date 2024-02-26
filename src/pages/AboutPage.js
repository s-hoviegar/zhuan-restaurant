import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormattedMessage } from "react-intl";

import Map from "../components/Map/Map";

import classes from "./About.module.css";

const images = require.context("../assets/Carousel", true);

const CAROUSEL = [
  {
    id: 1,
    label: "label1",
    text: "Text1",
  },
  {
    id: 2,
    label: "label2",
    text: "Text2",
  },
  {
    id: 3,
    label: "label3",
    text: "Text3",
  },
  {
    id: 4,
    label: "label4",
    text: "Text4",
  },
  {
    id: 5,
    label: "label5",
    text: "Text5",
  },
  {
    id: 6,
    label: "label6",
    text: "Text6",
  },
  {
    id: 7,
    label: "label7",
    text: "Text7",
  },
];

const AboutPage = () => {
  return (
    <>
      <div className={classes.carousel}>
        <Carousel>
          {CAROUSEL.map((item) => {
            return (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block w-100"
                  src={images(`./${item.id}.jpg`).default}
                  alt={item.label}
                />
                <Carousel.Caption>
                  <h3>{""}</h3>
                  <p>{""}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>

      <Container className={classes.about}>
        <Row xs={1} md={2} className="g-4">
          <Col md={8}>
            <br />
            <h3>
              <FormattedMessage id="about.map" defaultMessage="Map" />
            </h3>
            <Map />
            <br />
          </Col>
          <Col md={4}>
            <br />
            <h3>
              <FormattedMessage id="about.address" defaultMessage="Address" />
            </h3>
            <p>
              <a
                href="https://goo.gl/maps/65MvyNguwrWpmq896"
                target="_blank"
                rel="noreferrer"
              >
                <FormattedMessage
                  id="about.addressText"
                  defaultMessage="Iran, Tehran, Azadegan South Hwy, Firouz Bahram Rd."
                />
              </a>
            </p>
            <h3>
              <FormattedMessage
                id="about.contactUs"
                defaultMessage="Contact Us"
              />
            </h3>
            <p>
              <a href="tel:+989388768674" target="_blank" rel="noreferrer">
                <FormattedMessage
                  id="about.phone"
                  defaultMessage="Phone: +989388768674"
                />
              </a>
            </p>
            <p>
              <a
                href="https://www.instagram.com/zhuan_caferestaurant/"
                target="_blank"
                rel="noreferrer"
              >
                <FormattedMessage
                  id="about.instagram"
                  defaultMessage="Instagram: @zhuan_caferestaurant"
                />
              </a>
            </p>
            <p>
              <a
                href="mailto:tirazhe.hoseini+zhuan@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <FormattedMessage
                  id="about.email"
                  defaultMessage="Email: Tirazhe.Hoseini+Zhuan@gmail.com"
                />
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutPage;
