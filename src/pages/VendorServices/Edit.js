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
  const [vehicleB, setVehicleBrand] = useState([]);
  const [serviceC, serServiceTitle] = useState([]);
  const [vehicleBrands, setBrand] = useState([]);
  const [vehicleModals, setModal] = useState([]);
  const [categories, setCategory] = useState([]);
  const [services, setServices] = useState([]);
  const [inputsError, setError] = useState([]);
  const [totalCharges, setTotalCharges] = useState(false);
  const [token, setToken] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof sessionStorage.getItem("userData") !== "undefined") {
      setToken(JSON.parse(sessionStorage.getItem("userData")).token);
      service();
      vehicleBrand();
      category();
    }
  }, [token]);

  //for vehical brand
  const vehicleBrand = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await http.get("vehicle-brand", { headers }).then((res) => {
      setBrand(res.data.data);
    });
  };

  const handleDropdown = (value) => {
    // setInputs({ ...inputs, ['vehicle_brand']: value });
    setVehicleBrand(value);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    http.get("veh-modal/" + value, { headers }).then((res) => {
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

  const handleServices = (value) => {

    serServiceTitle(value);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    http.get("services-by-cat/" + value, { headers }).then((res) => {
      setServices(res.data.data);
    });
  };

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const service = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await http.get("/vendor-services/" + id, { headers }).then((res) => {
      let response = res.data.data;
      setInputs({
        service_id: response.service_id,
        category_id: response.category_id,
        discount: response.discount,
        service_type: response.service_type,
        vehicle_model: response.vehicle_model,
        service_charge: response.service_charge,
        total_charges: response.total_charges,
        vehicle_brand: response.vehicle_brand,
      });
      handleDropdown(response.vehicle_brand);
      handleServices(response.category_id);
    });
  };

  const handleKeyup = (e) => {
    e.persist();
    let service_charge = $("#service_charge").val();
    let discount = $("#discount").val() ? $("#discount").val() : 100;
    let gst_charges = $("#gst_charges").val() ? $("#gst_charges").val() : 0;
    let perVal = (service_charge * discount) / 100;
    setTotalCharges(
      parseInt(service_charge) - parseInt(perVal) + parseInt(gst_charges)
    );
  };

  //for submit data in collection
  async function submit(e) {
    e.preventDefault();

    const inputsV = new FormData();

    inputsV.append("service_id", inputs.service_id ? inputs.service_id : "");
    inputsV.append("category_id", inputs.category_id ? inputs.category_id : "");
    inputsV.append("vehicle_brand", vehicleB ? vehicleB : "");
    inputsV.append(
      "vehicle_model",
      inputs.vehicle_model ? inputs.vehicle_model : ""
    );
    inputsV.append("discount", inputs.discount ? inputs.discount : "");
    inputsV.append(
      "service_charge",
      inputs.service_charge ? inputs.service_charge : ""
    );
    inputsV.append("gst_charges", inputs.gst_charges ? inputs.gst_charges : "");
    inputsV.append("total_charges", totalCharges ? totalCharges : "");
    inputsV.append(
      "service_type",
      inputs.service_type ? inputs.service_type : ""
    );
    inputsV.append("_method", "put");

    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    http.post("vendor-services/" + id, inputsV, { headers }).then((res) => {
      let response = res.data;
      Swal.fire(
        `${response.status}`,
        `${response.message}`,
        `${response.status}`
      );
      if (response.status == "success") {
        setTimeout(() => {
          Swal.close();
          navigate("/vendor-services");
        }, 1000);
      }
      if (response.type == "validation") {
        let errors = response.message;
        Object.keys(errors).map((error, index) =>
          setError({ ...inputsError, [error]: errors[error][0] })
        );
        return false;
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
                    <h3 className="card-title">Edit Service </h3>
                    <div className="card-tools"></div>
                  </div>

                  <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label>Category</label>
                              <select
                                name="category_id"
                                 onChange={(e) => handleServices(e.target.value)}
                                id="category"
                                className="form-control"
                                value={serviceC}
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

                            <div className="form-group col-md-6">
                              <label>Select Services</label>
                              <select
                                name="service_id"
                                id="service_id"
                                className="form-control"
                                value={inputs.service_id}
                              >
                                <option value="">Select</option>
                                {services &&
                                  services.map((service, index) => (
                                    <option value={service.id}>
                                      {service.title}
                                    </option>
                                  ))}
                              </select>
                              <span className="text-danger">
                                {inputsError.status}
                              </span>
                            </div>

                            <div className="form-group col-md-6">
                              <label>Vehicle Brand</label>
                              <select
                                name="vehicle_brand"
                                onChange={(e) => handleDropdown(e.target.value)}
                                id="vehicle_brand"
                                className="form-control"
                                value={vehicleB}
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

                            <div className="form-group col-md-6">
                              <label>Vehicle Modal</label>
                              <select
                                name="vehicle_model"
                                onChange={handleInput}
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
                              <span className="text-danger">
                                {inputsError.vehicle_model}
                              </span>
                            </div>

                            <div className="form-group col-md-6">
                              <label>Service Type</label>
                              <select
                                name="service_type"
                                onChange={handleInput}
                                id="service_type"
                                className="form-control"
                                value={inputs.service_type}
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
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Service Charges</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="service_charge"
                                  name="service_charge"
                                  placeholder="Service Charges"
                                  onKeyUp={handleKeyup}
                                  onChange={handleInput}
                                  value={inputs.service_charge}
                                />
                                <span className="text-danger">
                                  {inputsError.service_charge}
                                </span>
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
                                  onChange={handleInput}
                                />
                                <span className="text-danger">
                                  {inputsError.total_charges}
                                </span>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Discount (In %)</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="discount"
                                  placeholder="Discount"
                                  name="discount"
                                  onKeyUp={handleKeyup}
                                  onChange={handleInput}
                                  value={inputs.discount}
                                />
                                <span className="text-danger">
                                  {inputsError.discount}
                                </span>
                              </div>
                            </div>
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
                              to="/vendor-services"
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
