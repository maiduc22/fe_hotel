import React, { useContext, useEffect, useState } from "react";
import { PageContainer, Text } from "../../components/GlobalStyles/PageStyles";

import styled from "styled-components";
import LeftSidebar from "../../components/Sidebars/LeftSidebar";
import { useParams, useLocation, useNavigate } from "react-router";
import PageLoader from "../../components/Loaders/PageLoader";
import constants, {
  BASE_URL,
  Paths,
  searchRoomAPI,
  ToastConfig,
} from "../../constants";
import axios from "../../utils/axios";
import RoomCard from "../../components/RoomCard/RoomCard";
import { Context } from "../../contexts/contexts";
import { toast } from "react-toastify";

const ResultContainer = styled.div`
  width: calc(100vw - 510px);
  margin-left: auto;

  @media (max-width: 1000px) {
    width: 100%;
    margin-top: 30px;
  }
`;

const RoomsPage = () => {
  const { setPage } = useContext(Context);
  const params = useParams();
  const location = useLocation();
  const state = location.state;

  const [_rooms, setRooms] = useState([]);
  const [_loading, setLoading] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const body = location.state;
      const response = await axios.post(`${BASE_URL}/${searchRoomAPI}`, body);
      setRooms(response.data.data);
    } catch (err) {
      toast.error(`${err.message}`, ToastConfig);
    }
    // setTimeout(() => setLoading(false), 1000);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
    setPage("Search Room");
  }, [state]);

  const roomList = JSON.parse(localStorage.getItem("selectedRooms"));
  const [_selectedRooms, setSelectedRooms] = useState(roomList ? roomList : []);

  const handleAddRoomToList = (room) => {
    const checkDuplicateRoom = (obj) => obj.id === room.id;
    if (!_selectedRooms.some(checkDuplicateRoom)) {
      toast.success("Add to your list", ToastConfig);
      setSelectedRooms((prevState) => [...prevState, room]);
    }
  };

  const handleRemoveRoom = (roomId) => {
    setSelectedRooms((currentState) =>
      currentState.filter((room) => room.id != roomId)
    );
  };

  useEffect(() => {
    if (_selectedRooms.length > 0) {
      localStorage.setItem("selectedRooms", JSON.stringify(_selectedRooms));
    }
  }, [_selectedRooms]);

  return (
    <>
      {_loading ? (
        <PageLoader />
      ) : (
        <PageContainer>
          <LeftSidebar data={location.state} />

          <ResultContainer>
            {_rooms.map((room, index) => (
              <RoomCard
                room={room}
                key={index}
                handleAddRoomToList={handleAddRoomToList}
              />
            ))}
            {_rooms.length === 0 ? (
              <Text style={{ color: "grey", textAlign: "center" }}>
                No Room Found
              </Text>
            ) : null}
          </ResultContainer>
        </PageContainer>
      )}
    </>
  );
};

export default RoomsPage;
