import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Display() {
  const [bookings, setBooking] = useState([]);
  const [bookingSt, setStatus] = useState([]);

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

  const bookingStatus = (status, id) => {
    setStatus(status);
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Update Booking Status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const inputsV = new FormData();
        inputsV.append("booking_status", status);
        inputsV.append("_method", "put");
        const headers = {
          Authorization: `Bearer ${getToken()}`,
        };

        http.post("booking/" + id, inputsV, { headers }).then((res) => {
          let response = res.data;
          Swal.fire(
            `${response.status}`,
            `${response.message}`,
            `${response.status}`
          );
          if (response.status == "success") {
          }
        });
      }
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
                    <h3 className="card-title">Booking List</h3>
                    <div className="card-tools">
                      {/* <Link
                        to="/booking-details"
                        className="btn btn-sm btn-success"
                      >
                        <i class="fas fa-solid fa-asterisk"></i>&nbsp;View
                      </Link> */}
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table id="example1" className="table table-hover table-sm">
                      <tr>
                        <th>Sr.No</th>
                        <th>Booking No</th>
                        <th>Customer Name</th>
                        <th>Store Name</th>
                        <th>Service</th>
                        <th>Time Slab</th>
                        <th>Booking Date</th>
                        <th>Total Amount</th>
                        <th>Payment Mode</th>
                        <th>Payment Status</th>
                        <th>Booking Status</th>
                        <th>Action</th>
                      </tr>
                      {bookings &&
                        bookings.map((booking, index) => {
                          if (booking.payment_status == "PAID") {
                            var payment_status = (
                              <span className="tag-small">PAID</span>
                            );
                          } else if (booking.payment_mode === "UNPAID") {
                            var payment_status = (
                              <span className="tag-small-danger">UNPAID</span>
                            );
                          } else {
                            var payment_status = (
                              <span className="tag-small-warning">PENDING</span>
                            );
                          }
                          return (
                            <tr>
                              <td>{++index}</td>
                              <td>{booking.booking_no}</td>
                              <td>{booking.customer_name}</td>
                              <td>{booking.vendor_name}</td>
                              <td>{booking.service_name}</td>
                              <td>{booking.time_slab}</td>
                              <td>{booking.booking_date}</td>
                              <td>{booking.total_amount}</td>
                              <td>{booking.payment_mode}</td>
                              <td>{payment_status} </td>
                              <td>
                                <select
                                  onChange={(e) =>
                                    bookingStatus(e.target.value,booking._id)
                                  }
                                  name="booking_status"
                                  className="form-control form-control-sm"
                                  value={booking.booking_status}
                                >
                                  <option value="">Select</option>
                                  <option value="pending">Pending</option>
                                  <option value="accept">Accept</option>
                                  <option value="competed">Completed</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                              </td>
                              <td>
                                <Link
                                  to="/booking-info"
                                  className="btn btn-xs btn-info"
                                >
                                  <i class="fa-solid fa-circle-info"></i>
                                  &nbsp;Info
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </table>
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
