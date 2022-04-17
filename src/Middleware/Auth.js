import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function Auth(props) {
  let Component = props.component;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
    }
  });
  return (
    <>
      <Component />
    </>
  );
}
export default Auth;
