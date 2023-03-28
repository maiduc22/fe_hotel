import React, { useEffect, useState } from "react";
import { FormButton, FormTitle, Input } from "../GlobalStyles/FormStyles";
import { SearchBoxContainer } from "../GlobalStyles/PageStyles";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./box.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import { fontSize } from "@mui/system";
import constants, {
  BASE_URL,
  Paths,
  searchRoomAPI,
  ToastConfig,
} from "../../constants";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { SET_TIME } from "../../redux/actions/time/action_type";

const Extras = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InputContainer = styled.div`
  width: 100%;
  label {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }
`;

const SearchBox = (props) => {
  const data = props.data;
  const styles = props.styles;

  const dispatch = useDispatch();
  const [_checkIn, setCheckIn] = useState(
    data ? new Date(data.checkIn) : new Date()
  );
  const [_checkOut, setCheckOut] = useState(
    data ? new Date(data.checkOut) : new Date()
  );

  const navigate = useNavigate();

  const handleSearchButton = (e) => {
    e.preventDefault();
    if (_checkIn.getTime() > _checkOut.getTime()) {
      toast.warning("Check-out date must be after check-in date.", ToastConfig);
      return;
    }
    const searchData = {
      checkIn: _checkIn.toISOString(),
      checkOut: _checkOut.toISOString(),
    };

    dispatch({
      type: SET_TIME,
      data: {
        checkIn: _checkIn.toISOString(),
        checkOut: _checkOut.toISOString(),
      },
    });
    navigate(Paths.room, { state: searchData });
  };

  return (
    <SearchBoxContainer style={styles}>
      <FormTitle
        style={{ marginBottom: "20px", color: "#000", fontSize: "20px" }}
      >
        Book room you want
      </FormTitle>
      <form onSubmit={(e) => handleSearchButton(e)}>
        <Extras>
          <InputContainer>
            <label style={{ color: "#000" }}>Check-In</label>
            <DatePicker
              selected={_checkIn}
              onChange={(date) => setCheckIn(date)}
            />
          </InputContainer>

          <InputContainer>
            <label style={{ color: "#000" }}>Check-Out</label>
            <DatePicker
              selected={_checkOut}
              onChange={(date) => setCheckOut(date)}
            />
          </InputContainer>

          <FormButton type="submit" className="small-search-button">
            <SearchIcon
              style={{ fontSize: "22px", marginTop: "2px", marginLeft: "2px" }}
            />
          </FormButton>
        </Extras>

        <FormButton type="submit" className="large-search-button">
          <SearchIcon
            style={{ fontSize: "22px", marginTop: "2px", marginLeft: "2px" }}
          />
        </FormButton>
      </form>
    </SearchBoxContainer>
  );
};

export default SearchBox;
