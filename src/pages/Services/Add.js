import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Add() {
  const initialState = { alt: "", src: "" };
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);
  const [icon, setIcon] = useState([]);
  const [video, setVideo] = useState([]);

  const [{ alt, src }, setPreview] = useState(initialState);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    setSelectedFiles([]);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img className="preview" src={photo} />;
    });
  };

  const [vehicleBrands, setBrand] = useState([]);
  const [vehicleModals, setModal] = useState([]);
  const [categories, setCategory] = useState([]);
  const [inputsError, setError] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof sessionStorage.getItem("userData") !== "undefined") {
      setToken(JSON.parse(sessionStorage.getItem("userData")).token);
      vehicleBrancd();
      vehicleModal();
      category();
    }
  }, [token]);

  //for vehical brand
  const vehicleBrancd = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await http.get("vehicle-brand", { headers }).then((res) => {
      setBrand(res.data.data);
    });
  };

  //for vehical modal
  const vehicleModal = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await http.get("vehicle-modal", { headers }).then((res) => {
      setModal(res.data.data);
    });
  };

  //for vehical modal
  const category = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await http.get("category", { headers }).then((res) => {
      setCategory(res.data.data);
    });
  };

  const handleInput = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleVideo = (e) => {};

  const handleIcon = (e) => {
    setIcon({ icon: e.target.files[0] });
    const { files } = e.target;
    setPreview(
      files.length
        ? {
            src: URL.createObjectURL(files[0]),
            alt: files[0].name,
          }
        : initialState
    );
  };

  //for submit data in collection
  async function submit(e) {
    e.preventDefault();
    var files = e.target[0].files;
    console.log(files);
    const inputsV = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   inputsV.append("multiple_images[]", files[i]);
    // }
    inputsV.append("icon", icon.icon?icon.icon:'');
    inputsV.append("title", inputs.title?inputs.title:'');
    inputsV.append("sort_description", inputs.sort_description?inputs.sort_description:'');
    inputsV.append("description", inputs.description?inputs.description:'');
    inputsV.append("video", inputs.video?inputs.video:'');
    inputsV.append("category", inputs.category?inputs.category:'');
    inputsV.append("vehicle_brand", inputs.vehicle_brand?inputs.vehicle_brand:'');
    inputsV.append("vehicle_model", inputs.vehicle_model?inputs.vehicle_model:'');
    inputsV.append("time_duration", inputs.time_duration?inputs.time_duration:'');
    inputsV.append("discount", inputs.discount?inputs.discount:'');
    inputsV.append("service_charge", inputs.service_charge?inputs.service_charge:'');
    inputsV.append("gst_charges", inputs.gst_charges?inputs.gst_charges:'');
    inputsV.append("service_type", inputs.service_type?inputs.service_type:'');
    inputsV.append("status", inputs.status?inputs.status:'');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    http.post("services", inputsV, { headers }).then((res) => {
      let response = res.data;

      if (response.type == "validation") {
        let errors = response.message;
        Object.keys(errors).map((error, index) =>
          setError({ ...inputsError, [error]: errors[error][0] })
        );
        return false;
      }

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
    {console.log(inputsError.title)}
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
                    <form
                      onSubmit={(e) => submit(e)}
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Title</label>
                            <input
                              type="text"
                              id="tilte"
                              name="title"
                              onChange={handleInput}
                              className="form-control"
                              placeholder="Enter Title"
                            />
                             <span className="text-danger">
                              {inputsError.title}
                            </span>
                          </div>

                          <div className="form-group">
                            <label>Sort Description</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              id="sort_description"
                              name="sort_description"
                              placeholder="Enter Sort Description"
                              onChange={handleInput}
                            ></textarea>
                             <span className="text-danger">
                              {inputsError.sort_description}
                            </span>
                          </div>

                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              className="form-control"
                              rows="5"
                              id="description"
                              name="description"
                              placeholder="Enter Full Description"
                              onChange={handleInput}
                            ></textarea>
                             <span className="text-danger">
                              {inputsError.description}
                            </span>
                          </div>

                          <div className="form-group">
                            <label>Video</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="video"
                                name="video"
                                onChange={handleVideo}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                Choose file
                              </label>
                            </div>
                             <span className="text-danger">
                              {inputsError.video}
                            </span>
                          </div>

                          <div className="form-group">
                            {src && (
                              <img className="preview" src={src} alt={alt} />
                            )}
                          </div>
                          <div className="form-group">
                            <label>Icon</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="icon"
                                name="icon"
                                onChange={handleIcon}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                Choose file
                              </label>
                            </div>
                             <span className="text-danger">
                              {inputsError.icon}
                            </span>
                          </div>

                          <div className="form-group">
                            {renderPhotos(selectedFiles)}
                          </div>
                          <div className="form-group">
                            <label>Multiple Images</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                multiple="true"
                                className="custom-file-input"
                                id="multiple_images"
                                name="multiple_images[]"
                                onChange={handleImageChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                Choose file
                              </label>
                            </div>
                             <span className="text-danger">
                              {inputsError.multiple_images}
                            </span>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Category</label>
                                <select
                                  name="category"
                                  onChange={handleInput}
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
                                   <span className="text-danger">
                              {inputsError.category}
                            </span>
                              </div>

                              <div className="form-group">
                                <label>Vehicle Brand</label>
                                <select
                                  name="vehicle_brand"
                                  onChange={handleInput}
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
                                   <span className="text-danger">
                              {inputsError.vehicle_brand}
                            </span>
                              </div>

                              <div className="form-group">
                                <label>Time Duration</label>
                                <input
                                  type="datetime"
                                  className="form-control"
                                  id="time_duration"
                                  name="time_duration"
                                  onChange={handleInput}
                                />
                                   <span className="text-danger">
                              {inputsError.time_duration}
                            </span>
                              </div>

                              <div className="form-group">
                                <label>Discount</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="discount"
                                  placeholder="Discount"
                                  name="discount"
                                  onChange={handleInput}
                                />
                                   <span className="text-danger">
                              {inputsError.discount}
                            </span>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Service Type</label>
                                <select
                                  name="service_type"
                                  onChange={handleInput}
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
                                   <span className="text-danger">
                              {inputsError.service_type}
                            </span>
                              </div>

                              <div className="form-group">
                                <label>Vehicle Modal</label>
                                <select
                                  name="vehicle_model"
                                  onChange={handleInput}
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
                                   <span className="text-danger">
                              {inputsError.vehicle_model}
                            </span>
                              </div>

                              <div className="form-group">
                                <label>Service Charges</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="service_charge"
                                  name="service_charge"
                                  placeholder="Service Charges"
                                  onChange={handleInput}
                                />
                                   <span className="text-danger">
                              {inputsError.service_charge}
                            </span>
                              </div>

                              <div className="form-group">
                                <label>GST Charges</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="gst_charges"
                                  name="gst_charges"
                                  placeholder="GST Charges"
                                  onChange={handleInput}
                                />
                                   <span className="text-danger">
                              {inputsError.gst_charges}
                            </span>
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Status</label>
                            <select
                              name="status"
                              onChange={handleInput}
                              id="status"
                              className="form-control"
                            >
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
                               <span className="text-danger">
                              {inputsError.status}
                            </span>
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
