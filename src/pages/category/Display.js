import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Display() {
  const [categories, setCategory] = useState([]);

  //for show list of data
  useEffect(() => {
    categoryList();
  }, []);
  const categoryList = async () => {
    await http.get("category").then((res) => {
      setCategory(res.data.data);
    });
  };

  const remove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        http.delete("category/" + id).then((res) => {
            let response = res.data;
          Swal.fire("Deleted!",`${response.message}`, `${response.status}`);
          categoryList();
          if (response.status == "success") {
            setTimeout(() => {
              Swal.close();
            }, 1000);
          }
        });
      }
    });
  };

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
                    <h3 className="card-title">Category List</h3>
                    <div className="card-tools">
                      <Link
                        to="/category/add"
                        className="btn btn-success btn-sm"
                      >
                        <i class="fas fa-plus"></i>&nbsp;Add
                      </Link>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table id="example1" className="table table-hover table-sm">
                      <tr>
                        <th>Sr.No</th>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>CreatetAt</th>
                        <th>Action</th>
                      </tr>
                      {categories &&
                        categories.map((category, index) => (

                          <tr>
                            <td>{++index}</td>
                            <td>{<img src={category.icon} className="custom-img-size" />}</td>
                            {/* <td>{category.icon?'':<img className="custom-img-size" src={process.env.PUBLIC_URL +"asset/img/noimage.jpg"}/>}</td> */}
                            <td>{category.name}</td>
                            <td>{category.status ?'Active':'Inactive'}</td>
                            <td>{category.created}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/category/edit/" + category._id,
                                }}
                                className="text-info mr-2"
                              >
                                <i class="fas fa-edit"></i>
                              </Link>
                              <a
                                href="javascript:void(0);"
                                onClick={() => remove(category._id)}
                                className="text-danger"
                              >
                                <i class="fas fa-trash-alt"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                    </table>
                  </div>
                  {/* /.card-body */}
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
