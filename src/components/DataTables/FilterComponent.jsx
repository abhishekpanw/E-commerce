import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Card, CardBody, Button, Label } from "reactstrap";
import styled, { keyframes } from "styled-components";
import { toggleModal,setModalType } from "../../store/user/actions";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const FilterComponent = ({ filterText, onFilter, title }) => {

  const dispatch = useDispatch();

  return (
    <div style={{ width: "100%" }}>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col style={{ display: "flex", justifyContent: "flex-start" }}>
          <TextField
            id="search"
            type="text"
            placeholder="Search"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
          />
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="text-sm-end">
            {/* <Link to="addUser"> */}
           {title && <Button
              type="button"
              color="success"
              className="btn-rounded mb-2 me-2"
              onClick={() => {
                dispatch(toggleModal())
                dispatch(setModalType('add'))
              }}
            >
              <i className="mdi mdi-plus me-1" /> {title}
            </Button>}
            {/* </Link> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FilterComponent;
