import React from "react";
import "./Footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="6" className="mb-4">
              <div>
                <h1 className="text-white">FCI FURNITURE</h1>
                <p>Since 1998</p>
              </div>
            <p className="footer__text mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              temporibus quia est doloribus velit quibusdam at alias ad illum
              esse!
            </p>
          </Col>
          <Col lg="3" md="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Top Categories</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0 text-white">
                  <Link to="">Chairs</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-white">
                  <Link to="">Sofas</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-white">
                  <Link to="">Chaise</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-white">
                  <Link to="">Outdoor</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Useful Links</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0 text-white">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-white">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-white">
                  <Link to="/login">Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 text-white">
                  <Link to="">Privacy POlicy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md="4" >
          <div className="footer__quick-links">
          <h4 className="quick__links-title">Contact</h4>
              <ListGroup className="mb-3 footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="bi bi-geo-alt text-white"></i>
                  </span>
                  <p>89, Kiambu, Kenya</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="bi bi-telephone text-white"></i>
                  </span>
                  <p>+254725000540</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="bi bi-envelope text-white"></i>
                  </span>
                  <p>fcifurniture@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
          </div>
              
          </Col>
          <Col lg="12">
            <p className="footer__copyright text-center">
              Copyright {year} developed by Janet Ngei. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
