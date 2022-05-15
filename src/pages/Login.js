import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../token";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setMsg] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userData")) {
      navigate("/dashboard");
    }
  }, []);

  var url = "http://127.0.0.1:8000/api/login";
  // var url = "https://crm.quarainfotech.com/api/public/api/login";
  async function login() {
    setLoader(true);
    let item = { email, password };
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    setLoader(false);
    if (result.status) {
      setToken(result.access_token)
      sessionStorage.setItem(
        "userData",
        JSON.stringify({
          login: true,
          user: result.user,
          token: result.access_token,
        })
      );
    } else {
      setMsg({
        msg: result.message,
      });
    }

    var userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData && userData.token) {
      navigate("/dashboard");
    }
  }
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="">
            <img
              src={`${process.env.PUBLIC_URL}/asset/logo/logo.png`}
              style={{ width: "145px" }}
            ></img>
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <p className="login-box-msg text-danger">{errorMsg.msg}</p>
            {/*
            <form action="../../index3.html" method="post"> */}
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  disabled={loader && true || false}
                  type="button"
                  onClick={login}
                  className="btn btn-block sign-in"
                >
                  {loader && (
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) || 'Sign In'}

                </button>
              </div>
            </div>
            {/* </form> */}

            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            {/* <p className="mb-0">
              <a href="register.html" className="text-center">
                Register a new membership
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
