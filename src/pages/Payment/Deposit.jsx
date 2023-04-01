import React, { useContext, useState } from "react";
import { FormButton, Text } from "../../components/GlobalStyles/PageStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "./CommonStyles";
import { toast } from "react-toastify";
import Loader from "../../components/Loaders/Loader";
import { Context } from "../../contexts/contexts";
import { Input, Select } from "antd";
import {
  BASE_URL,
  bookRoomAPI,
  Paths,
  ToastConfig,
  VietnamBank,
} from "../../constants";
import { InputContainer } from "../../components/GlobalStyles/FormStyles";
import styled from "styled-components";
import { getTotalPrice } from "../../utils/helperFunction";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_LIST } from "../../redux/actions/roomlist/action_type";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Deposit = () => {
  const navigate = useNavigate();
  const time = useSelector((state) => state).time_reducer;

  const userInfo = useLocation().state;
  const roomList = useSelector((state) => state).roomlist_reducer.roomlist;

  const [_bankName, setBankName] = useState("");
  const [_bankNumber, setBankNumber] = useState("");

  const dispatch = useDispatch();

  const options = [];
  VietnamBank.map((bank) => {
    options.push({
      value: bank.shortName,
      label: bank.shortName,
    });
  });

  const styleSelect = {
    width: "100%",
  };

  const bookRoom = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/${bookRoomAPI}`, data);
      navigate(`${Paths.payment}/3`);
      localStorage.removeItem("selectedRooms");
    } catch (err) {
      toast.error(`${err.message}`, ToastConfig);
    }
  };
  const handleConfirmButton = () => {
    const data = {
      idCard: userInfo.idCard,
      address: userInfo.address,
      tel: userInfo.tel,
      email: userInfo.email,
      note: userInfo.note,
      fullName: userInfo.fullname,
      bankName: _bankName,
      bankNumber: _bankNumber,
      idsRoom: roomList.map((room) => room.id),
      checkIn: time.checkIn,
      checkOut: time.checkOut,
    };
    console.log(data);
    bookRoom(data);
  };

  return (
    <>
      <Layout>
        <>
          <div className="section">
            <Text>Customer Info</Text>
            <Wrapper></Wrapper>
            {Object.keys(userInfo).map((key, index) => (
              <Wrapper key={index}>
                <Text
                  className="small"
                  style={{ fontWeight: "bolder", marginRight: "5px" }}
                >
                  {" "}
                  {key.toUpperCase()}:
                </Text>
                <Text className="small"> {userInfo[key]}</Text>
              </Wrapper>
            ))}
            <Text style={{ marginTop: "10px" }}>Booking Info</Text>
            <Wrapper style={{ justifyContent: "space-between" }}>
              <Text style={{ fontWeight: "bolder" }} className="small">
                Room Name
              </Text>
              <Text style={{ fontWeight: "bolder" }} className="small">
                Price($)
              </Text>
            </Wrapper>
            {roomList.map((room, index) => (
              <Wrapper key={index} style={{ justifyContent: "space-between" }}>
                <Text className="small">Room {room.name}</Text>
                <Text className="small"> {room.price}</Text>
              </Wrapper>
            ))}
            <hr />
            <Wrapper
              style={{
                marginTop: "15px",
                color: "red",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bolder" }} className="small">
                You have to deposit
              </Text>
              <Text style={{ fontWeight: "bolder" }} className="small">
                {getTotalPrice(roomList) * 0.5}
              </Text>
            </Wrapper>
          </div>
          <div className="section">
            <Text>Payment Info</Text>
            <InputContainer>
              <label>Bank</label>
              <Select
                style={styleSelect}
                options={options}
                onChange={(value) => setBankName(value)}
              />
            </InputContainer>
            <InputContainer>
              <label>Card number</label>
              <Input
                value={_bankNumber}
                onChange={(e) => setBankNumber(e.target.value)}
              />
            </InputContainer>

            <div>
              <Text
                style={{
                  marginTop: "30px",
                  color: "red",
                  fontWeight: "bolder",
                }}
                className="small"
              >
                Please transfer the deposit to the account number{" "}
              </Text>
              <Wrapper>
                <Text
                  style={{ fontWeight: "bolder", marginRight: "10px" }}
                  className="small"
                >
                  Account Owner:
                </Text>
                <Text className="small">Nguyen Van A</Text>
              </Wrapper>
              <Wrapper>
                <Text
                  style={{ fontWeight: "bolder", marginRight: "10px" }}
                  className="small"
                >
                  Bank Name:
                </Text>
                <Text className="small">BIDV</Text>
              </Wrapper>
              <Wrapper>
                <Text
                  style={{ fontWeight: "bolder", marginRight: "10px" }}
                  className="small"
                >
                  Bank Number:
                </Text>
                <Text className="small">123456789</Text>
              </Wrapper>
            </div>
          </div>
        </>
      </Layout>
      <Layout className="buttons">
        <FormButton onClick={() => navigate(`${Paths.payment}/1`)}>
          Go Back
        </FormButton>
        <FormButton onClick={() => handleConfirmButton()}>Next</FormButton>
      </Layout>
    </>
  );
};

export default Deposit;
