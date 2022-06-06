import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Display() {
  const [services, service] = useState([]);

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

  const remove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const headers = {
          Authorization: `Bearer ${getToken()}`
        }
        delete ("vendor-services/" + id, { headers }).then((res) => {
          let response = res.data;
          Swal.fire("Deleted!", `${response.message}`, `${response.status}`);
          ServiceList();
          if (response.status == "success") {
            setTimeout(() => {
              Swal.close();
            }, 1000);
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
                    <h3 className="card-title">Services List</h3>
                    <div className="card-tools">
                      <Link
                        to="/vendor-services/add"
                        className="btn btn-success btn-sm"
                      >
                        <i className="fas fa-plus"></i>&nbsp;Add
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
                        <th>V.Brand</th>
                        <th>V.Modal</th>
                        <th>Description</th>
                        {/* <th>Status</th> */}
                        <th>Charges</th>
                        <th>Discount(%)</th>
                        <th>Total Charges</th>
                        <th>CreatetAt</th>
                        <th>Action</th>
                      </tr>
                      {services &&
                        services.map((service, index) => (

                          <tr>
                            <td>{++index}</td>
                            <td>{<img src={service.icon ? service.icon : process.env.PUBLIC_URL + "asset/img/noimage.jpg"} className="custom-img-size" />}</td>
                            <td>{service.title}</td>
                            <td>{service.vehicle_brand}</td>
                            <td>{service.vehicle_model}</td>
                            <td>{service.description}</td>
                            <td>{service.service_charge}</td>
                            <td>{service.discount}</td>
                            <td>{service.total_charges}</td>
                            {/* <td>{service.status}</td> */}
                            <td>{service.created}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/vendor-services/edit/" + service._id,
                                }}
                                className="text-info mr-2"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <a
                                href="javascript:void(0);"
                                onClick={() => remove(service._id)}
                                className="text-danger"
                              >
                                <i className="fas fa-trash-alt"></i>
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
      <Footer></Footer>
    </>
  );
}
