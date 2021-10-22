import React from 'react'
import SweetAlert from "react-bootstrap-sweetalert";
import Loader from "react-loader-spinner";

const ConfirmDelete = ({loading, confirmDelete, setDeletePopup}) => {
    return (
        <SweetAlert
        warning
        showCancel
        confirmBtnText={
         loading ? (
            <Loader type="ThreeDots" color="#fff" height={10} width={80} />
          ) : (
            "Confirm"
          )
        }
        // confirmBtnText = 'fgug'
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => confirmDelete()}
        onCancel={() => setDeletePopup(false)}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>
    )
}

export default ConfirmDelete
