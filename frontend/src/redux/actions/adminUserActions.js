import {
  AUTHENTICATE,
  SET_ERROR_TRUE,
  SET_ERROR_FALSE,
  GET_ALL_HOSTS,
  OPERATION_SUCCESS,
  GET_ALL_EVENTS,
  FETCH_IMAGE,
  GET_ALL_USERS_WITH_ALL_ROLES
} from "../types";
import axios from "axios";

export const login = (values, history) => (dispatch) => {
  axios
    .post("/users/login", values)
    .then((res) => {
      console.log(res);
      if(res.data.user.role ==="admin"){
        dispatch({
          type: AUTHENTICATE,
          payload: res.data,
        });
      history.push("/shows");
      }
      else{
        dispatch({
          type: SET_ERROR_TRUE,
          payload: 'You are not an admin',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR_TRUE,
        payload: 'Invalid Email or Password',
      });
    });
};
export const fecthImage = (filepath) => (dispatch,getState) => {
  const method = 'GET';
  console.log(filepath);
  let image={
    "filepath":filepath
  };
  
  axios
  .get("/pictures", 
  image, {
    headers: {
      'Content-Type':'application/json',
      Authorization: getState().Admin.data.message.token,
    },
    responseType:'blob'
  })
  .then((res) => {
    console.log('fetch image response ++',res.data);
    // dispatch({
    //   type: FETCH_IMAGE,
    //   payload: res.data,
    // });
  })
  .catch((err) => {
    console.log('errrrrr',err);
    dispatch({
      type: SET_ERROR_TRUE,
      payload: "Unable to Load Image!",
    });
  });

}
export const getAllUserwithAllRoles = () => (dispatch, getState) => {
 

  axios
    .get("/users", {
      headers: {
        Authorization: getState().Admin.data.message.token,
    
      },
    })
    .then((res) => {
      console.log("fetching users", res.data);
      dispatch({
        type: GET_ALL_USERS_WITH_ALL_ROLES,
        payload: res.data,
      });
    })
    .catch((err) => {
     console.log(err);
      dispatch({
        type: SET_ERROR_TRUE,
        payload: "Unable to Load Users!",
      });
    });
};

// export const updateHost = (values) => (dispatch, getState) => {
//   console.log("id for update Host", values.id);
//   let image, password;
//   if (values.updateImage) {
//     image = values.imageFile;
//   }
//   if (values.updatePassword) {
//     password = values.password;
//   }
//   let formData = {
//     email: values.email,
//     firstname: values.firstName,
//     lastname: values.lastName,
//     username: values.userName,
//   };
//   axios
//     .put("/users/" + values.id, formData, {
//       headers: {
//         Authorization: getState().Admin.data.message.token,
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       dispatch({
//         type: OPERATION_SUCCESS,
//         payload: "Host is Updated Successfully!",
//       });
//     })
//     .catch((err) => {
//       console.log(err.response);
//       dispatch({
//         type: SET_ERROR_TRUE,
//         payload: "Unable to Update Host!",
//       });
//     });
// };


 export const createEvent = (values,history) => (dispatch, getState) => {
  console.log("values forwarded in redux", values);
 
   const formData = new FormData();
   formData.append("name", values.title);
   formData.append("price", values.ticketPrice);
   formData.append("description", values.description);
   formData.append("trailer", values.trailerYoutubeURL);
   //formData.append('user',values.host);
   formData.append("movieImage", values.imageFile);
   //  formData.append('time',values.time);
   formData.append("date", values.date);
   formData.append("user", values.user);
   //  formData.append('event',values.event);
   //   formData.append('date',values.date);
   //   formData.append('role',values.role);
   //   formData.append('time',values.time);
 
   console.log("form data in create event", formData);
 
   axios
     .post("/events/", formData, {
       headers: {
         Authorization: getState().Admin.data.message.token,
       },
     })
     .then((res) => {
       console.log(res.data);
       dispatch({
         type: OPERATION_SUCCESS,
         payload: "Event is Created Successfully!",
       });
     })
     .catch((err) => {
       console.log(err);
       dispatch({
         type: SET_ERROR_TRUE,
         payload: "Unable to Create Event!",
       });
     });
 };

 export const updateEvent = (values,history) => (dispatch, getState) => {

  console.log("values", values);

  const formData = new FormData();
  formData.append("trailer", values.trailerYoutubeURL);
  if (values.updatePhoto) {
    
    formData.append("movieImage", values.imageFile);
  }
  formData.append("name", values.title);
  formData.append("description", values.description);
  formData.append("price", values.ticketPrice);
  formData.append("date", values.date);
  formData.append("user", values.user);
  console.log("form data in create host", formData);

  axios
    .put("/events/" + values.eventId, formData, {
      headers: {
        Authorization: getState().Admin.data.message.token,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: OPERATION_SUCCESS,
        payload: "Event is Updated successfuly!",
      });
      // history.push("/eorbi/dashboard")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR_TRUE,
        payload: "Unable to Update Event!",
      });
      
    });
};


