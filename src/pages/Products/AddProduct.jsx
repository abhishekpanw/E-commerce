import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Container,
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import {
  addUser,
  clearUser,
  setModalType,
  toggleModal,
  updateUser,
} from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory,Redirect } from "react-router";
import { addCategory, getCategories, updateCategory } from "../../store/category/actions";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addProduct,clearProduct } from "../../store/product/actions";

const AddProduct = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  let history = useHistory();

  const [data, setData] = useState({
    name: "",
    images: "",
    description: "",
    category: "",
    subCategories: "",
    stock: "",
    price: ""
  });

  const [file, setFile] = useState([])
  const [fileObj, setfileObj] = useState([])
  const [fileArray, setfileArray] = useState([])


  const uploadMultipleFiles = (e) => {
  
    fileObj.push(e.target.files)
    // setfileObj([...fileObj, e.target.files])
    
    for(let i = 0; i < fileObj[0].length; i++) {
      setfileArray([...fileArray,URL.createObjectURL(fileObj[0][i])])
    }
  
        setFile(fileArray)
   }

   useEffect(() => {
     
    dispatch(getCategories())
   
    
   }, [])

   useEffect(() => {
     
    // dispatch(getSubC())
    
   }, [])

  useEffect(() => {
    setData({
      name: state.product.name,
      images: '',
      description: state.product.description,
      category: state.product.category,
      // subCategories: state.product.subCategories,
      stock: state.product.stock,
      price: state.product.price
    });
  }, [state.product]);

  const handleChange = (e) => {
    console.log();

    if (e.target.name == "images") {
      setData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.files[0],
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }

    console.log(data);
  };

  const handleSubmit = () => {

    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("images", data.images);
    formData.append("description", data.description);
    formData.append("category", data.category);
    // formData.append("subCategories", '');
    formData.append("image", data.image);
    formData.append("stock", data.stock);
    formData.append("price", data.price);

    dispatch(addProduct(formData, clearInputs));
  };

  const handleUpdate = () => {
    let formData = new FormData();
    // console.log(state.user._id);
    // alert(state.user.user_id)
    formData.append("name", data.name);
    if (data.image) {
      formData.append("image", data.image);
    }
    dispatch(updateCategory(state.category._id, formData, clearInputs));
  };

  const clearInputs = () => {
    setData({
      name: "",
      image: "",
    });
  };

  return (
    <>
    {state.success && <Redirect to="products"></Redirect>}
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumbs title="Products" />
              <Card>
                <CardBody>
                  <h4 className="card-title">Add Product</h4>
                  <p className="card-title-desc">
                    Provide valuable, actionable feedback to your users with
                    HTML5 form validation–available in all our supported
                    browsers.
                  </p>
                  <AvForm className="needs-validation" onValidSubmit={handleSubmit}>
                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="validationCustom01"
                          >
                            Name
                          </Label>
                          <AvField
                            name="name"
                            placeholder="Product name"
                            type="text"
                            errorMessage="Enter Product Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={data.name}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="validationCustom02"
                          >
                            Price
                          </Label>
                          <AvField
                            name="price"
                            placeholder="Last name"
                            type="text"
                            errorMessage="Enter Last name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            value={data.price}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="validationCustom04"
                          >
                            Category
                          </Label>
                          <AvField
                            type="select"
                            name="category"
                            validate={{ required: { value: true } }}
                            errorMessage="Select a Category"
                            value={data.category}
                            onChange={handleChange}
                          >
                            <option>Select Category</option>
                           {category.categories.map(category =>{
                             return (
                               <option value={category._id}>
                                 {category.name}
                               </option>
                             )
                           })}
                          </AvField>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="validationCustom05"
                          >
                            Stock
                          </Label>
                          <AvField
                            name="stock"
                            placeholder="Stock"
                            type="text"
                            errorMessage="Enter Stock"
                            className="form-control"
                            validate={{ required: { value: true } , pattern: {
                              value: "^[0-9]+$",
                              errorMessage: "Only Numbers"
                            }}}
                            id="validationCustom02"
                            value={data.stock}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="12">
                        <Label
                          className="form-label"
                          htmlFor="validationCustom03"
                        >
                          Description
                        </Label>
                        <AvField
                          name="description"
                          placeholder="Last name"
                          type="textarea"
                          errorMessage="Enter Description"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom03"
                          value={data.description}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    
                    <Row className="mt-2">
                      <Col md="12">
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="validationCustom04"
                          >
                            Images
                          </Label>
                          <AvField
                          name="images"
                          placeholder="Last name"
                          type="file"
                          errorMessage="Select an Image"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="validationCustom03"
                          onChange={handleChange}
                          multiple
                        />
                        </div>
                      </Col>
                    
                 
                    </Row>
                    <div className="form-group multi-preview">
                    {(fileArray || []).map(url => (
                        <img height="150px" width="100px" style={{objectFit: 'contain',padding: '10px'}} src={url} alt="..." />
                    ))}
                </div>

                    <Button className="mt-3" color="primary" type="submit" disabled={state.loading}>
                    {state.loading ? (
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={20}
                          width={48}
                        />
                      ) : (
                        'Submit'
                      
                      )}
                    </Button>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddProduct;
