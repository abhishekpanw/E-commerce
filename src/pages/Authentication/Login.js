import React, { useState } from "react";

import { Row, Col, Button, Alert, Container, Label } from "reactstrap";

// Redux
import {  useDispatch, useSelector } from "react-redux";
import {  Link, useHistory } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
// import { checkLogin, apiError } from "../../store/actions";

// import images
import logodark from "../../assets/images/logo.jpg";
import logolight from "../../assets/images/logo.jpg";
import { login } from "../../store/auth/actions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Login() {
  let history = useHistory();

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    dispatch(login(username, password, history));
  };

  if (state.loading) {
    return <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
         <Loader
        type="ThreeDots"
        color="#5664D2"
        height={100}
        width={100}
      />
    </div>;
  }

  return (
      <React.Fragment>
  <div>
      <Container fluid className="p-0">
          <Row className="g-0">
              <Col lg={4}>
                  <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                      <div className="w-100">
                          <Row className="justify-content-center">
                              <Col lg={9}>
                                  <div>
                                      <div className="text-center">
                                      <div>
                                          <Link to="/" class="">
                                              <img src={logodark} alt="" height="80" class="auth-logo logo-dark mx-auto" />
                                              <img src={logolight} alt="" height="80" class="auth-logo logo-light mx-auto" />
                                          </Link>
                                      </div>

                                          <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                                          <p className="text-muted">Sign in to continue</p>
                                      </div>

                                      {state.failed ? <Alert color="danger">{state.failed}</Alert> : null}

                                      <div className="p-2 mt-5">
                                          <AvForm className="form-horizontal"
                                          onValidSubmit={handleSubmit} >

                                              <div className="auth-form-group-custom mb-4">
                                                  <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                  <Label htmlFor="username">Email</Label>
                                                  <AvField name="username" type="text" className="form-control" id="username" placeholder="Enter username"  validate={{required: true, email: true}}  value={username} onChange = {(e) => setUsername(e.target.value) }/>
                                              </div>

                                              <div className="auth-form-group-custom mb-4">
                                                  <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                  <Label htmlFor="userpassword">Password</Label>
                                                  <AvField name="password" type="password" className="form-control" id="userpassword" validate={{required: true}} placeholder="Enter password"  value={password} onChange = {(e) => setPassword(e.target.value) } />
                                              </div>

                                              {/* <div className="form-check">
                                                  <Input type="checkbox" className="form-check-input" id="customControlInline" />
                                                  <Label className="form-check-label" htmlFor="customControlInline">Remember me</Label>
                                              </div> */}

                                              <div className="mt-4 text-center">
                                                  <Button color="primary" className="w-md waves-effect waves-light" type="submit">Log In</Button>
                                              </div>

                                              {/* <div className="mt-4 text-center">
                                                  <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                                              </div> */}
                                          </AvForm>
                                      </div>

                                  </div>

                              </Col>
                          </Row>
                      </div>
                  </div>
              </Col>
              <Col lg={8}>
                  <div className="authentication-bg">
                      <div className="bg-overlay"></div>
                  </div>
              </Col>
          </Row>
      </Container>
  </div>
  </React.Fragment>
  )
}

export default Login;
