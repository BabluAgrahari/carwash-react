import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Edit(props) {
  const [inputs, setInputs] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetchCatgory();
  }, []);


  const fetchCatgory = () => {
    http.get("/shop-owner/" + id).then((res) => {
      // console.log(res.data.data);
      let response = res.data.data;
      setInputs({
        name: response.name,
        email:response.email,
        phone_no:response.phone_no,
        address:response.address,
        status: response.status,
      });
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // const status = event.target.status;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //for submit data in collection
  function submit(e) {
    e.preventDefault();
    http.put("shop-owner/" + id, inputs).then((res) => {
      let response = res.data;
      Swal.fire(
        `${response.status}`,
        `${response.message}`,
        `${response.status}`
      );
      if(response.status=='success'){
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
                    <h3 className="card-title">Edit Shop Owner</h3>
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
                              onChange={handleChange}
                              id="name"
                              value={inputs.name}
                            />
                          </div>

                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter Email"
                              onChange={handleChange}
                              id="email"
                              value={inputs.email}
                            />
                          </div>

                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="text"
                              name="phone_no"
                              className="form-control"
                              placeholder="Enter Phone"
                              onChange={handleChange}
                              id="phone_no"
                              value={inputs.phone_no}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Address</label>
                            <textarea
                              className="form-control"
                              rows="3"
                              id="address"
                              name="address"
                              placeholder="Enter Sort Description"
                              onChange={handleChange}
                            >
                              {inputs.address}
                            </textarea>
                          </div>

                          <div className="form-group">
                            <label>Status</label>
                            <select
                              name="status"
                              onChange={handleChange}
                              id="status"
                              className="form-control"
                            >
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
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
                              to="/shop-owner"
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
