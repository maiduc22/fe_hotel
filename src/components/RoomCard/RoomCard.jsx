import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DefaultIMG from "../../assets/default.png";
import { FormButton, Image, Text } from "../GlobalStyles/PageStyles";
import "./roomcard.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../contexts/contexts";

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

const RoomCard = ({ handleAddRoomToList, room }) => {
  return (
    <CardContainer>
      <Image
        style={{
          backgroundImage: `url(${room.image == null ? room.image : DefaultIMG})`,
          minWidth: "260px",
          height: "260px",
        }}
        className="img-container"
      />
      <RoomDetails className="details">
        <Text className="clip">{room.name}</Text>
        <Text className="small">{room.type}</Text>
        <Text className="small clamp">{room.description}</Text>
        <Text className="small clamp">{room.price}</Text>
        <Text className="small" style={{ marginBottom: 0 }}>
          {room.isBooked ? "Booked" : "Avaiable"}
        </Text>
        <FormButton
          style={{
            width: "100%",
            marginTop: "16px",
          }}
          onClick={() => handleAddRoomToList(room)}
        >
          Add To Your List
        </FormButton>
      </RoomDetails>
    </CardContainer>
  );
};

export default RoomCard;
