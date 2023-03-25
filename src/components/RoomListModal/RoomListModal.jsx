import styled from "styled-components";
import React, { useContext, useEffect, useRef } from "react";
import {
  RoomListModalContext,
  ToggleRoomListModalContext,
} from "./useRoomListToggle";
import DefaultIMG from "../../assets/default.png";
import { FormButton } from "../GlobalStyles/FormStyles";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants";

const Container = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  box-sizing: border-box;
  position: absolute;
  flex-direction: column;
  width: 30vw;
  padding: 1em;
  top: 70px;
  right: 3em;
  background-color: white;
  box-shadow: 0px 15px 34px 8px rgba(0, 0, 0, 0.36);
  -webkit-box-shadow: 0px 15px 34px 8px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: 0px 15px 34px 8px rgba(0, 0, 0, 0.36);
  z-index: 1;
  border-radius: 0.3em;
  & button:hover {
    color: white;
    box-shadow: 0px 2px 15px 0px hsl(26, 100%, 55%);
  }

  & p {
    margin: 0;
  }

  & h4 {
    margin: 0;
    padding: 0;
    font-weight: bold;
  }

  & hr {
    margin: 5px 0;
  }
  @media (max-width: 525px) {
    width: 90vw;
    left: auto;
    right: auto;
  }
`;
const CartBtn = styled.button`
  width: 12em;
  min-width: 100%;
  background-color: hsl(26, 100%, 55%);
  color: hsl(0, 0%, 100%);
  border-radius: 0.4em;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  & img {
    width: 2.5em;
    padding-bottom: 10px;
  }
  .details {
    text-align: right;
  }
  .name {
  }

  .price {
    font-size: smaller;
  }
`;

function RoomListModal() {
  const show = useContext(RoomListModalContext);
  const toggleShow = useContext(ToggleRoomListModalContext);

  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [toggleShow]);

  const roomList = JSON.parse(localStorage.getItem("selectedRooms"))
    ? JSON.parse(localStorage.getItem("selectedRooms"))
    : [];

  const handleClickGoToPayment = () => {
    toggleShow();
    navigate(`${Paths.payment}/1`);
  };
  return (
    <Container show={show} ref={ref}>
      <h4>Your List</h4>
      <hr />

      {roomList.length > 0 ? (
        <>
          {roomList.map((room, index) => (
            <Content key={index}>
              <img src={room.img ? room.img : DefaultIMG} alt="" />
              <div className="details">
                <p className="room"> {room.name}</p>
                <p className="price">{room.price}</p>
              </div>
            </Content>
          ))}
          <hr />
          <div style={{ width: "100%", marginTop: "8px" }}>
            <FormButton
              style={{ width: "100%" }}
              onClick={() => handleClickGoToPayment()}
            >
              Go To Payment
            </FormButton>
          </div>
        </>
      ) : (
        <div style={{ width: "100%" }}>
          <p style={{ textAlign: "center" }}>Your list is empty</p>
        </div>
      )}
    </Container>
  );
}

export default RoomListModal;
