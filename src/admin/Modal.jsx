import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
import { db, storage } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { uploadBytesResumable, getDownloadURL, ref} from "firebase/storage";
import { updateDoc, collection } from "firebase/firestore";

const Modal = () => {
    // const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

  const [updateProduct, setUpdateProduct] = useState({
    productName: "",
    shortDesc: "",
    description: "",
    category: "",
    price: "",
    imgUrl: "",
  });

  const handleChange = (e) => {
    setUpdateProduct({...setUpdateProduct, [e.target.id]: e.target.value});
  };

  useEffect(() => {

  },[])


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        const docRef = collection(db, "products");
  
        const storageRef = ref(
          storage,
          `productImages/${Date.now() + updateProduct?.imgUrl?.name}`
        );
  
        const uploadTask = uploadBytesResumable(storageRef, updateProduct?.imgUrl);
  
        uploadTask.on(
          () => {
            toast.error("Images not uploaded");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(docRef, {
                productName: updateProduct?.productName,
                shortDesc: updateProduct?.shortDesc,
                description: updateProduct?.description,
                category: updateProduct?.category,
                price: updateProduct?.price,
                imgUrl: updateProduct?.downloadURL,
              });
            });
          }
        );
        toast.success("Product successfully updated");
        navigate("/dashboard/allproducts");
  
      } catch (error) {
        setLoading(false);
        toast.error("Product not added!");
      }
  
  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading...</h4>
            ) : (
              <>
                <h4 className="mb-5">Add Product</h4>
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="form__group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder=""
                      value={updateProduct?.productName}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder=""
                      value={updateProduct?.shortDesc}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder=""
                      value={updateProduct?.description}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="w-50 form__group">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="$"
                        value={updateProduct?.price}
                        onChange={(e) => handleChange(Number(e))}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="w-50 form__group">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={updateProduct?.category}
                        onChange={(e) => handleChange(e)}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="chaise">Chaise</option>
                        <option value="outdoor">Outdoor</option>
                      </select>
                    </FormGroup>
                  </div>
                </Form>
              </>
            )}
            <div>
              <FormGroup className="form__group">
                <span>Product Image</span>
                <input
                  type="file"
                  placeholder=""
                  value={updateProduct?.imgUrl}
                  onChange={(e) => handleChange(e.target.files[0])}
                />
              </FormGroup>
            </div>

            <motion.button
              whileTap={{ scale: 1.2 }}
              className="buy__btn"
              type="submit"
            >
              Submit
            </motion.button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Modal;