export const createHost = (values,history) => (dispatch, getState) => {
  console.log("values", values);

  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);
  formData.append("image", values.imageFile);
  formData.append("role", values.role);
  formData.append("firstname", values.firstName);
  formData.append("lastname", values.lastName);
  formData.append("username", values.userName);

  console.log("form data in create host", formData);

  axios
    .post("/users/signup", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: getState().Admin.data.message.token,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: OPERATION_SUCCESS,
        payload: "Host is Created!",
      });
      
      return true;
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR_TRUE,
        payload: "Unable to Create Host!",
      });
    });
};
export const updateHost = (values,history) => (dispatch, getState) => {
  console.log("values",values)

  const formData = new FormData();
  formData.append('email',values.email);
  // if(values.password !== ''){
  //   formData.append('password',values.password);
  // }
  // if(values.updateImage){
  //   formData.append('image',values.imageFile);
  // }
  formData.append('role',values.role);
  formData.append('firstname',values.firstName);
  formData.append('lastname',values.lastName);
  formData.append('username',values.userName)

  console.log("form data in create host",formData)

  axios
    .put("/users/"+values.id,  formData,{
      headers: {
       
          'Authorization': getState().Admin.data.message.token,
      }

  })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: OPERATION_SUCCESS,
        payload: 'Host is Updated successfuly!',
     });
    //  history.push("/eorbi/dashboard")
        })
    .catch((err) => {
      console.log(err);
      dispatch({
           type: SET_ERROR_TRUE,
           payload:'Unable to Update Host!',
        });
    });

};

export const deleteHost = (id,history) => (dispatch, getState) => {
  console.log("id for deletion", id);
  axios
    .delete("/users/" + id, {
      headers: {
        Authorization: getState().Admin.data.message.token,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: OPERATION_SUCCESS,
        payload: "Host is Deleted successfuly!",
      });
      // history.push("/eorbi/dashboard");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR_TRUE,
        payload: "Unable to Delete Host!",
      });
    });
};



export const setErrorFalse = () => (dispatch) => {
  dispatch({
    type: SET_ERROR_FALSE,
    payload:"null data",
  });
};
export const getAllHosts = () => (dispatch, getState) => {
  axios
    .get("/users/hosts", {
      headers: {
        Authorization: getState().Admin.data.message.token,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_ALL_HOSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.status);
      dispatch({
        type: SET_ERROR_TRUE,
        payload: "Unable to Load Host!",
      });
    });
};

export const getAllEvents = () => (dispatch, getState) => {
  axios
    .get("/events/", {
      headers: {
        Authorization: getState().Admin.data.message.token,
      },
    })
    .then((res) => {
      console.log("All events" + res.data);
      let events=res.data.events.sort(function(a,b)
        {
        return new Date(a.date) - new Date(b.date);
      }
      );
    
        dispatch({
        type: GET_ALL_EVENTS,
        payload: events,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR_TRUE,
        payload: "Unable to Load Events!",
      });
    });
};

export const deleteEvent = (id,history) => (dispatch, getState) => {
  console.log("id for deletion", id);
  axios
    .delete("/events/" + id, {
      headers: {
        Authorization: getState().Admin.data.message.token,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: OPERATION_SUCCESS,
        payload: "Event is Deleted successfuly!",
      });
      // history.push("/eorbi/dashboard")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR_TRUE,
        payload: "Unable to Delete Event!",
      });
    
    });
};

// dispatch({
//   type: AUTHENTICATE,
//   payload: res.data.message,
// });
// history.push("/shows");

// dispatch error

// dispatch({
//   type: SET_ERROR_TRUE,
//   payload: err.response.message,
// });
