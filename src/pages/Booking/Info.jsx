import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Info() {
  const [bookings, setBooking] = useState([]);

  //for show list of data
  useEffect(() => {
    if (getToken() !== "") {
      bookingList();
    }
  }, [getToken()]);
  const bookingList = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("booking", { headers }).then((res) => {
      setBooking(res.data.data);
    });
  };

  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="content-wrapper mt-2">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Booking Details</h3>
                    <div className="card-tools">
                      <Link to="/booking" className="btn btn-sm btn-danger">
                        <i class="far fa-hand-point-left"></i>&nbsp;Back
                      </Link>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div>
                            <h6>Booking Details</h6>
                          </div>
                          <div className="table">
                            <table className="table table-sm">
                              <tr>
                                <th>Customer Name</th>
                                <td></td>
                              </tr>
                              <tr>
                                <th>Vendor Name</th>
                                <td></td>
                              </tr>
                              <tr>
                                <th>Time Slab</th>
                                <td></td>
                              </tr>
                              <tr>
                                <th>Booking Date</th>
                                <td></td>
                              </tr>
                              <tr>
                                <th>Total Amount</th>
                                <td></td>
                              </tr>
                              <tr>
                                <th>Payment Status</th>
                                <td></td>
                              </tr>
                              <tr>
                                <th>Payment Mode</th>
                                <td></td>
                              </tr>
                              <tr>
                                <th>Booking Status</th>
                                <td></td>
                              </tr>
                            </table>
                          </div>
                        </div>

                        <div className="row">
                          <div>
                            <h6>Service Details</h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div>
                            <h6>Pickup Location</h6>
                          </div>
                        </div>

                        <div className="row">
                          <div>
                            <h6>Drop Location</h6>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
}
