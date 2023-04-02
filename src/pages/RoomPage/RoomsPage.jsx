import React, { useContext, useEffect, useState } from "react";
import { PageContainer, Text } from "../../components/GlobalStyles/PageStyles";
import { useSelector } from "react-redux";
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
  const test = useSelector((state) => state);

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

  return (
    <>
      {_loading ? (
        <PageLoader />
      ) : (
        <PageContainer>
          <LeftSidebar data={location.state} />

          <ResultContainer>
            {_rooms.map((room, index) => (
              <RoomCard room={room} key={index} />
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
