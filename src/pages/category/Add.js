import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import { getToken } from "../../token";

export default function Add() {
  const initialState = { alt: "", src: "" };
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);
  const [icons, setIcon] = useState([]);
  const [inputsError, setError] = useState([]);
  const [{ alt, src }, setPreview] = useState(initialState);

  const handleInput = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
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
  function submit(e) {
    e.preventDefault();
    const inputsV = new FormData();
    inputsV.append("icon", icons.icon?icons.icon:'')
    inputsV.append("name", inputs.name?inputs.name:'');
    inputsV.append("status", inputs.status?inputs.status:'');

    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    http.post("category", inputsV, { headers }).then((res) => {
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
          navigate("/category");
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
                    <h3 className="card-title">Add Category</h3>
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
                            <label>Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Enter Name"
                              onChange={handleInput}
                              id="name"
                              value={inputs.name}
                            />
                            <span className="text-danger">
                              {inputsError.name}
                            </span>
                          </div>

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

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Icon</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="icon"
                                name="icon"
                                // ref={inputRef}
                                onChange={handleImage}
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
                        </div>

                        <div className="col-md-3">
                          {src && (
                            <img className="preview" src={src} alt={alt} />
                          )}
                        </div>

                        <div className="col-md-12">
                          <div className="form-group text-center">
                            <input
                              type="submit"
                              value="Save"
                              className="btn btn-success"
                            />
                            <Link
                              to="/category"
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
