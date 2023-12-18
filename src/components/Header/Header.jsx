import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "./Header.css";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo1.jpg";
import { Container, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../firebase/useAuth";
import userIcon from "../../assets/images/user.svg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
   const {currentUser} = useAuth([]);
  const navigate = useNavigate();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  // const currentUser = useAuth();
  const profileActionRef = useRef(null);

  // const stickyHeader = () => {
  
  //   window.addEventListener("scroll", () => {
  //     if (
  //       document.body.scrollTop > 70 ||
  //       document.documentElement.scrollTop > 70
  //     ) {
  //       headerRef.current?.classList?.add("stick__header");
  //     } else {
  //       headerRef.current?.classList?.remove("sticky__header");
  //     }
  //   });
  // };

  // useEffect(() => {

  //   // stickyHeader();
  //   // return () => window.removeEventListener("scroll", stickyHeader);
  // },[]);

  const menuToggle = () => menuRef.current?.classList?.toggle("active__menu");
  const navigateToCart = () => {
    navigate("/cart");
  };
  const navigateToFavorites = () => {
    navigate("/favorite");
  };

  const toggleProfileActions = () =>
    profileActionRef.current?.classList?.toggle("show__profileActions");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />

              <div>
                <h1>FCI FURNITURE</h1>
                <p>Since 1998</p>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                <li className="nav__item">
                  <Link to="/home">Home</Link>
                </li>

                <li className="nav__item">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="nav__item">
                  <Link to="/cart">Cart</Link>
                </li>
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon" onClick={navigateToFavorites}>
                <span className="badge">{totalQuantity}</span>
                <i className="bi bi-heart"></i>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <span className="badge">{totalQuantity}</span>

                <i className="bi bi-cart3"></i>
              </span>
              <div className="profile">
                <motion.img
                  className="profile__img"
                  // onClick={navigateToProfile}
                  whileTap={{ scale: 1.2 }}
                  src={currentUser && currentUser ? currentUser?.photoURL : userIcon}
                  onClick={toggleProfileActions}
                  alt=""
                />

                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  // onClick={toggleProfileActions}
                >
                  {currentUser && currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>
             
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="bi bi-list"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
