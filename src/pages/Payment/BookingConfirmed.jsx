import React from "react";
import { FormButton, Text } from "../../components/GlobalStyles/PageStyles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Confirmation, Layout } from "./CommonStyles";
import {
  InputContainer,
  Input,
} from "../../components/GlobalStyles/FormStyles";
import { Paths } from "../../constants";
const BookingConfirmed = ({ _userInfo }) => {
  const navigate = useNavigate();

  return (
    <>
      <Confirmation>
        <img
          src="https://img.icons8.com/fluency/48/000000/ok.png"
          alt="/"
          style={{ marginRight: "10px" }}
        />
        <Text style={{ margin: "0" }}>Booking Confirmed</Text>
      </Confirmation>

      <Layout className="buttons">
        <FormButton
          style={{ marginLeft: "auto" }}
          onClick={() => navigate(`${Paths.home}`)}
        >
          Back to Home Page
        </FormButton>
      </Layout>
    </>
  );
};

export default BookingConfirmed;
