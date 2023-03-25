export const getTotalPrice = (roomlist) => {
  var total = 0;
  roomlist.map((room) => (total = total + room.price));
  return total;
};
