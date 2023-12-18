import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
// import products from ".././assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import MainSection from "../components/UI/MainSection";
import ".././pages/sytles/ProductDetails.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../firebase/useGetData";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: productsData, loading } = useGetData("products");

  // const product = productsData?.find((item) => item.id === id);

  const docRef = doc(db, "products", id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("no product");
      }
    };
    getProduct();
  }, [product, docRef]);

  const {
    imgUrl,
    productName,
    shortDesc,
    description,
    price,
    category,
    avgRating,
    reviews,
  } = product || {};

  // console.log(imgUrl)

  const relatedProducts = productsData?.filter(
    (product) => product?.category === category
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObject = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    console.log(reviewObject);
    toast.success("Review submitted");
  };

  const addToCart = () => {
    dispatch(
      cartActions?.addItem({
        id,
        productName,
        price,
        imgUrl,
      })
    );
    toast.success("Item added successfully");
    navigate("/shop")
  };
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [product]);

  return (
    <Helmet title={productName}>
      <MainSection title={productName} />

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" className="pt-0" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2 key={id}>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-4 mb-3">
                  <span>
                    <i className="bi bi-star-fill"></i>
                  </span>
                  <span>
                    <i className="bi bi-star-fill"></i>
                  </span>

                  <span>
                    <i className="bi bi-star-fill"></i>
                  </span>
                  <span>
                    <i className="bi bi-star-fill"></i>
                  </span>

                  <span>
                    <i className="bi bi-star-half"></i>
                  </span>
                </div>
                <p><span>{avgRating}</span> rating</p>
              </div>
              <div className="d-flex align-items-center gap-5">
                <span className="product__price">${price}</span>
                <span>Category: {category}</span>
              </div>

              <p className="mt-3">{shortDesc}</p>
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn"
                onClick={addToCart}
              >
                Add to Cart
              </motion.button>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h5
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h5>
                <h5
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews
                </h5>
                {/* no span, include in the h5 */}
                <span>({reviews?.length})</span> 
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {product?.reviews?.map((review, id) => {
                        return (
                          <li key={id} className="mb-4">
                            <h6>Jane Doe</h6>
                            <span>{review?.rating} (rating)</span>
                            <p>{review?.text}</p>
                          </li>
                        );
                      })}
                    </ul>
                    {/* <ul>
        
                      {product.reviews.map(review, id => { return (
                        <li key={id} className="mb-4">
                          <h6>Jane Doe</h6>
                          <span>{review.rating} rating</span>
                          <p>{review.text}</p>
                        </li>
                      )},
                        
                    </ul> */}
                    <div className="review__form">
                      <h4>Share your experience</h4>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <input
                            required
                            ref={reviewUser}
                            type="text"
                            placeholder="Enter name"
                          />
                        </div>
                        <div className="form__group product__rating d-flex align-items-center gap-4 mb-3">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="bi bi-star-half"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="bi bi-star-half"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="bi bi-star-half"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="bi bi-star-half"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="bi bi-star-half"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={6}
                            type="text"
                            placeholder="Review message..."
                            required
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          onClick={handleSubmit}
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                  {/* <p>{reviews}</p> */}
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            {loading ? (
              <h5>Loading...</h5>
            ) : (
              <ProductsList data={relatedProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
