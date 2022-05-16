import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import { getToken } from "../../token";

export default function Edit(props) {
  const [inputs, setInputs] = useState([]);
  const [vehicleBrands, setBrand] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if (getToken() !== '') {
      fetchCatgory();
      vehicleBranchs();
    }
  }, [getToken()]);

  const vehicleBranchs = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`
    }
    await http.get("vehicle-brand", { headers }).then((res) => {
      setBrand(res.data.data);
    });
  };


  const fetchCatgory = () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`
    }
    http.get("/vehicle-modal/" + id, { headers }).then((res) => {
      // console.log(res.data.data);
      setInputs({
        name: res.data.data.name,
        vehicle_brand: res.data.data.vehicle_brand,
        status: res.data.data.status,
      });
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // const status = event.target.status;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //for submit data in collection
  function submit(e) {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${getToken()}`
    }
    http.put("vehicle-modal/" + id, inputs, { headers }).then((res) => {
      let response = res.data;
      Swal.fire(
        `${response.status}`,
        `${response.message}`,
        `${response.status}`
      );
      if (response.status == 'success') {
        setTimeout(() => {
          Swal.close();
          navigate("/vehicle-modal");
        }, 1000);
      }
    });
  }

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
                    <h3 className="card-title">Edit Vehicle Modal</h3>
                    <div className="card-tools"></div>
                  </div>

                  <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Enter Name"
                              onChange={handleChange}
                              id="name"
                              value={inputs.name}
                            />
                          </div>

                          <div className="form-group">
                            <label>Status</label>
                            <select
                              name="status"
                              onChange={handleChange}
                              id="status"
                              className="form-control"
                            >
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Vehicle Brand</label>
                            <select
                              name="vehicle_brand"
                              onChange={handleChange}
                              id="vehicle_brand"
                              className="form-control"
                            >
                              <option value="">Select</option>
                              {vehicleBrands && vehicleBrands.map((v_brand, index) => (
                                <option value={v_brand._id}>{v_brand.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>


                        <div className="col-md-12">
                          <div className="form-group text-center">
                            <input
                              type="submit"
                              value="Update"
                              className="btn btn-success"
                            />
                            <Link
                              to="/vehicle-modal"
                              className="ml-2 btn btn-warning"
                            >
                              <i className="far fa-hand-point-left"></i>&nbsp;Back
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
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
