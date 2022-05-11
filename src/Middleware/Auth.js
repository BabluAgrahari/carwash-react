import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function Auth(props) {

  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("userData"))
  let Component = props.component;
  let roles = props.role;
  let role = userData !== null ? userData.user.role : 0;
  console.log(role);
  if (roles.indexOf(role) >= 0) {
  } else {
    navigate("/");
  }

  useEffect(() => {
    if (!sessionStorage.getItem("userData")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Component />
    </>
  );
}
export default Auth;
