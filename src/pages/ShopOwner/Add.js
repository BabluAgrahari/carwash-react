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
  const [logo, setLogo] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState([]);
  const [{ alt, src }, setPreview] = useState(initialState);
  const [checkbox, setCheckbox] = useState({
    store_status: 0,
    verified_store: 0,
  });

  /*start dynamic bank details fields*/
  const bankTemplate = {
    holder_name: "",
    account_number: "",
    bank_name: "",
    ifsc_code: "",
  };
  const [bankDetails, setBankDetail] = useState([bankTemplate]);
  const addBankDetail = () => {
    setBankDetail([...bankDetails, bankTemplate]);
  };

  const changeBank = (e, index) => {
    const updatedBanks = bankDetails.map((bankDetail, i) =>
      index == i
        ? Object.assign(bankDetail, { [e.target.name]: e.target.value })
        : bankDetail
    );
    setBankDetail(updatedBanks);
  };

  const removeBankDetail = (index) => {
    const bankDetail = [...bankDetails];
    bankDetail.splice(index, 1);
    setBankDetail(bankDetail);
  };
  /*end dunamic bank details fields*/

  const handleInput = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    e.persist();
    let val = e.target.checked ? 1 : 0;
    setCheckbox({ ...checkbox, [e.target.name]: val });
  };

  //for getting img
  const handleImage = (e) => {
    setLogo({ logo: e.target.files[0] });
    const { files } = e.target;
    // setPreview(
    //   files.length
    //     ? {
    //         src: URL.createObjectURL(files[0]),
    //         alt: files[0].name,
    //       }
    //     : initialState
    // );
  };

  //for getting cover photo
  const handleCoverPhoto = (e) => {
    setCoverPhoto({ cover_photo: e.target.files[0] });
    const { files } = e.target;
  };

  //for submit data in collection
  function submit(e) {
    e.preventDefault();

    const inputsV = new FormData();
    inputsV.append("name",inputs.name);
    inputsV.append("email",inputs.email);
    inputsV.append("mobile_no",inputs.mobile_no);
    inputsV.append("business_name", inputs.business_name);
    inputsV.append("business_email", inputs.business_email);
    inputsV.append("logo", logo.logo);
    inputsV.append("cover_photo", coverPhoto.cover_photo);
    inputsV.append("store_name", inputs.store_name);
    inputsV.append("store_email", inputs.store_email);
    inputsV.append("city", inputs.city);
    inputsV.append("pincode", inputs.pincode);
    inputsV.append("state", inputs.state);
    inputsV.append("country", "India");
    inputsV.append("address", inputs.address);
    inputsV.append("description", inputs.description);
    inputsV.append("verified_store", inputs.verified_store);
    inputsV.append("whatsapp_no", inputs.whatsapp_no);
    inputsV.append("store_status", checkbox.store_status);
    inputsV.append("gstin_no", inputs.gstin_no);
    inputsV.append("phone", inputs.phone);
    inputsV.append("password", inputs.password);
    inputsV.append("bank_details", JSON.stringify(bankDetails));

    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    http.post("shop-owner", inputsV, { headers }).then((res) => {
      let response = res.data;
      Swal.fire(
        `${response.status}`,
        `${response.message}`,
        `${response.status}`
      );
      if (response.status == "success") {
        setTimeout(() => {
          Swal.close();
          navigate("/shop-owner");
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
                    <h3 className="card-title">Add Shop Owner</h3>
                    <div className="card-tools"></div>
                  </div>

                  <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                      <div className="form-row border-bottom mb-3">
                        <div className="col-md-12 mb-1">
                          <h5>
                            <i class="text-danger fa-solid fa-users"></i>
                            &nbsp;Personal Details
                          </h5>
                        </div>

                        <div className="form-group col-md-3">
                          <label>Name<span className="font-weight-bold text-danger">&nbsp;* </span></label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            onChange={handleInput}
                            id="name"
                            value={inputs.name}
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Enter Name
                          </span>
                        </div>

                        <div className="form-group col-md-3">
                          <label>Email<span className="font-weight-bold text-danger">&nbsp;* </span></label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={ handleInput }
                            id="Email"
                            value={inputs.email}
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Enter Email Id
                          </span>
                        </div>

                          <div className="form-group col-md-3">
                          <label>Mobile No<span className="font-weight-bold text-danger">&nbsp;* </span></label>
                          <input
                            type="number"
                            name="mobile_no"
                            className="form-control"
                            placeholder="Mobile No"
                            onChange={handleInput}
                            id="mobile_no"
                            value={inputs.mobile_no}
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Please Enter Mobile No
                          </span>
                        </div>

                         <div className="form-group col-md-3">
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter Password"
                            onChange={handleInput}
                            id="password"
                            value={inputs.password}
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Please enter Password here
                          </span>
                        </div>

                      </div>

                      <div className="form-row">
                        <div className="col-md-12 mb-1">
                          <h5>
                            <i class="text-danger nav-icon fas fa-store-alt"></i>
                            &nbsp;Store Details
                          </h5>
                        </div>
                        <div className="form-group col-md-4">
                          <label>
                            Store Name
                            <span className="font-weight-bold text-danger">
                              &nbsp;*
                            </span>
                          </label>
                          <input
                            type="text"
                            name="store_name"
                            className="form-control"
                            placeholder="Store Name"
                            onChange={handleInput}
                            id="store_name"
                            value={inputs.store_name}
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Enter Store Name
                          </span>
                        </div>

                        <div className="form-group col-md-4">
                          <label>Logo</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="logo"
                              name="logo"
                              onChange={handleImage}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose Logo
                            </label>
                          </div>
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Select Store Logo
                          </span>
                        </div>

                        <div className="form-group col-md-4">
                          <label>Store Cover Photo</label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="cover_photo"
                              name="cover_photo"
                              onChange={handleCoverPhoto}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose Cover Photo
                            </label>
                          </div>
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>&nbsp;*Tt
                            Will Display on your store page.*Recommanded size
                            is:
                            <b>1500*440 px</b>
                          </span>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label>Store Email</label>
                          <input
                            type="email"
                            name="store_email"
                            className="form-control"
                            placeholder="Enter Store Email"
                            onChange={handleInput}
                            id="store_email"
                            value={inputs.store_email}
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Please Enter Business Name
                          </span>
                        </div>

                        <div className="form-group col-md-4">
                          <label>GSTIN No.</label>
                          <input
                            type="text"
                            name="gstin_no"
                            className="form-control"
                            placeholder="Enter GSTIN No"
                            onChange={handleInput}
                            id="gstin_no"
                            value={inputs.gstin_no}
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Please Enter GSTIN/VAT No
                          </span>
                        </div>

                        <div className="form-group col-md-4">
                          <label>Phone No</label>
                          <input
                            type="text"
                            name="phone_no"
                            className="form-control"
                            placeholder="Enter Phone"
                            onChange={handleInput}
                            id="phone"
                            value={inputs.phone}
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Please Enter Phone no
                          </span>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label>Whatsapp No</label>
                          <input
                            type="text"
                            name="whatsapp_no"
                            className="form-control"
                            placeholder="Enter Whatsapp No"
                            onChange={handleInput}
                            id="whatsapp_no"
                            value={inputs.whatsapp_no}
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Please Enter Whatsapp No
                          </span>
                        </div>

                        <div className="form-group col-md-4">
                          <label>City</label>
                          <input
                            name="city"
                            onChange={handleInput}
                            id="city"
                            className="form-control"
                            placeholder="Enter City"
                          />
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Please Enter City
                          </span>
                        </div>

                        <div className="form-group col-md-4">
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
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-4">
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

                        <div className="form-group col-md-4">
                          <label>Country</label>
                          <input
                            type="text"
                            name="country"
                            className="form-control"
                            placeholder="Enter Country"
                            onChange={handleInput}
                            id="country"
                            disabled="disabled"
                            value="India"
                          />
                        </div>

                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Store Address</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            id="address"
                            name="address"
                            placeholder="Enter Address"
                            onChange={handleInput}
                            value={inputs.address}
                          >
                            {inputs.address}
                          </textarea>
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Please Enter Store Address
                          </span>
                        </div>

                        <div className="form-group col-md-6">
                          <label>Store Description</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            id="description"
                            name="description"
                            placeholder="Enter Description"
                            onChange={handleInput}
                            value={inputs.description}
                          >
                            {inputs.address}
                          </textarea>
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Please Enter Store Description
                          </span>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Store Status</label>
                          <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch3"
                              name="store_status"
                              value={1}
                              onClick={handleCheckbox}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customSwitch3"
                            ></label>
                          </div>
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>
                            &nbsp;Toogle the Store status
                          </span>
                        </div>

                        <div className="form-group col-md-6">
                          <label>Verified Store</label>
                          <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch1"
                              name="verified_store"
                              value={1}
                              onClick={handleCheckbox}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customSwitch1"
                            ></label>
                          </div>
                          <span className="text-muted text-size">
                            <i className="fas fa-question-circle"></i>&nbsp;(On
                            the product Detail page if store is verified then it
                            will add{" "}
                            <i className="fas fa-check-circle text-success"></i>{" "}
                            symbol next to store name.)
                          </span>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="card custom-card-shasow col-md-12 p-2">
                          <h5>
                            <i class="fa fa-solid fa-building-columns text-danger"></i>
                            &nbsp;Bank Account Details
                          </h5>

                          {bankDetails &&
                            bankDetails.map((bankDetail, index) => (
                              <div className="form-row" key={index}>
                                <div className="form-group col-md-3">
                                  <label>Account Holder Name</label>
                                  <input
                                    type="text"
                                    name="holder_name"
                                    className="form-control"
                                    placeholder="Please Enter Account Holder Name"
                                    onChange={(e) => changeBank(e, index)}
                                    id="holder_name"
                                    value={inputs.holder_name}
                                  />
                                </div>

                                <div className="form-group col-md-3">
                                  <label>Account Number</label>
                                  <input
                                    type="number"
                                    name="account_number"
                                    className="form-control"
                                    placeholder="Please Enter Account Number"
                                    onChange={(e) => changeBank(e, index)}
                                    id="account_number"
                                    value={inputs.account_number}
                                  />
                                </div>

                                <div className="form-group col-md-3">
                                  <label>Bank Name</label>
                                  <input
                                    type="text"
                                    name="bank_name"
                                    className="form-control"
                                    placeholder="Please Enter Bank Name"
                                    onChange={(e) => changeBank(e, index)}
                                    id="bank_name"
                                    value={inputs.bank_name}
                                  />
                                </div>

                                <div className="form-group col-md-2">
                                  <label>IFSC Code</label>
                                  <input
                                    type="text"
                                    name="ifsc_code"
                                    className="form-control"
                                    placeholder="Please Enter IFSC Code"
                                    onChange={(e) => changeBank(e, index)}
                                    id="ifsc_code"
                                    value={inputs.ifsc_code}
                                  />
                                </div>

                                <div className="col-md-1 mt-4">
                                  <a
                                    href="javascript:void(0);"
                                    onClick={() => removeBankDetail(index)}
                                  >
                                    <i className="fas fa-minus-circle fa-2x text-danger"></i>
                                  </a>
                                </div>
                              </div>
                            ))}
                          <div className="col-md-1 float-right">
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                              onClick={addBankDetail}
                            >
                              <i className="fas fa-plus"></i>&nbsp;Add
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="form-group text-center">
                        <input
                          type="submit"
                          value="Save"
                          className="btn btn-success"
                        />
                        <Link to="/shop-owner" className="ml-2 btn btn-warning">
                          <i className="far fa-hand-point-left"></i>&nbsp;Back
                        </Link>
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
