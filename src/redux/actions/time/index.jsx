import { SET_TIME } from "./action_type";

export default {
  setTime: (data) => ({
    type: SET_TIME,
    params: {
      data,
    },
  }),
};
