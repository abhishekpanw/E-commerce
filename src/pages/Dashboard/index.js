import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
import MiniWidgets from "./MiniWidgets";

const Dashboard = () => {

  const state = useSelector(state => state.user)
  const reportss = [
    {
      icon: "ri-stack-line",
      title: "Total Users",
      value: "10",
      rate: "",
      // desc: "From previous period",
    },
    {
      icon: "ri-store-2-line",
      title: "Categories",
      value: "52",
      rate: "",
      // desc: "From previous period",
    },
    {
      icon: "ri-store-2-line",
      title: "Products",
      value: "52",
      rate: "",
      // desc: "From previous period",
    },
 
  ];

  const [reports] = useState(reportss);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Row>
                <MiniWidgets reports={reports} />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
