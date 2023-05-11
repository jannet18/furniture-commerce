import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { db, storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddProducts = () => {

  const [productLists, setProductLists] = useState(["products"]);

// new product states
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const productsCollectionRef = collection(db, "products");

  const getProductLists = async () => {
    try {
      const data = await getDocs(productsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductLists(filteredData === productLists)
      console.log(filteredData)
    } catch(error) {
      toast.error("error.message")
    }
  }

  useEffect(() => {
    getProductLists();

  },[])

  const addProduct = async (e) => {
    e.preventDefault();
    // const product = {
    //   title: enterTitle,
    //   shortDesc: enterShortDesc,
    //   description: enterDescription,
    //   category: enterCategory,
    //   price: enterPrice,
    //   imgUrl: enterProductImg,
    // };

    try {
      const docRef = await collection(db, "products");

      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        () => {
          toast.error("Images not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
          });
        }
      );
      toast.success("Product successfully added!");
      navigate("/dashboard/allproducts");

    } catch (error) {
      setLoading(false);
      toast.error("Product not added!");
    }

    // console.log(product);
  };

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
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder=""
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder=""
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder=""
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="w-50 form__group">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="$"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(Number(e.target.value))}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="w-50 form__group">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
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
                  placeholder="$"
                  onChange={(e) => setEnterProductImg(e.target.files[0])}
                />
              </FormGroup>
            </div>

            <motion.button
              whileTap={{ scale: 1.2 }}
              className="buy__btn"
              type="submit"
              onClick={addProduct}
            >
              Add Product
            </motion.button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
