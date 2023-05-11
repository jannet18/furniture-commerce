import { getDocs } from "firebase/firestore";
import React from "react";
import { Container, Row, Col } from "reactstrap";
// import { toast } from "react-toastify";
import useGetData from "../firebase/useGetData";
import { db } from "../firebase/config";
import { doc, where, query, collection } from "firebase/firestore";

const Orders = () => {
  const { data: productsData, loading } = useGetData("products");

  console.log(productsData);

  const approved = () => {
    const docRef = collection(db, "products");
     const q = query(docRef, where( productsData?.productName === productsData?.productName?.id))
    const querySnapshot = getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id)
    })

    return (doc.id)
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="d-grid gap-2 d-md-flex justify-content-md-end">In progress</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h3 className="py-5 text-center fw-bold">Loading...</h3>
                ) : (
                  productsData.map((product, id) => (
                    <tr key={id}>
                      <td>
                        <img src={product.imgUrl} alt="" />
                      </td>
                      <td>{product.productName}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td className="d-grid gap-4 d-md-flex justify-content-md-end">
                        <label htmlFor="completed"></label>
                        <input type="checkbox"
                        checked={approved} className="gap-4" />
                        <button className="btn btn-outline-success">Completed</button>
                      </td>
                      <td>
                      
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
