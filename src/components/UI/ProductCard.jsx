import React from "react";
// import productImg from "../../assets/images/couch.jpg";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../../pages/sytles/productCard.css";
import { Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
   const {id} = useParams();

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id: product.id,
      productName: product.productName,
      price: product.price,
      imgUrl: product.imgUrl
    }))

    toast.success('Item added successfully')

    // alert('Item added')
  }

  return (
    <Col lg="3" md="3" className="mb-2" >
      <div className="product__item ">
        <div className="product__img">
          <motion.img whileHover={{ scale: 0.9 }} src={product?.imgUrl} alt="/" width={500} />
        </div>
        <div className="p-2 product__info">
        <h3 className="product__name"><Link to={`/shop/${product?.id}`}>{product?.productName}</Link></h3>
        <span>{product?.category}</span>

        </div>
        
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${product?.price}</span>
          <motion.span 
          whileTap={{ scale: 1.2 }} 
          // onClick={addToCart}
          >
            <Link onClick={addToCart} to={`/shop/${product?.id}`}><motion.i whileHover={{ scale: 0.8 }} className="bi bi-plus"></motion.i></Link>
            
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
