import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Button, Label, Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearProduct, getProducts, setProduct } from "../../../store/product/actions";

import DataTable from "react-data-table-component";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import FilterComponent from "../../../components/DataTables/FilterComponent";
import CustomLoader from "../../../components/DataTables/CustomLoader";
import Columns from "./Columns";
import ConfirmDelete from "../../../components/DataTables/ConfirmDelete";
import { changeStatus, deleteEntry } from "../../../store/common/actions";

const Products = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // PAGINATION
  const handlePageChange = (page) => {
    setcurrentPage(page);
    dispatch(getProducts(page, perPage));
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(getProducts(page, newPerPage));
  };

  const handleChangeStatus = (id, status) => {
    console.log("ID", id);
    console.log("HANDLE CHANGE STATUS", status);
    dispatch(changeStatus(id, status, "product"));
  };

  const handleDelete = (id) => {
    setDeletePopup(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(
      deleteEntry(deleteId, setDeletePopup, "product", currentPage, perPage)
    );
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        filterText={filterText}
        dispatch={dispatch}
        title=""
      />
    );
  }, [filterText]);

  

  useEffect(() => {
    if (filterText) {
      dispatch(getProducts(1, perPage, filterText));
    } else {
      // alert(currentPage);
      dispatch(getProducts(1, perPage));
    }
  }, [filterText]);

  return (
    <>
      {deletePopup && (
        <ConfirmDelete
          loading={state.alert.loading}
          confirmDelete={confirmDelete}
          setDeletePopup={setDeletePopup}
        />
      )}
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumbs title="Products" />
              <DataTable
                columns={Columns(handleChangeStatus, handleDelete)}
                data={state.product.products.docs}
                pagination
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                progressPending={state.alert.loading}
                progressComponent={<CustomLoader />}
                paginationServer
                paginationTotalRows={state.user.users.totalDocs}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Products;
