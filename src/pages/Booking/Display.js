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
                    <h3 className="card-title">Booking List</h3>
                    <div className="card-tools"></div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table id="example1" className="table table-hover table-sm">
                      <tr>
                        <th>Sr.No</th>
                        <th>Booking No</th>
                        <th>Time Slab</th>
                        <th>Booking Date</th>
                        <th>Total Amount</th>
                        <th>Payment Mode</th>
                        <th>Payment Status</th>
                      </tr>
                      {bookings &&
                        bookings.map((booking, index) => (
                          <tr>
                            <td>{++index}</td>
                            <td>{booking.booking_no}</td>
                            <td>{booking.time_slab}</td>
                            <td>{booking.booking_date}</td>
                            <td>{booking.total_amount}</td>
                            <td>{booking.payment_mode}</td>
                            <td>{booking.payment_status}</td>
                          </tr>
                        ))}
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
