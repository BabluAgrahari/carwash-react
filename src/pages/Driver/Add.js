import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import { permission } from "../../Helper/Helper";

export default function Add() {
  const initialState = { alt: "", src: "" };
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);
  const [images, setImage] = useState([]);
  const [dl, setDl] = useState([]);
  const [{ alt, src }, setPreview] = useState(initialState);
  const [stores, setStore] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

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

    const handleDl = (e) => {
    setDl({ dl: e.target.files[0] });
    const { files } = e.target;
  };

 useEffect(() => {
    if (getToken() !== "") {
      store();
    }
  }, [getToken()]);

  //for submit data in collection
  function submit(e) {
    e.preventDefault();
    const inputsV = new FormData();
    inputsV.append('vendor_id',inputs.vendor_id?inputs.vendor_id:'');
    inputsV.append("image", images.image);
    inputsV.append("dl", dl.dl);
    inputsV.append("name", inputs.name);
    inputsV.append("email", inputs.email);
    inputsV.append("phone", inputs.phone);
    inputsV.append("city", inputs.city);
    inputsV.append("state", inputs.state);
    inputsV.append("pincode", inputs.pincode);
    inputsV.append("address", inputs.address);
    inputsV.append("password", inputs.password);
    inputsV.append("status", inputs.status);

    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    http.post("driver", inputsV, { headers }).then((res) => {
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

  async function store() {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("shop-owner", { headers }).then((res) => {
      setStore(res.data.data);
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
                    <h3 className="card-title">Add Driver</h3>
                    <div className="card-tools"></div>
                  </div>

                  <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-row">

                             {permission(["admin"]) && (
                            <div className="form-group col-md-6">
                              <label>Store</label>
                              <select
                                className="form-control"
                                name="vendor_id"
                                onChange={handleInput}
                              >
                                <option value="">Select</option>
                                {stores.map((store, index) => (
                                  <option value={store.id}>
                                    {store.business_name}
                                  </option>
                                ))}
                              </select>
                              <span className="text-muted text-size">
                                <i className="fas fa-question-circle"></i>
                                &nbsp;Please Select Store
                              </span>
                            </div>
                             )}

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
                                <i className="fas fa-question-circle"></i>
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
                                <i className="fas fa-question-circle"></i>
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
                                <i className="fas fa-question-circle"></i>
                                &nbsp;Please Enter Email
                              </span>
                            </div>

                            <div className="form-group col-md-6">
                              <label>Password</label>
                              <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={handleInput}
                                id="password"
                                value={inputs.password}
                              />
                              <span className="text-muted text-size">
                                <i className="fas fa-question-circle"></i>
                                &nbsp;Please Enter Password
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
                                <i className="fas fa-question-circle"></i>
                                &nbsp;Please Select Status
                              </span>
                            </div>

                            <div className="col-md-6">
                              <label>Driver Liences</label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="dl"
                                  name="dl"
                                  onChange={handleDl}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  Choose file
                                </label>
                              </div>
                              <span className="text-muted text-size">
                                <i className="fas fa-question-circle"></i>
                                &nbsp;Please Browse DL
                              </span>
                            </div>
                            <div className="form-group col-md-6">
                              <label>Document</label>
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
                                <i className="fas fa-question-circle"></i>
                                &nbsp;Please Browse Document
                              </span>
                            </div>
{/*
                            <div className="col-md-6">
                              {src && (
                                <img className="preview" src={src} alt={alt} />
                              )}
                            </div> */}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label>City</label>
                              <input type="text"  name="city"
                                onChange={handleInput} className="form-control"
                                id="city" placeholder="Enter City"/>
                              <span className="text-muted text-size">
                                <i className="fas fa-question-circle"></i>
                                &nbsp;Please Enter City
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
                            <option value="Andhra Pradesh">
                              Andhra Pradesh
                            </option>
                            <option value="Arunachal Pradesh">
                              Arunachal Pradesh
                            </option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">
                              Himachal Pradesh
                            </option>
                            <option value="Jammu and Kashmir">
                              Jammu and Kashmir
                            </option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">
                              Madhya Pradesh
                            </option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Andaman and Nicobar Islands">
                              Andaman and Nicobar Islands
                            </option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Dadra and Nagar Haveli">
                              Dadra and Nagar Haveli
                            </option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                              </select>
                              <span className="text-muted text-size">
                                <i className="fas fa-question-circle"></i>
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
                                <i className="fas fa-question-circle"></i>
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
                              <i className="fas fa-question-circle"></i>
                              &nbsp;Please Enter Address
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
                            <Link to="/driver" className="ml-2 btn btn-warning">
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
