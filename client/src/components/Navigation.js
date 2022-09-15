import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

import {
  Start,
  Signup,
  Login,
  Home,
  CreateMenu,
  CreateTour,
  EditTour,
  EditPoi,
  Settings,
  Map,
  AllStats,
  AllPois,
  AllTours,
  ImgMenu,
  Features,
  AddTourImg,
  AddPoiImg,
  SinglePoi,
  SingleStatMenu,
  GeneralStats,
  RatingStats,
  RatingMenu,
  SingleTour,
  ReviewMenu,
  TourReview,
  ResetPassword,
  NewPassword,
  NewMPassword,
  QuizMenu,
  Quiz,
  TourContent,
} from "../pages";
import { SideBar } from "./index";

const Navigation = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {!authState.status ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/newpassword/:id" element={<NewPassword />} />
            <Route path="/newmpassword/:id" element={<NewMPassword />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <SideBar>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/createmenu" element={<CreateMenu />} />
              <Route path="/createtour" element={<CreateTour />} />
              <Route path="/singlepoi" element={<SinglePoi />} />
              <Route path="/tourcontent/:id" element={<TourContent />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/edittour/:id" element={<EditTour />} />
              <Route path="/editpoi/:id" element={<EditPoi />} />
              <Route path="/allstats" element={<AllStats />} />
              <Route path="/alltours" element={<AllTours />} />
              <Route path="/allpois" element={<AllPois />} />
              <Route path="/features" element={<Features />} />
              <Route path="/imgmenu" element={<ImgMenu />} />
              <Route path="/addtourimg/:id" element={<AddTourImg />} />
              <Route path="/addpoiimg/:id" element={<AddPoiImg />} />
              <Route path="/map/:id" element={<Map />} />
              <Route path="/singlestatmenu" element={<SingleStatMenu />} />
              <Route path="/generalstats" element={<GeneralStats />} />
              <Route path="/ratingmenu" element={<RatingMenu />} />
              <Route path="/reviewmenu" element={<ReviewMenu />} />
              <Route path="/ratingstats/:id" element={<RatingStats />} />
              <Route path="/singletour/:id" element={<SingleTour />} />
              <Route path="/tourreview/:id" element={<TourReview />} />
              <Route path="/quizmenu" element={<QuizMenu />} />
              <Route path="/quiz/:id" element={<Quiz />} />
            </Routes>
          </SideBar>
        </BrowserRouter>
      )}
    </AuthContext.Provider>
  );
};

export default Navigation;
