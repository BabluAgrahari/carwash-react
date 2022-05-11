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
  const initialState = {
    alt: "",
    src: process.env.PUBLIC_URL + "asset/img/noimage.jpg",
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);
  const [icons, setIcon] = useState([]);
  const [{ alt, src }, setPreview] = useState(initialState);

  //for setting input filed
  const handleInput = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //for getting img
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
  useEffect(() => {
    if (getToken() !== '') {
      fetchVehicle();
    }
  }, [getToken()]);

  const fetchVehicle = () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`
    }
    http.get("/vehicle-brand/" + id, { headers }).then((res) => {
      let response = res.data.data;
      setInputs({
        name: response.name,
        status: response.status,
      });
      setPreview({
        src: response.icon ? response.icon : process.env.PUBLIC_URL + "asset/img/noimage.jpg",
        alt: '',
      })
    });
  };

  //for submit data in collection
  function submit(e) {
    e.preventDefault();
    const inputsV = new FormData();
    inputsV.append("icon", icons.icon);
    inputsV.append("name", inputs.name);
    inputsV.append("status", inputs.status);
    inputsV.append('_method', "put");

    const headers = {
      Authorization: `Bearer ${getToken()}`
    }

    http.post("vehicle-brand/" + id, inputsV, { headers }).then((res) => {
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
                    <h3 className="card-title">Edit Vehicle Brand</h3>
                    <div className="card-tools"></div>
                  </div>

                  <div className="card-body">
                    <form onSubmit={(e) => submit(e)} encType="multipart/form-data">
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
                          <img
                            className="preview"
                            src={src}
                            alt={alt}
                          />
                        </div>

                        <div className="col-md-12">
                          <div className="form-group text-center">
                            <input
                              type="submit"
                              value="Update"
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
