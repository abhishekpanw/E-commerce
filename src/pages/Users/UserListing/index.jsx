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

import AddUser from "../AddUser";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import FilterComponent from "../../../components/DataTables/FilterComponent";
import CustomLoader from "../../../components/DataTables/CustomLoader";
import UserColumns from "./UserColumns";
import ConfirmDelete from "../../../components/DataTables/ConfirmDelete";




const Users = () => {


  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setcurrentPage] = useState();
  const [perPage, setPerPage] = useState(10);


  // PAGINATION
  const handlePageChange = (page) => {
    setcurrentPage(page);
    dispatch(getUsers(page, perPage));
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(getUsers(page, newPerPage));
  };



  const handleChangeStatus = (id, status) => {
    console.log("ID", id);
    console.log("HANDLE CHANGE STATUS", status);
    dispatch(changeUserStatus(id, status));
  };

   
  const editUserPopup = (id) => {
    dispatch(toggleModal());
    dispatch(setModalType("edit"));
    dispatch(setUser(state.user.users.docs.find((u) => u._id == id)));
  };


  const handleDeleteUser = (id) => {
    setDeletePopup(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(deleteId, setDeletePopup, currentPage,perPage));
  };


 
  const subHeaderComponentMemo = React.useMemo(() => {
 
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        filterText={filterText}
        dispatch={dispatch}
        title="Add User"
      />
    );
  }, [filterText]);


  useEffect(() => {

    if (filterText) {
      dispatch(getUsers(1, perPage, filterText));
    } else {
      // alert(currentPage);
      dispatch(getUsers(1, perPage));
    }

  }, [filterText]);

 
  return (
    <>
      {deletePopup && (
        <ConfirmDelete loading={state.alert.loading} confirmDelete={confirmDelete} setDeletePopup={setDeletePopup}/>
      )}
      <AddUser modal={state.user.isModalOpen} />
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumbs title="Users" />
              <DataTable
                columns={UserColumns(handleChangeStatus,handleDeleteUser,editUserPopup)}
                data={state.user.users.docs}
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

export default Users;
