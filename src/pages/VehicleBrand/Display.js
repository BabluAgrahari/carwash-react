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
  const [vehicles, setVehicles] = useState([]);

  //for show list of data
  useEffect(() => {
    if (getToken() !== '') {
      vehiclesList();
    }
  }, [getToken()]);
  const vehiclesList = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`
    }
    await http.get("vehicle-brand", { headers }).then((res) => {
      setVehicles(res.data.data);
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
        http.delete("vehicle-brand/" + id, { headers }).then((res) => {
          let response = res.data;
          Swal.fire("Deleted!", `${response.message}`, `${response.status}`);
          categoryList();
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
                    <h3 className="card-title">Vehicle Brand List</h3>
                    <div className="card-tools">
                      <Link
                        to="/vehicle-brand/add"
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
                        <th>Name</th>
                        <th>Status</th>
                        <th>CreatetAt</th>
                        <th>Action</th>
                      </tr>
                      {vehicles &&
                        vehicles.map((vehicle, index) => (

                          <tr>
                            <td>{++index}</td>
                            <td>{<img src={vehicle.icon ? vehicle.icon : process.env.PUBLIC_URL + "asset/img/noimage.jpg"} className="custom-img-size" />}</td>
                            <td>{vehicle.name}</td>
                            <td>{vehicle.status}</td>
                            <td>{vehicle.created}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/vehicle-brand/edit/" + vehicle._id,
                                }}
                                className="text-info mr-2"
                              >
                                <i class="fas fa-edit"></i>
                              </Link>
                              <a
                                href="javascript:void(0);"
                                onClick={() => remove(category._id)}
                                className="text-danger"
                              >
                                <i class="fas fa-trash-alt"></i>
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
