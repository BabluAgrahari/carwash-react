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
  const [inputsError, setError] = useState([]);
  const [categories, setCategory] = useState([]);
  const [token, setToken] = useState("");

  //for category
  const category = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await http.get("category", { headers }).then((res) => {
      setCategory(res.data.data);
    });
  };

  useEffect(() => {
    if (typeof sessionStorage.getItem("userData") !== "undefined") {
      setToken(JSON.parse(sessionStorage.getItem("userData")).token);
    }
    category();
  }, [token]);

  const handleInput = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

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
    const inputsV = new FormData();
    inputsV.append("icon", icon.icon ? icon.icon : "");
    inputsV.append("title", inputs.title ? inputs.title : "");
    inputsV.append("category", inputs.category?inputs.category:"");
    inputsV.append("description", inputs.description ? inputs.description : "");
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
                              rows="3"
                              id="description"
                              name="description"
                              placeholder="Enter Full Description"
                              onChange={handleInput}
                            ></textarea>
                            <span className="text-danger">
                              {inputsError.description}
                            </span>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="form-group col-md-6">
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
