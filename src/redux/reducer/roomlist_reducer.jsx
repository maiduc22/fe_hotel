import {
  ADD_TO_LIST,
  CLEAR_LIST,
  REMOVE_FROM_LIST,
} from "../actions/roomlist/action_type";

export default (state = { roomlist: [] }, action) => {
  switch (action.type) {
    case ADD_TO_LIST:
      const temp = [
        ...state.roomlist,
        {
          id: action.data.id,
          name: action.data.name,
          type: action.data.type,
          price: action.data.price,
          description: action.data.description,
          image: action.data.image,
        },
      ];
      return {
        ...state,
        roomlist: temp,
      };
    case REMOVE_FROM_LIST:
      const filterRoomlist = state.roomlist.filter(
        (room) => room.id !== action.id
      );
      return {
        ...state,
        roomlist: filterRoomlist,
      };
    case CLEAR_LIST:
      return {
        ...state,
        roomlist: [],
      };
    default:
      return state;
  }
};
