import React from "react"
import { Link } from "react-router-dom"
import Toggle from 'react-toggle'
import { URL } from "../../.."
import IMG from '../../../assets/images/placeholder.png'

const Columns = (handleChangeStatus,handleDelete,editPopup) => {
  
  return [
    {
      name: "#",
      selector: "sr_no",
    },
    { 
      name: "Image",
      selector: "image",
      sortable: true,
      selector: (row) => {
        return (
          <>
             <img height="90px" style={{objectFit: 'contain',padding: '10px'}} src={IMG} alt={IMG}></img>
          </>
        )
      }
    },
    { 
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return (
          <>
            <Toggle
              checked={row.status}
              aria-label="No label tag"
              onChange={(e) => {
                handleChangeStatus(row._id, e.target.checked);
                row.status = !row.status;
              }}
            />
          </>
        );
      },
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <>
            <Link
              onClick={() => editPopup(row._id)}
              className="me-3 text-primary"
            >
              <i className="mdi mdi-pencil font-size-18"></i>
            </Link>
            <Link
              onClick={() => handleDelete(row._id)}
              className="text-danger"
            >
              <i className="mdi mdi-trash-can font-size-18"></i>
            </Link>
          </>
        );
      },
    },
  ];
  
}

export default Columns