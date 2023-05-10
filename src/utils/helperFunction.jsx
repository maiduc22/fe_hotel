import axios from "./axios";
import { useState } from "react";

export const getTotalPrice = (roomlist, hours) => {
  var total = 0;
  roomlist.map((room) => (total = total + room.price * hours));
  return Math.ceil(total);
};

export const getPriceByRoomId = async (roomId) => {
  const result = await axios.get();
};
