import React, { useContext, useEffect, useState } from "react";
import { PageContainer } from "../../components/GlobalStyles/PageStyles";
import ProgressBar from "./ProgressBar";
import CustomerInfo from "./CustomerInfo";
import { useParams, useLocation, Navigate } from "react-router-dom";
import PaymentScreen from "./PaymentMethod";
import BookingConfirmed from "./BookingConfirmed";

import { Context } from "../../contexts/contexts";

const PaymentPage = () => {
  const { setPage } = useContext(Context);

  useEffect(() => {
    setPage("Payment");
  }, []);
  const step = useParams().step;
  const [_userInfo, setUserInfo] = useState({
    idCard: "",
    fullname: "",
    address: "",
    tel: "",
    email: "",
    note: "",
  });

  return (
    <PageContainer>
      <ProgressBar step={step} />
      {step == "1" && (
        <CustomerInfo _userInfo={_userInfo} setUserInfo={setUserInfo} />
      )}
      {step == "2" && <PaymentScreen _userInfo={_userInfo} />}
      {step == "3" && <BookingConfirmed _userInfo={_userInfo} />}
    </PageContainer>
  );
};

export default PaymentPage;
