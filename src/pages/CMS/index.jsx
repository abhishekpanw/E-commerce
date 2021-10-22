import React,{useEffect} from "react";
import {
  TabContent,
  Nav,
  NavLink,
  NavItem,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Container,
  Form,
} from "reactstrap";
import Loader from "react-loader-spinner";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Breadcrumbs from "../../components/Common/Breadcrumb";
import classnames from "classnames";
import { useState } from "react";
import { AvForm } from "availity-reactstrap-validation";
import { useDispatch, useSelector } from "react-redux";
import { getCMS, updateCMS } from "../../store/cms/actions";

const CMS = () => {

  const [activeTab, setactiveTab] = useState("1");
  const [data, setdata] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCMS(activeTab,data))
    
  };

  const dispatch = useDispatch();
  const state = useSelector(state => state)
  

  useEffect(() => {
    
    dispatch(getCMS(activeTab));
    // setdata(state.content)

  }, [activeTab])


  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="CMS" />
          <Nav pills className="navtab-bg nav-justified">
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({
                  active: "1" == activeTab,
                })}
                onClick={() => {
                  setactiveTab("1");
                }}
              >
                Terms & Conditions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({
                  active: "2" == activeTab,
                })}
                onClick={() => {
                  setactiveTab("2");
                }}
              >
                Privacy Policy
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({
                  active: "3" == activeTab,
                })}
                onClick={() => {
                  setactiveTab("3");
                }}
              >
                About Us
              </NavLink>
            </NavItem>
          </Nav>

          <Row>
            <Col xs="12">
              <div className="mt-4">
                <AvForm onValidSubmit={handleSubmit}>
                    {console.log(state.content, '===============++>cms')}
                    
                    <CKEditor
                    editor={ ClassicEditor }
                    data={state.cms.content}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setdata(editor.getData())
                        // console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
                  <Button disabled={state.alert.loading} type="submit" className="mt-3">
                    {
                      state.alert.loading ? <Loader type="TailSpin" color="#00BFFF" height={20} width={48}/> : 'Update'
                    }

                        </Button>
                </AvForm>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CMS;
