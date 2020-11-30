import { AUTHENTICATE,GET_ALL_HOSTS,GET_ALL_EVENTS,LOGOUT,FETCH_IMAGE,GET_ALL_USERS_WITH_ALL_ROLES } from "../types";

const initialState = {
  isLoggedIn: false,
  userSignUp:false,
  data: {},
 
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE:
      return Object.assign({}, state, {
        isLoggedIn: true,
        data: payload,
      });
      case GET_ALL_HOSTS:
      return Object.assign({}, state, {
        allHosts: [...payload],
      });
      case GET_ALL_USERS_WITH_ALL_ROLES:
      return Object.assign({}, state, {
        allFanUsers: [...payload],
      });
      case GET_ALL_EVENTS:
        return Object.assign({}, state, {
          allEvents: [...payload],
        });
         case LOGOUT:
        return Object.assign({}, state=undefined);
         case FETCH_IMAGE:
          return Object.assign({}, state, {
            previewImage:payload
          });
    default:
      return state;
  }
};
// //
