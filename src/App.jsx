import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import PageLoader from "./components/Loaders/PageLoader";
import { Paths } from "./constants";
import RoomsPage from "./pages/RoomPage/RoomsPage";
import HomePage from "./pages/HomePage/HomePage";
import { Context } from "./contexts/contexts";
import { RoomListModalToggle } from "./components/RoomListModal/useRoomListToggle";
import PaymentPage from "./pages/Payment/PaymentPage";

function App() {
  const [_page, setPage] = useState("Home");

  return (
    <Context.Provider value={{ setPage }}>
      <RoomListModalToggle>
        <div className="App">
          <ToastContainer />
          <Router>
            <Header page={_page} />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path={Paths.home} element={<HomePage />} />
                <Route path={Paths.room} element={<RoomsPage />} />
                <Route
                  path={`${Paths.payment}/:step`}
                  element={<PaymentPage />}
                />
              </Routes>
            </Suspense>
          </Router>
        </div>
      </RoomListModalToggle>
    </Context.Provider>
  );
}

export default App;
