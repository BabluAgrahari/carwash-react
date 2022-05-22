import React, { useEffect, useState } from "react";
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
  const [vehicleModals, setModal] = useState([]);
  const [categories, setCategory] = useState([]);
  const [totalCharges, setTotalCharges] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken() !== "") {
      service();
      vehicleBrancd();
      vehicleModal();
      category();
    }
  }, [getToken()]);

  //for vehical brand
  const vehicleBrancd = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("vehicle-brand", { headers }).then((res) => {
      setBrand(res.data.data);
    });
  };

  //for vehical modal
  const vehicleModal = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("vehicle-modal", { headers }).then((res) => {
      setModal(res.data.data);
    });
  };

  //for vehical modal
  const category = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("category", { headers }).then((res) => {
      setCategory(res.data.data);
    });
  };

  const service = () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    http.get("/services/" + id, { headers }).then((res) => {
      let response = res.data.data;
      setInputs({
        title: response.title,
        sort_description: response.sort_description,
        description: response.description,
        category: response.category,
        time_duration: response.time_duration,
        discount: response.discount,
        service_type: response.service_type,
        vehicle_model: response.vehicle_model,
        service_charge: response.service_charge,
        gst_charges: response.gst_charges,
        total_charges: response.total_charges,
        vehicle_brand: response.vehicle_brand,
        status: response.status,
      });
    });
  };

  const handleKeyup = (e) => {
    e.persist();

    let service_charge = $("#service_charge").val();
    let discount = $("#discount").val() ? $("#discount").val() : 100;
    let gst_charges = $("#gst_charges").val() ? $("#gst_charges").val() : 0;

    let perVal = (service_charge * discount) / 100;
    setTotalCharges((parseInt(service_charge) - parseInt(perVal)) + parseInt(gst_charges));
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //for submit data in collection
  async function submit(e) {
    e.preventDefault();

    const inputsV = new FormData();
    inputsV.append("icon", icon.icon ? icon.icon : "");
    inputsV.append("title", inputs.title ? inputs.title : "");
    inputsV.append("sort_description", inputs.sort_description ? inputs.sort_description : "");
    inputsV.append("description", inputs.description ? inputs.description : "");
    inputsV.append("video", inputs.video ? inputs.video : "");
    inputsV.append("category", inputs.category ? inputs.category : "");
    inputsV.append("vehicle_brand",inputs.vehicle_brand ? inputs.vehicle_brand : "");
    inputsV.append("vehicle_model",inputs.vehicle_model ? inputs.vehicle_model : "");
    inputsV.append("discount", inputs.discount ? inputs.discount : "");
    inputsV.append("service_charge",inputs.service_charge ? inputs.service_charge : "");
    inputsV.append("gst_charges", inputs.gst_charges ? inputs.gst_charges : "");
    inputsV.append("total_charges", inputs.total_charges ? inputs.total_charges : "");
    inputsV.append("service_type",inputs.service_type ? inputs.service_type : "" );
    inputsV.append("status", inputs.status ? inputs.status : "");
     inputsV.append("_method", "put");

    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    http.post("services/" + id, inputsV, { headers }).then((res) => {
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
                    <h3 className="card-title">Edit Vehicle Modal</h3>
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
                              value={inputs.title}
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
                            >
                              {inputs.sort_description}
                            </textarea>
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
                            >
                              {inputs.description}
                            </textarea>
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
                                  value={inputs.category}
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
                                  value={inputs.vehicle_brand}
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
                                <label>Service Charges</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="service_charge"
                                  name="service_charge"
                                  placeholder="Service Charges"
                                  onChange={handleChange}
                                   onKeyUp={handleKeyup}
                                  value={inputs.service_charge}
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
                                   onKeyUp={handleKeyup}
                                  value={inputs.gst_charges}
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
                                  value={inputs.service_type}
                                >
                                  <option value="">Select</option>
                                  <option value="1">
                                    Service at Home
                                  </option>
                                  <option value="2">
                                    Service at Service Point
                                  </option>
                                   <option value="3">
                                    Pickup & Drop
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
                                  value={inputs.vehicle_model}
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
                                <label>Discount (in %)</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="discount"
                                  placeholder="Discount In (%)"
                                  name="discount"
                                  onChange={handleChange}
                                  onKeyUp={handleKeyup}
                                  value={inputs.discount}
                                />
                              </div>

                              <div className="form-group">
                                <label>Total Charges</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="total_charges"
                                  readOnly={true}
                                  placeholder="Total Charges"
                                  name="total_charges"
                                  value={
                                    totalCharges
                                      ? totalCharges
                                      : inputs.total_charges
                                  }
                                  onChange={handleChange}
                                />
                                <span className="text-danger"></span>
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
                              value={inputs.status}
                            >
                              <option value="">Select</option>
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
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
                              to="/services"
                              className="ml-2 btn btn-warning"
                            >
                              <i className="far fa-hand-point-left"></i>
                              &nbsp;Back
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
