import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user-info"));
  function logout() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>

        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}

          <li className="nav-item dropdown mr-5">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <span>
                <i className="far fa-user" />
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              {/* <a href="javascript:void(0);" className="pro-li dropdown-item">
                <span>
                  <img
                    className="profile-small img-fluid img-circle"
                    id
                    src="/profile/37.jpg"
                    alt="User profile picture"
                  />
                </span>
              </a> */}
              {/* <a
                href="{{ url('admin/profile') }}"
                className="pro-li dropdown-item"
              >
                <span>
                  <i className="far fa-user" />
                </span>
                Profile
              </a> */}
              <a className="dropdown-item" href="" onClick="">
                <button
                  onClick={logout}
                  className="btn btn-danger logout-button w-100"
                >
                  <span className="icon is-small">
                    <i data-feather="log-out" />
                  </span>
                  <span>Logout</span>
                </button>
              </a>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
}
export default Header;
