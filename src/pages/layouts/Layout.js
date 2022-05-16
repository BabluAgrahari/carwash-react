import React from "react";
import Dashboard from "../Dashboard";
import RSidebar from "./RSidebar";
import Sidebar from "./RSidebar";

class Layout extends React.Component {
  render() {
    return (
      <>
        <div className="hold-transition  sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
          <div className="wrapper">
            {/* */}
            {/* <!-- Navbar --> */}
            <nav className="main-header navbar navbar-expand navbar-light">
              {/* <!-- Left navbar links --> */}
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-widget="pushmenu"
                    href="#"
                    role="button"
                  >
                    <i className="fas fa-bars"></i>
                  </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                  <a href="index3.html" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                  <a href="#" className="nav-link">
                    Contact
                  </a>
                </li>
              </ul>

              {/* <!-- Right navbar links --> */}
              <ul className="navbar-nav ml-auto">
                {/* <!-- Navbar Search --> */}
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-widget="navbar-search"
                    href="#"
                    role="button"
                  >
                    <i className="fas fa-search"></i>
                  </a>
                  <div className="navbar-search-block">
                    <form className="form-inline">
                      <div className="input-group input-group-sm">
                        <input
                          className="form-control form-control-navbar"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-navbar" type="submit">
                            <i className="fas fa-search"></i>
                          </button>
                          <button
                            className="btn btn-navbar"
                            type="button"
                            data-widget="navbar-search"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-widget="fullscreen"
                    href="#"
                    role="button"
                  >
                    <i className="fas fa-expand-arrows-alt"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-widget="control-sidebar"
                    data-slide="true"
                    href="#"
                    role="button"
                  >
                    <i className="fas fa-th-large"></i>
                  </a>
                </li>
              </ul>
            </nav>

            <aside className="main-sidebar sidebar-dark-primary elevation-4 bg-custom-sidebar">
              <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                  <div className="image">
                    <img
                      src="{{ asset('assets') }}/profile/37.jpg"
                      className="img-circle elevation-2"
                      alt="User Image"
                    />
                  </div>

                  <div className="info">
                    <a href="javascript:void(0);" className="d-block"></a>
                  </div>
                </div>
 <RSidebar></RSidebar>
              </div>
            </aside>


            <div className="content-wrapper">
              <section className="content bg-white">
                <div className="container-fluid">
                  <Dashboard></Dashboard>
                </div>
              </section>
            </div>

            <footer className="main-footer">
              <strong>
                Copyright &copy; 2014-2021{" "}
                <a href="https://adminlte.io">AdminLTE.io</a>.
              </strong>
              All rights reserved.
              <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.2.0-rc
              </div>
            </footer>
          </div>
        </div>
      </>
    );
  }
}

export default Layout;
