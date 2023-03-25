import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { PageContainer, Text } from "../../components/GlobalStyles/PageStyles";
import SearchBox from "../../components/SearchBox/SearchBox";
import { Context } from "../../contexts/contexts";
import { useLocation } from "react-router-dom";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  position: relative;
  border-radius: 0 0 40px 40px;

  @media (max-width: 700px) {
    padding: 16px;
  }
`;
const ImgContainer = styled.div`
  max-width: 800px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 180px;

  img {
    width: 100%;
  }
`;

const HomePage = () => {
  const { setPage } = useContext(Context);

  useEffect(() => {
    setPage("Home");
  }, []);

  return (
    <PageContainer
      style={{
        minHeight: "100vh",
        marginTop: "0px",
        padding: "0px",
        background: "#faebd7",
      }}
    >
      <HomeContainer>
        <SearchBox
          styles={{
            position: "absolute",
            bottom: "-120px",
            background: "#fff",
            margin: "0 16px",
          }}
        />
      </HomeContainer>
    </PageContainer>
  );
};

export default HomePage;
