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

  const [addNew, setNew] = useState(false);

  function addMore() {
    setNew(true);
  }

  function hideAdd() {
    setNew(false);
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
      {console.log(timeSlaps)}
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
                        <i class="fas fa-plus"></i>&nbsp;Add
                      </Link>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      {timeSlaps &&
                        timeSlaps.map((time, indes) => (
                          <div className="col-md-6 card py-2">
                            <div className="row">
                              <div className="col-md-6">
                                <b>{time.day}</b>
                              </div>
                              <div className="col-md-6 text-right">
                                <a
                                  onClick={(e) => addMore()}
                                  href="javascript:void(0)"
                                  className="text-danger"
                                >
                                <i class="fas fa-plus"></i>&nbsp;<b>Add</b>
                                </a>
                              </div>
                            </div>

                            <div className="row mt-2">
                              <div className="col-md-12">
                                <table className="table table-sm border">
                                  <tr>
                                    <td>Sr.No.</td>
                                    <td>Start Time</td>
                                    <td>End Time</td>
                                    <td>No of Service</td>
                                  </tr>
                                  <tr>
                                    <td>1</td>
                                    <td>10:00</td>
                                    <td>11:00</td>
                                    <td>3</td>
                                  </tr>
                                </table>
                              </div>
                            </div>

                            {addNew && (
                              <div className="row">
                                <div className="col-md-12">
                                  <form method="post">
                                    <div className="form-row">
                                      <div className="form-group col-md-3">
                                        <label>Start Time</label>
                                        <input
                                          type="time"
                                          className="form-control form-control-sm"
                                          palceholder="Start Time"
                                          name="start_time"
                                        />
                                      </div>

                                      <div className="form-group col-md-3">
                                        <label>End Time</label>
                                        <input
                                          type="time"
                                          className="form-control form-control-sm"
                                          palceholder="End Time"
                                          name="end_time"
                                        />
                                      </div>

                                      <div className="form-group col-md-3">
                                        <label>No of Services</label>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          placeholder="No of Services"
                                          name="no_of_services"
                                        />
                                      </div>

                                      <div className="form-group col-md-1 mt-4">
                                        <input
                                          type="submit"
                                          value="save"
                                          className="btn btn-success btn-sm"
                                        />
                                      </div>
                                      <div className="form-group col-md-1 mt-4">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm btn-danger"
                                          onClick={(e) => hideAdd()}
                                        >
                                          Cancel
                                        </a>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            )}
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
