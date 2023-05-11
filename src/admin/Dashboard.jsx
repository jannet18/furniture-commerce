import React from "react";
import AddProducts from "./AddProducts";
import { Container, Row, Col } from "reactstrap";
import "../pages/sytles/Dashboard.css";
import useGetData from "../firebase/useGetData";

const Dashboard = () => {
  const { data: products } = useGetData("products");
  const { data: users } = useGetData("users");
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col className="lg-3">
              <div className="revenue__box">
                <h5>Total Sales</h5>
                <span>$</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="order__box">
                <h5>Orders</h5>
                <span>{products.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className="product__box">
                <h5>Total Products</h5>
                <span>{products.length}</span>
              </div>
            </Col>
            <Col g="3">
              <div className="user__box">
                <h5>Total Users</h5>
                <span>{users.length}</span>
              </div>
            </Col>
            <Col lg="12">
              <div className="mb-5">{<AddProducts />}</div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
