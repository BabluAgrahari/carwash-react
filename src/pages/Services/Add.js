import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Add() {
  const [inputs, setInputs] = useState([]);
  const [vehicleBrands, setBrand] = useState([]);
  const [vehicleModals, setModal] = useState([]);
  const [categories, setCategory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    vehicleBrancd();
    vehicleModal();
    category();
  }, []);

  //for vehical brand
  const vehicleBrancd = async () => {
    await http.get("vehicle-brand").then((res) => {
      setBrand(res.data.data);
    });
  };

  //for vehical modal
  const vehicleModal = async () => {
    await http.get("vehicle-modal").then((res) => {
      setModal(res.data.data);
    });
  };

  //for vehical modal
  const category = async () => {
    await http.get("category").then((res) => {
      setCategory(res.data.data);
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
    http.post("services", inputs).then((res) => {
      let response = res.data;
      Swal.fire(
        `${response.status}`,
        `${response.message}`,
        `${response.status}`
      );
      if (response.status == "success") {
        setTimeout(() => {
          Swal.close();
          navigate("/services");
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
                    <h3 className="card-title">Add Services</h3>
                    <div className="card-tools"></div>
                  </div>

                  <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Title</label>
                            <input
                              type="text"
                              id="tilte"
                              name="title"
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter Title"
                            />
                          </div>

                          <div className="form-group">
                            <label>Sort Description</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              id="sort_description"
                              name="sort_description"
                              placeholder="Enter Sort Description"
                              onChange={handleChange}
                            ></textarea>
                          </div>

                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              className="form-control"
                              rows="5"
                              id="description"
                              name="description"
                              placeholder="Enter Full Description"
                              onChange={handleChange}
                            ></textarea>
                          </div>

                          <div className="form-group">
                            <label>Video</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="video"
                                name="video"
                                onChange={handleChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Icon</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="icon"
                                name="icon"
                                onChange={handleChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Multiple Images</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="multiple_images"
                                name="multiple_images"
                                onChange={handleChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Category</label>
                                <select
                                  name="category"
                                  onChange={handleChange}
                                  id="category"
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  {categories &&
                                    categories.map((category, index) => (
                                      <option value={category._id}>
                                        {category.name}
                                      </option>
                                    ))}
                                </select>
                              </div>

                              <div className="form-group">
                                <label>Vehicle Brand</label>
                                <select
                                  name="vehicle_brand"
                                  onChange={handleChange}
                                  id="vehicle_brand"
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  {vehicleBrands &&
                                    vehicleBrands.map((v_brand, index) => (
                                      <option value={v_brand._id}>
                                        {v_brand.name}
                                      </option>
                                    ))}
                                </select>
                              </div>

                              <div className="form-group">
                                <label>Time Duration</label>
                                <input
                                  type="datetime"
                                  className="form-control"
                                  id="time_duration"
                                  name="time_duration"
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="form-group">
                                <label>Discount</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="discount"
                                  placeholder="Discount"
                                  name="discount"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Service Type</label>
                                <select
                                  name="service_type"
                                  onChange={handleChange}
                                  id="service_type"
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  <option value="Service at Home/Service Pickup">
                                    Service at Home/Service Pickup
                                  </option>
                                  <option value="Drop/Service at Service Point">
                                    Drop/Service at Service Point
                                  </option>
                                </select>
                              </div>

                              <div className="form-group">
                                <label>Vehicle Modal</label>
                                <select
                                  name="vehicle_model"
                                  onChange={handleChange}
                                  id="vehicle_model"
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  {vehicleModals &&
                                    vehicleModals.map((v_modal, index) => (
                                      <option value={v_modal._id}>
                                        {v_modal.name}
                                      </option>
                                    ))}
                                </select>
                              </div>

                              <div className="form-group">
                                <label>Service Charges</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="service_charge"
                                  name="service_charge"
                                  placeholder="Service Charges"
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="form-group">
                                <label>GST Charges</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="gst_charges"
                                  name="gst_charges"
                                  placeholder="GST Charges"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
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

                        <div className="col-md-12">
                          <div className="form-group text-center">
                            <input
                              type="submit"
                              value="Save"
                              className="btn btn-success"
                            />
                            <Link
                              to="/services"
                              className="ml-2 btn btn-warning"
                            >
                              <i class="far fa-hand-point-left"></i>&nbsp;Back
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
