import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultIMG from "../../assets/default.png";
import { FormButton, Text, Image } from "../GlobalStyles/PageStyles";
import "./roomcard.css";
import { useNavigate } from "react-router-dom";
import { ModalImage, ModalImageContent } from "../Modal/ViewImageModal";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_LIST } from "../../redux/actions/roomlist/action_type";
import { toast } from "react-toastify";
import { ToastConfig } from "../../constants";

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

const RoomCard = ({ room }) => {
  const dispatch = useDispatch();
  const roomlist = useSelector((state) => state.roomlist_reducer).roomlist;

  const isAddToList = (roomId) => {
    const checkDuplicateRoom = (obj) => obj.id === roomId;
    return roomlist.some(checkDuplicateRoom) ? true : false;
  };

  const handleAddToList = () => {
    if (!isAddToList(room.id)) {
      dispatch({
        type: ADD_TO_LIST,
        data: room,
      });
      toast.success("Added to your list", ToastConfig);
    } else {
      toast.warning("Your list has this room already", ToastConfig);
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
          // backgroundImage: `url(${
          //   room.image !== "" ? room.image : DefaultIMG
          // })`,
          minWidth: "260px",
          height: "260px",
        }}
        className="img-container"
      >
        <img
          src={room.image !== "" ? room.image : "../../assets/default.png"}
          style={{ height: "260px", width: "260px" }}
          loading="lazy"
        />
      </Image>
      <RoomDetails className="details">
        <Text className="clip">{room.name}</Text>
        <Text className="small">{room.type}</Text>
        <Text className="small clamp">{room.description}</Text>
        <Text className="small clamp">{room.price}</Text>
        <Text className="small" style={renderStatusStyle(room.isBooked)}>
          {false ? "Booked" : "Avaiable"}
        </Text>
        <FormButton
          style={{
            width: "100%",
            marginTop: "16px",
          }}
          onClick={() => handleAddToList()}
        >
          Add to your list
        </FormButton>
      </RoomDetails>
    </CardContainer>
  );
};

export default RoomCard;
