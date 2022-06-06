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
  const [categories, setCategory] = useState([]);
  const [token, setToken] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof sessionStorage.getItem("userData") !== "undefined") {
      setToken(JSON.parse(sessionStorage.getItem("userData")).token);
      service();
      category();
    }
  }, [token]);

  //for category
  const category = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await http.get("category", { headers }).then((res) => {
      setCategory(res.data.data);
    });
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const service = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await http.get("/services/" + id, { headers }).then((res) => {
      let response = res.data.data;
      setInputs({
        title: response.title,
        description: response.description,
        status: response.status,
        category: response.category,
      });
    });
  };

  //for submit data in collection
  async function submit(e) {
    e.preventDefault();

    const inputsV = new FormData();
    inputsV.append("icon", icon.icon ? icon.icon : "");
    inputsV.append("title", inputs.title ? inputs.title : "");
    inputsV.append("description", inputs.description ? inputs.description : "");
    inputsV.append("category", inputs.category ? inputs.category : "");
    inputsV.append("status", inputs.status ? inputs.status : "");
    inputsV.append("_method", "put");

    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    http.post("services/" + id, inputsV, { headers }).then((res) => {
      let response = res.data;
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
                    <h3 className="card-title">Edit Services</h3>
                    <div className="card-tools"></div>
                  </div>

                  <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Title</label>
                            <input
                              type="text"
                              id="tilte"
                              name="title"
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter Title"
                              value={inputs.title}
                            />
                          </div>

                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              id="description"
                              name="description"
                              placeholder="Enter Full Description"
                              onChange={handleChange}
                              value={inputs.description}
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Category</label>
                              <select
                                name="category"
                                onChange={handleChange}
                                id="category"
                                className="form-control"
                                value={inputs.category}
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

                              </span>
                            </div>

                            <div className="form-group col-md-6">
                              <label>Status</label>
                              <select
                                name="status"
                                onChange={handleChange}
                                id="status"
                                className="form-control"
                                value={inputs.status}
                              >
                                <option value="">Select</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                              </select>
                            </div>

                            <div className="form-group col-md-12">
                              <label>Icon</label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="icon"
                                  name="icon"
                                  onChange={handleChange}
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
                        </div>

                        <div className="col-md-12">
                          <div className="form-group text-center">
                            <input
                              type="submit"
                              value="Update"
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
