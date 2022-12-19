import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Company from "../../pages/Company/Company";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import ProjectCreate from "../../pages/ProjectCreate/ProjectCreate";
import ProjectID from "../../pages/ProjectID/ProjectID";
import Projects from "../../pages/Projects/Projects";
import SignUp from "../../pages/SignUp/SignUp";
import { useHomeUser } from "../../hooks";

const View = () => {
  const { data, isLoading, isError, isSuccess } = useHomeUser();

  if (!isLoading)
    return (
      <Routes>
        <Route
          path="/signup"
          element={isSuccess ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route
          path="/login"
          element={isSuccess ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/company"
          element={isSuccess ? <Company /> : <Navigate to={"/"} />}
        />
        {isError ? (
          <Route path="*" element={<Navigate to={"/login"} />} />
        ) : data.homeUser.company_id ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/create" element={<ProjectCreate />} />
            <Route path="/projects/:projectID" element={<ProjectID />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to={"/company"} />} />
        )}
      </Routes>
    );
  return <h1>Loading...</h1>;
};

export default View;
