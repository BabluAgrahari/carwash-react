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
  const [{ alt, src }, setPreview] = useState(initialState);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputsError, setError] = useState([]);
  const [token, setToken] = useState("");

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

  useEffect(() => {
    if (typeof sessionStorage.getItem("userData") !== "undefined") {
      setToken(JSON.parse(sessionStorage.getItem("userData")).token);

    }
  }, [token]);

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
    const inputsV = new FormData();
    // for (let i = 0; i < selectedFiles.length; i++) {
    //   inputsV.append("multiple_images[]", selectedFiles[i]);
    // }
    inputsV.append("icon", icon.icon ? icon.icon : "");
    inputsV.append("title", inputs.title ? inputs.title : "");
    inputsV.append("description", inputs.description ? inputs.description : "");
    inputsV.append("video_url", inputs.video_url ? inputs.video_url : "");
    inputsV.append("service_type",inputs.service_type ? inputs.service_type : "");
    inputsV.append("status", inputs.status ? inputs.status : "");

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
                            <label>Video URL</label>
                            <input
                              type="text"
                              placeholder="Enter Video URL"
                              className="form-control"
                              id="video_url"
                              name="video_url"
                              onChange={handleVideo}
                            />
                            <span className="text-danger">
                              {inputsError.video}
                            </span>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
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
                                  <option value="1">Service at Home</option>
                                  <option value="2">
                                    Service at Service Point
                                  </option>
                                  <option value="3">Pickup & Drop</option>
                                </select>
                                <span className="text-danger">
                                  {inputsError.service_type}
                                </span>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div className="form-group">
                                <label>Status</label>
                                <select
                                  name="status"
                                  onChange={handleInput}
                                  id="status"
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  <option value="1">Active</option>
                                  <option value="0">Inactive</option>
                                </select>
                                <span className="text-danger">
                                  {inputsError.status}
                                </span>
                              </div>
                            </div>

                            <div className="form-group">
                              {src && (
                                <img className="preview" src={src} alt={alt} />
                              )}
                            </div>
                            <div className="form-group col-md-12">
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

                            <div className="form-group col-md-12">
                              {renderPhotos(selectedFiles)}
                            </div>
                            <div className="form-group col-md-12">
                              <label>Multiple Images</label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  multiple={true}
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
