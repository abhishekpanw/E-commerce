import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Button, Label, Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserStatus,
  deleteUser,
  getUsers,
  toggleModal,
  setModalType,
  setUser,
} from "../../../store/user/actions";

import DataTable from "react-data-table-component";

import AddCategory from "../AddCategory";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import FilterComponent from "../../../components/DataTables/FilterComponent";
import CustomLoader from "../../../components/DataTables/CustomLoader";
import Columns from "./Columns";
import ConfirmDelete from "../../../components/DataTables/ConfirmDelete";
import { getCategories, setCategory } from "../../../store/category/actions";
import { changeStatus, deleteEntry } from "../../../store/common/actions";




const Category = () => {


  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setcurrentPage] = useState();
  const [perPage, setPerPage] = useState(10);


  // PAGINATION
//   const handlePageChange = (page) => {
//     setcurrentPage(page);
//     dispatch(getUsers(page, perPage));
//   };

//   const handlePerRowsChange = async (newPerPage, page) => {
//     dispatch(getUsers(page, newPerPage));
//   };



  const handleChangeStatus = (id, status) => {
    console.log("ID", id);
    console.log("HANDLE CHANGE STATUS", status);
    dispatch(changeStatus(id, status,'category'));
  };

   
  const editPopup = (id) => {
    dispatch(toggleModal());
    dispatch(setModalType("edit"));
    dispatch(setCategory(state.category.categories.find((u) => u._id == id)));
  };


  const handleDelete = (id) => {

    setDeletePopup(true);
    setDeleteId(id);

  };

  const confirmDelete = () => {
    dispatch(deleteEntry(deleteId, setDeletePopup, 'category'));
  };


 
  const subHeaderComponentMemo = React.useMemo(() => {
 
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        filterText={filterText}
        dispatch={dispatch}
        title="Add Category"
      />
    );
  }, [filterText]);


  useEffect(() => {

    // if (filterText) {
    //   dispatch(getUsers(1, perPage, filterText));
    // } else {
    //   // alert(currentPage);
    //   dispatch(getUsers(1, perPage));
    // }
    dispatch(getCategories())

  }, []);

 
  return (
    <>
      {deletePopup && (
        <ConfirmDelete loading={state.alert.loading} confirmDelete={confirmDelete} setDeletePopup={setDeletePopup}/>
      )}
      <AddCategory modal={state.user.isModalOpen} />
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumbs title="Categories" />
              <DataTable
                columns={Columns(handleChangeStatus,handleDelete,editPopup)}
                data={state.category.categories}
                pagination
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                progressPending={state.alert.loading}
                progressComponent={<CustomLoader />}
                // paginationServer
                paginationTotalRows={state.category.categories.length}
                // onChangeRowsPerPage={handlePerRowsChange}
                // onChangePage={handlePageChange}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Category;
