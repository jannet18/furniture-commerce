import React from "react";
import ".././pages/sytles/Cart.css";
import Helmet from "../components/Helmet/Helmet";
import MainSection from "../components/UI/MainSection";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Cart">
      <MainSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((product,id) => (
                      <Tr product={product} key={id} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-center">
                  Subtotal
                </h6>
                <span className="fs-4 fw-bold">${totalAmount}</span>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping included in checkout
              </p>
              <div>
                <button className="buy__btn w-100 mt-3">
                  <Link to="/checkout">Checkout</Link>
                </button>
                <button className="buy__btn w-100">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ product }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(product?.id));
  };
  return (
    <tr>
      <td>
        <img className="img__image" src={product?.imgUrl} alt=""/>
      </td>
      <td>{product?.productName}</td>
      <td>{product?.price}</td>
      <td>{product?.quantity}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="bi bi-trash3-fill"
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
