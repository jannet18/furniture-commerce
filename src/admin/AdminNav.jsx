import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import useAuth from "../firebase/useAuth";
import "../pages/sytles/AdminNav.css";
import { NavLink } from "react-router-dom";
// import useGetData from "../firebase/useGetData";

const AdminNav = () => {
  const { currentUser } = useAuth();
  const [productData, setProductData] = useState();
  const { data: productsData } = useGetData("products");
  // const [search, setSearch] = useState();

  const handleSearched = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = productsData?.filter((item) =>
      item?.productName
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setProductData(searchedProducts);
  };

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>FCI Furniture</h2>
                <div className="search__box">
                  <input type="text" placeholder="" />
                  <span>
                    <i
                      className="bi bi-search"
                      data={productData}
                      onChange={handleSearched}
                    ></i>
                  </span>
                </div>
                <div className="admin__nav-top-right">
                  <span>
                    <i className="bi bi-bell"></i>
                  </span>
                  <span>
                    <i className="bi bi-gear"></i>
                  </span>
                  <img src={currentUser && currentUser.photoURL} alt="" />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                <li className="admin__menu-item">
                  <NavLink
                    to="/dashboard"
                    className={(navClass) =>
                      navClass.isActive ? "active__admin-menu " : ""
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="admin__menu-item">
                  <NavLink
                    to="/dashboard/allproducts"
                    className={(navClass) =>
                      navClass.isActive ? "active__admin-menu" : ""
                    }
                  >
                    All Products
                  </NavLink>
                </li>
                <li className="admin__menu-item">
                  <NavLink
                    to="/dashboard/orders"
                    className={(navClass) =>
                      navClass.isActive ? "active__admin-menu" : ""
                    }
                  >
                    Orders
                  </NavLink>
                </li>
                <li className="admin__menu-item">
                  <NavLink
                    to="/dashboard/users"
                    className={(navClass) =>
                      navClass.isActive ? "active__admin-menu" : ""
                    }
                  >
                    Users
                  </NavLink>
                </li>
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
