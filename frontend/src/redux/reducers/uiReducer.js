import { SET_ERROR_TRUE, SET_ERROR_FALSE, OPERATION_SUCCESS } from "../types";

const initialState = {
  isError: false,
  isSuccess: false,
  message: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERROR_TRUE:
      return Object.assign({}, state, {
        isSuccess: false,
        isError: true,
        message: payload,
      });
    case SET_ERROR_FALSE:
      return Object.assign({}, state, {
        isError: false,
        isSuccess: false,
        message: payload,
      });
    case OPERATION_SUCCESS:
      return Object.assign({}, state, {
        isError: false,
        isSuccess: true,
        message: payload,
      });
    default:
      return state;
  }
};
