import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { InputContainer, InputLabel } from "../commons/Input";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import constants, { Paths } from "../../constants";

const SearchBoxContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 6px 20px 3px #66666682;
  z-index: 9999;
`;

const SearchBoxTitle = styled.h3`
  font-size: 32px;
  font-weight: 600;
  color: #ff6e29;
  margin: 10px 0;
  width: 100%;
  text-align: center;
`;

const SearchBoxForm = styled.form``;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  align-items: center;
  gap: 12px;
`;
const SearchBoxButton = styled.button`
  width: 100%;
  margin-top: 30px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  padding: 10px 20px;
  text-align: center;
  outline: 0;
  border: 0;
  border-radius: 40px;
  background: #ff6e29;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const SearchBox = (props) => {
  const styles = props.styles;
  const [_checkInDate, setCheckInDate] = useState(null);
  const [_checkOutDate, setCheckOutDate] = useState(null);
  const [_errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      _checkInDate != null &&
      _checkOutDate != null &&
      _checkOutDate.getTime() < _checkInDate.getTime()
    ) {
      toast.warning(
        "Check-out day must be after check-in day",
        constants.ToastConfig
      );
      return;
    }
    if (_checkInDate == null || _checkOutDate == null) {
      toast.warning(
        "Please select both check-in and check-out day",
        constants.ToastConfig
      );
      return;
    }
    console.log(new Date(_checkInDate).toISOString());
    navigate(`${Paths.roomlist}`);
  };

  return (
    <SearchBoxContainer style={styles}>
      <SearchBoxTitle>Search Box</SearchBoxTitle>
      <SearchBoxForm onSubmit={() => handleSubmitForm()}>
        <FormContainer>
          <InputContainer>
            <InputLabel>Check-In Day</InputLabel>
            <DatePicker
              selected={_checkInDate}
              onChange={(date) => setCheckInDate(date)}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>Check-Out Day</InputLabel>
            <DatePicker
              selected={_checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
            />
          </InputContainer>
        </FormContainer>
      </SearchBoxForm>
      <SearchBoxButton onClick={(e) => handleSubmitForm(e)}>
        Search <FaSearch />
      </SearchBoxButton>
    </SearchBoxContainer>
  );
};
