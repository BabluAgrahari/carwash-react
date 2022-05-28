import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Profile() {
  const [timeSlaps, setTimeSlap] = useState([]);
  const [serviceData, setServiceData] = useState({ id: "", charge: "" });
  const [discoutnData, setDiscountCharge] = useState({
    discount_by_vendor: "",
    actual_charge: "",
  });

  const [noService, setNoService] = useState([]);

  const inputfield = (e) => {
    e.persist();
    setNoService({ [e.target.name]: e.target.value });
  };

  const [counter, setCounter] = useState({});
  const incrementCounter = (index, value) => {
    console.log(counter);
    setCounter({ ...counter, [index]: (typeof counter[index] !== 'undefined' ? counter[index] : value) + 1 });
  };
  let decrementCounter = (index) => {
    setCounter({ ...counter, [index]: (typeof counter[index] !== 'undefined' ? counter[index] : value) - 1 });
  };
  if (counter == '') {
    decrementCounter = () => setCounter({ ...counter, [0]: 1 });
  }
  //for show list of data
  useEffect(() => {
    if (getToken() !== "") {
      ServiceList();
    }
  }, [getToken()]);

  const ServiceList = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("time-slap", { headers }).then((res) => {
      setTimeSlap(res.data.data);
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
                    <h3 className="card-title">User Profile</h3>
                    <div className="card-tools">
                      <Link
                        to="/services/add"
                        className="btn btn-success btn-sm"
                      >
                        <i className="fas fa-plus"></i>&nbsp;Add
                      </Link>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      {timeSlaps &&
                        timeSlaps.map((slap, index) => (
                          <div className="col-md-6 card py-2" index={index}>
                            <div className="row">
                              <div className="col-md-6">
                                <b>{slap.day}</b>
                              </div>
                              <div className="col-md-6 text-right"></div>
                            </div>

                            <div className="row mt-2">
                              <div className="col-md-12">
                                <table className="table table-sm border">
                                  <tr>
                                    <td>Sr.No.</td>
                                    <td>Start Time</td>
                                    <td>End Time</td>
                                    <td>No of Service</td>
                                    <td></td>
                                  </tr>

                                  {slap.slaps.map((Cslap, ind) => (
                                    <tr>
                                      <td>{ind}</td>
                                      <td>{Cslap.start_time}</td>
                                      <td>{Cslap.end_time}</td>
                                      <td className="w-25">
                                        <div className="form-group">
                                          <button
                                            onClick={(e) => { incrementCounter(ind, Cslap.no_of_services) }}
                                          >
                                            +
                                          </button>

                                          <input
                                            type="number"
                                            onChange={inputfield}
                                            value={
                                              counter[ind]
                                                ? counter[ind]
                                                : Cslap.no_of_services
                                            }
                                            className="form-control form-control-sm"
                                            placeholder="No of Services"
                                            name="no_of_services"
                                          />
                                          <button
                                            onClick={(e) =>
                                              decrementCounter(ind)
                                            }
                                          >
                                            -
                                          </button>
                                        </div>
                                      </td>
                                      <td>Save</td>
                                    </tr>
                                  ))}
                                </table>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer></Footer>
    </>
  );
}
