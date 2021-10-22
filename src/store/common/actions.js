import axios from "axios";
import { clearAlerts, setError, setLoading, setSuccess } from "../alerts/actions";
import { getCategories,clearCategory } from "../category/actions";
import { getProducts,clearProduct } from "../product/actions";


export const changeStatus = (id, status, moduleName) => {

    console.log(status);
  
    const fd = new FormData();
    fd.append("status", status);
  
    return (dispatch) => {
      dispatch(clearCategory());
      dispatch(clearProduct());
      dispatch(clearAlerts());
      axios
        .patch(`api/${moduleName}/${id}`, fd)
        .then((res) => {
          dispatch(setSuccess(res.data.message));
          console.log("RES", res);
          // dispatch(getUsers());
        })
        .catch((err) => {
          dispatch(setError(err.response.data.message));
          console.log(err);
        });
    };
  };
  
  export const deleteEntry = (id, setDeletePopup, moduleName,currentPage,perPage) => {
    return (dispatch) => {
      dispatch(clearAlerts());
      dispatch(setLoading(true));
      axios
        .delete(`api/${moduleName}/${id}`)
        .then((res) => {            
        
          console.log("RES", res);
  
         
          if(moduleName == 'product'){
            dispatch(getProducts(currentPage,perPage))
          }
          if(moduleName == 'category'){
            dispatch(getCategories());
          }
          setDeletePopup(false);
          setTimeout(() => {
            dispatch(setSuccess(res.data.message));
          }, 1000);
        
        })
        .catch((err) => {
          dispatch(setError(err.response.data.message));
          console.log(err);
        });
    };
  };

//   export const deleteEntry = (id, setDeletePopup,currentPage, perPage) => {
//     return (dispatch) => {
//       dispatch(clearAlerts());
//       dispatch(setLoading(true));
//       axios
//         .delete(`api/user/${id}`)
//         .then((res) => {
//           dispatch(setSuccess(res.data.message));
//           console.log("RES", res);
  
//           dispatch(getUsers(currentPage,perPage));
//           setDeletePopup(false);
//         })
//         .catch((err) => {
//           dispatch(setError(err.response.data.message));
//           console.log(err);
//         });
//     };
//   };