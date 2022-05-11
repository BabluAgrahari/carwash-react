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
  const [images, setImage] = useState([]);
  const [{ alt, src }, setPreview] = useState(initialState);

  //for setting input filed
  const handleInput = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //for getting img
  const handleImage = (e) => {
    setImage({ image: e.target.files[0] });
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
    http.get("/driver/" + id, { headers }).then((res) => {
      let response = res.data.data;
      setInputs({
        name: response.name,
        email: response.email,
        phone: response.phone,
        city: response.city,
        state: response.state,
        pincode: response.pincode,
        address: response.address,
        status: response.status,
      });
      setPreview({
        src: response.image
          ? response.image
          : process.env.PUBLIC_URL + "asset/img/noimage.jpg",
        alt: "",
      });
    });
  };

  //for submit data in collection
  function submit(e) {
    e.preventDefault();
    const inputsV = new FormData();
    inputsV.append("image", images.image);
    inputsV.append("name", inputs.name);
    inputsV.append("email", inputs.email);
    inputsV.append("phone", inputs.phone);
    inputsV.append("city", inputs.city);
    inputsV.append("state", inputs.state);
    inputsV.append("pincode", inputs.pincode);
    inputsV.append("address", inputs.address);
    inputsV.append("status", inputs.status);
    inputsV.append("_method", "put");

    const headers = {
      Authorization: `Bearer ${getToken()}`
    }

    http.post("driver/" + id, inputsV, { headers }).then((res) => {
      let response = res.data;
      Swal.fire(
        `${response.status}`,
        `${response.message}`,
        `${response.status}`
      );
      if (response.status == "success") {
        setTimeout(() => {
          Swal.close();
          navigate("/driver");
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
                    <form
                      onSubmit={(e) => submit(e)}
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-row">
                            <div className="form-group col-md-6">
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
                              <span className="text-muted text-size">
                                <i class="fas fa-question-circle"></i>
                                &nbsp;Please Enter Name
                              </span>
                            </div>

                            <div className="form-group col-md-6">
                              <label>Phone</label>
                              <input
                                type="text"
                                name="phone"
                                className="form-control"
                                placeholder="Enter Phone No"
                                onChange={handleInput}
                                id="phone"
                                value={inputs.phone}
                              />
                              <span className="text-muted text-size">
                                <i class="fas fa-question-circle"></i>
                                &nbsp;Please Phone No.
                              </span>
                            </div>

                            <div className="form-group col-md-6">
                              <label>Email</label>
                              <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                onChange={handleInput}
                                id="email"
                                value={inputs.email}
                              />
                              <span className="text-muted text-size">
                                <i class="fas fa-question-circle"></i>
                                &nbsp;Please Enter Email
                              </span>
                            </div>

                            <div className="form-group col-md-6">
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
                              <span className="text-muted text-size">
                                <i class="fas fa-question-circle"></i>
                                &nbsp;Please Select Status
                              </span>
                            </div>

                            {/* <div className="col-md-6"></div> */}

                            <div className="form-group col-md-6">
                              <label>Image</label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="image"
                                  name="image"
                                  onChange={handleImage}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  Choose file
                                </label>
                              </div>
                              <span className="text-muted text-size">
                                <i class="fas fa-question-circle"></i>
                                &nbsp;Please Browse Image
                              </span>
                            </div>

                            <div className="col-md-6">
                              {src && (
                                <img className="preview" src={src} alt={alt} />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label>City</label>
                              <select
                                name="city"
                                onChange={handleInput}
                                id="city"
                                className="form-control"
                              >
                                <option value="">Select</option>
                                <option value="delhi">Delhi</option>
                                <option value="noida">Noida</option>
                              </select>
                              <span className="text-muted text-size">
                                <i class="fas fa-question-circle"></i>
                                &nbsp;Please Select City
                              </span>
                            </div>

                            <div className="form-group col-md-6">
                              <label>State</label>
                              <select
                                name="state"
                                onChange={handleInput}
                                id="status"
                                className="form-control"
                              >
                                <option value="">Select</option>
                                <option value="delhi">Delhi</option>
                                <option value="noida">Noida</option>
                              </select>
                              <span className="text-muted text-size">
                                <i class="fas fa-question-circle"></i>
                                &nbsp;Please Select State
                              </span>
                            </div>

                            <div className="form-group col-md-6">
                              <label>Pincode</label>
                              <input
                                type="number"
                                name="pincode"
                                className="form-control"
                                placeholder="Enter Pincode"
                                onChange={handleInput}
                                id="pincode"
                                value={inputs.pincode}
                              />
                              <span className="text-muted text-size">
                                <i class="fas fa-question-circle"></i>
                                &nbsp;Please enter Pincode
                              </span>
                            </div>

                            <div className="form-group col-md-6"></div>

                            <div className="form-group col-md-12">
                              <label>Address</label>
                              <textarea
                                name="address"
                                className="form-control"
                                rows="3"
                                id="address"
                                onChange={handleInput}
                                value={inputs.address}
                              ></textarea>
                            </div>
                            <span className="text-muted text-size">
                              <i class="fas fa-question-circle"></i>
                              &nbsp;Please Enter Address
                            </span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group text-center">
                            <input
                              type="submit"
                              value="Update"
                              className="btn btn-success"
                            />
                            <Link to="/driver" className="ml-2 btn btn-warning">
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
