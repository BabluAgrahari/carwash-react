import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function VendorServices() {
  const [services, service] = useState([]);
  const [serviceData, setServiceData] = useState({ id: "", charge: "" });
  const [discoutnData, setDiscountCharge] = useState({ discount_by_vendor: "", actual_charge: "" });
  //for show list of data
  useEffect(() => {
    if (getToken() !== '') {
      ServiceList();
    }
  }, [getToken()]);
  const ServiceList = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`
    }
    await http.get("vendor-services", { headers }).then((res) => {
      service(res.data.data);
    });
  };

  function showModal(data) {
    setServiceData(data);
    $("#exampleModalCenter").modal("show");
  }

  function discount(val) {
    let charge = (val * serviceData.charge) / 100;
    let discount_charge = Math.round(serviceData.charge - charge);
    setDiscountCharge({ 'discount_by_vendor': val, 'actual_charge': discount_charge });

  }
  //for Assign services to vendor
  function updatePrice(e) {
    e.preventDefault();
    var id = serviceData.id;
    const inputsV = new FormData();
    inputsV.append("discount_by_vendor", discoutnData.discount_by_vendor);
    inputsV.append("actual_charge", discoutnData.actual_charge);
    const headers = {
      Authorization: `Bearer ${getToken()}`
    }
    http.post("update-price/" + id, inputsV, { headers }).then((res) => {
      let response = res.data;
      Swal.fire(
        `${response.status}`,
        `${response.message}`,
        `${response.status}`
      );
      if (response.status == "success") {
        setTimeout(() => {
          Swal.close();
          $("#exampleModalCenter").modal("hide");
        }, 1000);
      }
    });
  }

  return (
    <>
      {console.log(discoutnData)}
      <Header></Header>
      <Menu></Menu>
      <div className="content-wrapper mt-2">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Services List</h3>
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
                    <table id="example1" className="table table-hover table-sm">
                      <tr>
                        <th>Sr.No</th>
                        <th>Icon</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Service Charge</th>
                        <th>Status</th>
                        <th>CreatetAt</th>
                        <th>Action</th>
                      </tr>
                      {services &&
                        services.map((service, index) => (
                          <tr>
                            <td>{++index}</td>
                            <td>
                              {
                                <img
                                  src={
                                    service.icon
                                      ? service.icon
                                      : process.env.PUBLIC_URL +
                                      "asset/img/noimage.jpg"
                                  }
                                  className="custom-img-size"
                                />
                              }
                            </td>
                            <td>{service.title}</td>
                            <td>{service.category}</td>
                            <td>{service.service_type}</td>
                            <td>{service.service_charge}</td>
                            <td>{service.status}</td>
                            <td>{service.created}</td>
                            <td>
                              <a
                                href="javascript:void(0)"
                                className="text-success mr-2"
                                title="Assign Service"
                                _id={service._id}
                                onClick={() => showModal({ 'id': service._id, 'charge': service.service_charge })}
                              >
                                <i class="fas fa-concierge-bell"></i>
                              </a>
                            </td>
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

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Service List
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => updatePrice(e)}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discount_by_vendor"
                      id="discount_by_vendor"
                      placeholder="Discount in %"
                      onChange={(e) => discount(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Actual Service Charge</label>
                    <input type="text" readOnly={true} value={discoutnData.actual_charge} className="form-control" id="actual_Charges" name="actual_charge" />
                  </div>
                </div>
                <div className="form-group text-center">
                  <input
                    type="submit"
                    className="btn btn-success btn-sm"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
