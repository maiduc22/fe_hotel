import { SET_TIME } from "../actions/time/action_type";

export default (state = { checkIn: "", checkOut: "" }, action) => {
  switch (action.type) {
    case SET_TIME:
      console.log(action.data.checkIn);
      return {
        ...state,
        checkIn: action.data.checkIn,
        checkOut: action.data.checkOut,
      };
    default:
      return state;
  }
};
