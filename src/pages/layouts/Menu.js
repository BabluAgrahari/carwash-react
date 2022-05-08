import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { permission} from "../../Helper/Helper";

export default class Menu extends Component {
  render() {
    return (
      <div>
        <aside className="main-sidebar elevation-4 bg-custom-sidebar">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link nl-4">
            <img
              src={`${process.env.PUBLIC_URL}/asset/logo/logo.png`}
              alt="carwash Logo"
              className="brand-image elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                <img
                  src="http://www.theserv.in/assets/images/logo/logo.png"
                  alt="carwash Logo"
                  className="brand-image elevation-3"
                  style={{ opacity: ".8",width: "90px !important;" }}
                />
              </div>
            </div>
<hr style={{background: "#2fc296;"}} /> */}
            <nav className="mt-4">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {permission(["admin", "vendor"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/dashboard"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fas fa-tachometer-alt text-danger"></i>
                      <p>Dashboard</p>
                    </NavLink>
                  </li>
                )}


                 {permission(["admin", "vendor"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/profile"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fas fa-solid fa-id-badge"></i>
                      <p>Profile</p>
                    </NavLink>
                  </li>
                )}


                {permission(["admin"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/category"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fas fa-band-aid"></i>
                      <p>Category</p>
                    </NavLink>
                  </li>
                )}
                {permission(["admin"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/vehicle-brand"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fas fa-car-side"></i>
                      <p>Vehicle Brand</p>
                    </NavLink>
                  </li>
                )}
                {permission(["admin"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/vehicle-modal"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fas fa-car-alt"></i>
                      <p>Vehicle Modal</p>
                    </NavLink>
                  </li>
                )}
                {permission(["admin"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/services"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fas fa-concierge-bell"></i>
                      <p>Services</p>
                    </NavLink>
                  </li>
                )}
                {permission(["admin"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/shop-owner"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fas fa-store-alt"></i>
                      <p>Shop Owner</p>
                    </NavLink>
                  </li>
                )}
                {permission(["admin"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/booking"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fab fa-first-order"></i>
                      <p>Booking</p>
                    </NavLink>
                  </li>
                )}

                {permission(["vendor"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/driver"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fas fa-car-alt"></i>
                      <p>Driver</p>
                    </NavLink>
                  </li>
                )}

                {permission(["vendor"]) && (
                  <li className="nav-item">
                    <NavLink
                      to="/vendor-services"
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i class="nav-icon fas fa-concierge-bell"></i>
                      <p>Services</p>
                    </NavLink>
                  </li>
                )}

                {/* <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-book" />
                    <p>
                      Pages
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a
                        href="pages/examples/invoice.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Invoice</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/examples/profile.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Profile</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/examples/e-commerce.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>E-commerce</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/examples/projects.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Projects</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/examples/project-add.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Project Add</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/examples/project-edit.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Project Edit</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/examples/project-detail.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Project Detail</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/examples/contacts.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Contacts</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="pages/examples/faq.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>FAQ</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages/examples/contact-us.html"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Contact us</p>
                      </a>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
