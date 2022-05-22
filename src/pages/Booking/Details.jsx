import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Details() {
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
                    <div className="card-tools"><Link to="/booking" className="btn btn-sm btn-danger"><i class="far fa-hand-point-left"></i>&nbsp;Back</Link></div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-md-2">
                        <label>Vendor List</label>
                        <select
                          name="Vendor"
                          className="form-control form-control-sm"
                        >
                          <option value="">All</option>
                        </select>
                      </div>

                      <div className="form-group col-md-2">
                        <label>Date Range</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                        />
                      </div>

                      <div className="form-group col-md-2">
                        <label>Payment Status</label>
                        <select
                          name="payment_status"
                          className="form-control form-control-sm"
                        >
                          <option value="">All</option>
                          <option value="paid">Paid</option>
                          <option value="unpaid">Unpaid</option>
                        </select>
                      </div>

                      <div className="form-group col-md-2 mt-4">
                        <input
                          type="submit"
                          className="btn btn-success btn-sm"
                          value={"Search"}
                        />
                      </div>

                      <table className="table table-sm">
                          <th>Sr.no</th>
                          <th>Booking No</th>
                          <th>Payment Status</th>
                      </table>
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
