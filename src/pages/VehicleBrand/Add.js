import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Add() {
  const initialState = { alt: "", src: "" };
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);
  const [icons, setIcon] = useState([]);
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
    inputsV.append("icon", icons.icon);
    inputsV.append("name", inputs.name);
    inputsV.append("status", inputs.status);

    const headers = {
      Authorization: `Bearer ${getToken()}`
    }

    http.post("vehicle-brand", inputsV, { headers }).then((res) => {
      let response = res.data;
      Swal.fire(
        `${response.status}`,
        `${response.message}`,
        `${response.status}`
      );
      if (response.status == 'success') {
        setTimeout(() => {
          Swal.close();
          navigate("/vehicle-brand");
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
                    <h3 className="card-title">Add Vehicle Brand</h3>
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
                              onChange={handleInput}
                              id="name"
                              value={inputs.name}
                            />
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
                                onChange={handleImage}
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

                        <div className="col-md-3">
                          {src && <img className="preview" src={src} alt={alt} />}
                        </div>

                        <div className="col-md-12">
                          <div className="form-group text-center">
                            <input
                              type="submit"
                              value="Save"
                              className="btn btn-success"
                            />
                            <Link
                              to="/vehicle-brand"
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
