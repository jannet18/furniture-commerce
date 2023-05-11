import React from 'react';
import '../pages/sytles/Favorite.css';
import Helmet from '../components/Helmet/Helmet';
import MainSection from '../components/UI/MainSection';
import { Container, Row, Col } from 'reactstrap';
import { favoriteActions } from '../redux/slices/FavoriteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

const Favorite = () => {
  const favoriteItems = useSelector((state) => state?.favorite?.favoriteItems);
  // const totalQuantity = useSelector((state) => state?.favorite?.totalQuantity);
  return (
    <Helmet title='Favorites'>
      <MainSection title="Favorite Items">
        <section>
        <Container>
          <Row>
            <Col lg="8">
              {
                favoriteItems?.length === 0 ? (
                  <h2 className='fs-4 text-center'>No item added to favourites</h2> ) : ( 
                  <table className='table bordered'>
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
                      {favoriteItems?.map((product,id) => (
                          <Tr product={product} key={id} />
                        ))
                      }
                    </tbody>
                  </table>
                  )}
              </Col>
              {/* <Col lg="4">
                  <div>
                  <h6 className="d-flex align-items-center justify-content-center">
                    Total Quantity
                  </h6>
                  <span className="fs-4 fw-bold">{totalQuantity}</span>
                </div>
              </Col> */}
          </Row>
          </Container>
          </section>
      </MainSection>
    </Helmet>
  )
}

const Tr = ({ product }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(favoriteActions?.deleteItem(product?.id))
  }
  return (
    <tr>
      <td>
        <img className="img__image"src={product?.imgUrl} alt="" />
      </td>
      <td>{product?.productName}</td>
      <td>{product?.price}</td>
      <td>{product?.quantity}</td>
      <td><motion.i
        whileTap={{ scale: 1.2 }}
        onClick={deleteProduct}
        className="bi bi-trash3-fill">
      </motion.i></td>
  </tr>
)
}
export default Favorite;