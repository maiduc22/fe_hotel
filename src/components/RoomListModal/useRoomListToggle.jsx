import React, { createContext, useContext, useState } from "react";

const RoomListModalContext = createContext();
const ToggleRoomListModalContext = createContext();

function RoomListModalToggle({ children }) {
  const [show, setShow] = useState(false);
  return (
    <RoomListModalContext.Provider value={show}>
      <ToggleRoomListModalContext.Provider value={setShow}>
        <div>{children}</div>
      </ToggleRoomListModalContext.Provider>
    </RoomListModalContext.Provider>
  );
}

export {
  RoomListModalToggle,
  RoomListModalContext,
  ToggleRoomListModalContext,
};
