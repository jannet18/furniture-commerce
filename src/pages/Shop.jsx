import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import MainSection from "../components/UI/MainSection";
import "../pages/sytles/Shop.css";
import { Container, Row, Col } from "reactstrap";
// import products from ".././assets/data/products";
import ProductsLists from "../components/UI/ProductsList";
import useGetData from "../firebase/useGetData";

const Shop = () => {
  // const [productData, setProductData] = useState({product});
  const [product, setProduct] = useState();

  const { data: productsData } = useGetData("products")

  const handleFilter = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "chair") {
      const filterProducts = productsData?.filter(
        (product) => product?.category === "chair"
      );

      // setProductData(filterProducts);
      setProduct(filterProducts);
    }

    if (filterValue === "sofa") {
      const filterProducts = productsData?.filter(
        (product) => product?.category === "sofa"
      );

      // setProductData(filterProducts);
      setProduct(filterProducts);
    }

    if (filterValue === "chaise") {
      const filterProducts = productsData?.filter(
        (product) => product?.category === "chaise"
      );

      // setProductData(filterProducts);
      setProduct(filterProducts);
    }

    if (filterValue === "outdoor") {
      const filterProducts = productsData?.filter(
        (product) => product?.category === "outdoor"
      );
      // setProductData(filterProducts);
      setProduct(filterProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = productsData?.filter((product) =>
      product?.productName
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // setProductData(searchedProducts);
    setProduct(searchedProducts);
  };
  return (
    <>
      <Helmet title="Products">
        <MainSection title="Products" />

        <section>
          <Container>
            <Row>
              <Col lg="3" md="3">
                <div className="filter__widget">
                  <select onChange={handleFilter}>
                    <option>Filter By Category</option>
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="chaise">Chaise</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>
              </Col>
              <Col lg="3" md="3">
                <div className="filter__widget">
                  <select>
                    <option>Sort By</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </Col>
              <Col lg="6" md="6" className="text-end">
                <div className="search__box">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                  />
                  <i className="bi bi-search"></i>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pt-0">
          <Container>
            <Row>
              {productsData?.length === 0 ? (
                <h1 className="text-center fs-4">Not available!</h1>
              ) : (
                // <ProductsLists data={productData} />
                  <ProductsLists data={product} />
              )}
              <Col></Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Shop;
