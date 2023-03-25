import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultIMG from "../../assets/default.png";
import { FormButton, Text, Image } from "../GlobalStyles/PageStyles";
import "./roomcard.css";
import { useNavigate } from "react-router-dom";
import { ModalImage, ModalImageContent } from "../Modal/ViewImageModal";

const CardContainer = styled.div`
  padding: 16px;
  border-radius: 6px;
  background: white;
  box-shadow: 0 0 10px #bbbbbb;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  cursor: pointer;
  :hover .action-slider {
    width: 280px;
    padding: 10px;
    border-radius: 6px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const RoomDetails = styled.div`
  padding: 0 16px;
  border-radius: 6px;
  transition: 0.5s;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 600px) {
    margin-top: 16px;
    padding: 0;
  }
`;

const RoomCard = ({ handleAddRoomToList, room, handleRemoveRoomFromList }) => {
  // let roomList = JSON.parse(localStorage.getItem("selectedRooms"))
  //   ? JSON.parse(localStorage.getItem("selectedRooms"))
  //   : [];

  // const [_isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => setIsModalOpen((prev) => !prev);

  const isAddToList = (roomId) => {
    const roomList = JSON.parse(localStorage.getItem("selectedRooms"));
    console.log(roomList);
    const checkDuplicateRoom = (obj) => obj.id === roomId;
    return roomList.some(checkDuplicateRoom) ? true : false;
  };

  const [_textBtn, setTextBtn] = useState(
    !isAddToList(room.id) ? "Add To Your List" : "Remove From Your List"
  );

  const handleClickButton = () => {
    const roomList = JSON.parse(localStorage.getItem("selectedRooms"));
    console.log(roomList);
    console.log(isAddToList(room.id));
    if (isAddToList(room.id)) {
      setTextBtn("Add To Your List");
      handleRemoveRoomFromList(room.id);
    } else {
      setTextBtn("Remove From Your List");
      handleAddRoomToList(room);
    }
  };

  const renderStatusStyle = (status) => {
    const defaultStyle = {
      width: "fit-content",
      borderRadius: "10px",
      padding: "6px",
      color: "white",
      marginBottom: 0,
    };
    switch (status) {
      case true:
        defaultStyle.backgroundColor = "red";
        break;
      case false:
        defaultStyle.backgroundColor = "green";
        break;
      default:
        break;
    }
    return defaultStyle;
  };

  return (
    <CardContainer>
      <Image
        style={{
          backgroundImage: `url(${
            room.image == null ? room.image : DefaultIMG
          })`,
          minWidth: "260px",
          height: "260px",
        }}
        className="img-container"
      ></Image>
      <RoomDetails className="details">
        <Text className="clip">{room.name}</Text>
        <Text className="small">{room.type}</Text>
        <Text className="small clamp">{room.description}</Text>
        <Text className="small clamp">{room.price}</Text>
        <Text className="small" style={renderStatusStyle(room.isBooked)}>
          {room.isBooked ? "Booked" : "Avaiable"}
        </Text>
        <FormButton
          style={{
            width: "100%",
            marginTop: "16px",
          }}
          onClick={() => handleClickButton()}
        >
          {_textBtn}
        </FormButton>
      </RoomDetails>
    </CardContainer>
  );
};

export default RoomCard;
