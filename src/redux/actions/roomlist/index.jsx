import { ADD_TO_LIST, REMOVE_FROM_LIST } from "./action_type";

export default {
  addToList: (data) => ({
    type: ADD_TO_LIST,
    params: {
      data,
    },
  }),
  removeFromList: (id) => ({
    type: REMOVE_FROM_LIST,
    params: {
      id,
    },
  }),
};
