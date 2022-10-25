import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <Row xs={1} md={2} className="g-4">
        <Col md={8}>
          <div className={classes.title}>
            <FormattedMessage id="footer.address" defaultMessage="Address" />
          </div>
          <div className={classes.text}>
            <a
              href="https://goo.gl/maps/65MvyNguwrWpmq896"
              target="_blank"
              rel="noreferrer"
            >
              <MdOutlineLocationOn size={25} />
              <FormattedMessage
                id="footer.addressText"
                defaultMessage="Iran, Tehran, Azadegan South Hwy, Firouz Bahram Rd."
              />
            </a>
          </div>
          <div className={classes.title}>
            <FormattedMessage
              id="footer.contactUs"
              defaultMessage="Contact Us"
            />
          </div>
          <div className={classes.text}>
            <a href="tel:+989388768674" target="_blank" rel="noreferrer">
              <RiPhoneFill size={25} />
            </a>{" "}
            <a
              href="https://www.instagram.com/zhuan_caferestaurant/"
              target="_blank"
              rel="noreferrer"
            >
              <RiInstagramLine size={25} />
            </a>{" "}
            <a
              href="mailto:tirazhe.hoseini+zhuan@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <MdOutlineEmail size={25} />
            </a>
          </div>
        </Col>
        <Col md={4}>
          <div className={classes.title}>
            <FormattedMessage id="footer.pages" defaultMessage="Pages" />
          </div>
          <div className={classes.text}>
            <Link to="/">
              <FormattedMessage
                id="footer.menuLink"
                defaultMessage="Restaurant Menu"
              />
            </Link>{" "}
            <br />
            <Link to="/profile">
              <FormattedMessage
                id="footer.profileLink"
                defaultMessage="User Profile"
              />
            </Link>
            <br />
            <Link to="/about">
              <FormattedMessage
                id="footer.aboutUsLink"
                defaultMessage="About Us"
              />
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
