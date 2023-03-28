import React, { useContext } from "react";
import "./header.css";
import styled from "styled-components";
import { FormButton, PageTitle } from "../GlobalStyles/PageStyles";
import HotelLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import {
  RoomListModalContext,
  ToggleRoomListModalContext,
} from "../RoomListModal/useRoomListToggle";
import RoomListModal from "../RoomListModal/RoomListModal";
import { Context } from "../../contexts/contexts";

const FixedHeader = styled.div`
  padding: 12px 16px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  justify-content: space-between;
`;

const Logo = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 100%;
  }
`;

const Header = (props) => {
  let pageName = props.page;
  const isShow = useContext(RoomListModalContext);
  const toggleShow = useContext(ToggleRoomListModalContext);

  return (
    <FixedHeader
      style={
        false
          ? { backgroundColor: "#fff", backdropFilter: "blur(0px)" }
          : pageName === "Home"
          ? {}
          : { background: "white" }
      }
    >
      <RoomListModal />
      <Content>
        <div className="brand">
          <Link to="/">
            <Logo>
              <img src={HotelLogo} alt="/" />
            </Logo>
          </Link>
          <PageTitle>{pageName}</PageTitle>
        </div>
        <FormButton onClick={() => toggleShow(!isShow)}>Your List</FormButton>
      </Content>
    </FixedHeader>
  );
};

export default Header;
