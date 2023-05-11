import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
// import heroImg from ".././assets/images/hero.jpg";
import heroImg from ".././assets/images/hero2.jpg";
import "./sytles/Home.css";
import timerImg from "../assets/images/timer2.jpg";
import Clock from "../components/UI/Clock";
// import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
import useGetData from "../firebase/useGetData";

const Home = () => {
 

  const { data: productsData, loading } = useGetData("products");
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [outdoorProducts, setOutdoorProducts] = useState([]);

  const year = new Date().getFullYear();

  

  useEffect(() => {
    const filteredTrendingProducts = productsData?.filter(
      (product) => product?.category === "chair"
    );
    const filteredBestSalesProducts = productsData?.filter(
      (product) => product?.category === "sofa"
    );

    const filteredMobileProducts = productsData?.filter(
      (product) => product?.category === "chaise"
    );
    const filteredOutdoorProducts = productsData?.filter(
      (product) => product?.category === "outdoor"
    );

    setBestSalesProducts(filteredBestSalesProducts);
    setTrendingProducts(filteredTrendingProducts);
    setMobileProducts(filteredMobileProducts);
    setOutdoorProducts(filteredOutdoorProducts);

  },[]);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Popular Product in {year}</p>
                <h2>Create more Minimalistic & Modern Interior</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  quasi optio quibusdam atque veritatis, beatae ad tempore
                  tenetur dolor quisquam!
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="hero__img">
                <img src={heroImg} alt="heroImg" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {loading ? (
              <h5>Loading...</h5>
            ) : (
              <ProductsList data={trendingProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            {loading ? (
              <h5>Loading...</h5>
            ) : (
              <ProductsList data={bestSalesProducts} />
            )}
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-6 mb-3">Quality Guarenteed</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end timer__img">
              <img src={timerImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            {loading ? (
              <h5>Loading...</h5>
            ) : (
              <ProductsList data={mobileProducts} />
            )}
            {loading ? (
              <h5>Loading...</h5>
            ) : (
              <ProductsList data={outdoorProducts} />
            )}
          </Row>
        </Container>
      </section>
      <section className="section__title">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Popular Products</h2>
            </Col>
            {
            loading ? <h5>Loading...</h5> :  <ProductsList data={bestSalesProducts} />
           }
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
