import React, { Component } from 'react';
import Header from "./layouts/Header";
import Menu from "./layouts/Menu";
import Footer from "./layouts/Footer";

export default class Dashboard extends Component {
  render() {
    return (<>
      <Header></Header>
      <Menu></Menu>
      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h3 className="m-0">Dashboard </h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">

            <div className="row">
              <div className="col-lg-3 col-6">

                <div className="small-box">
                  <div className="inner">
                    <h4>150</h4>
                    <p>Total Booking</p>
                  </div>
                  <div className="icon">
                   <i class="nav-icon fab fa-first-order"></i>
                  </div>

                </div>
              </div>

              <div className="col-lg-3 col-6">

                <div className="small-box">
                  <div className="inner">
                    <h4>53</h4>
                    <p>Total Service</p>
                  </div>
                  <div className="icon">
                   <i class="nav-icon fas fa-concierge-bell"></i>
                  </div>

                </div>
              </div>

              <div className="col-lg-3 col-6">

                <div className="small-box">
                  <div className="inner">
                    <h4>44</h4>
                    <p>Total User</p>
                  </div>
                  <div className="icon">
                   <i class="nav-icon fas fa-solid fa-users"></i>
                  </div>

                </div>
              </div>

              <div className="col-lg-3 col-6">

                <div className="small-box">
                  <div className="inner">
                    <h4>65</h4>
                    <p>Total Shopowner</p>
                  </div>
                  <div className="icon">
                   <i class="nav-icon fas fa-store-alt"></i>
                  </div>

                </div>
              </div>

            </div>


          </div>
        </section>
        {/* /.content */}
      </div>
      <Footer></Footer>
    </>

    )
  }
}
