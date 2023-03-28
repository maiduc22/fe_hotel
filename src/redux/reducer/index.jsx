import { combineReducers } from "redux";
import roomlist_reducer from "./roomlist_reducer";
import time_reducer from "./time_reducer";

const allReducers = combineReducers({
  roomlist_reducer,
  time_reducer,
});

export default allReducers;
