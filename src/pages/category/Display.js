import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "30vw",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    transection: "all 1s ease-in-out",
    background: "transection",
    padding: 0,
    border: "none",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.295)",
  },
};
export default function Display() {
  const [categories, setCategory] = useState([]);
  const [vendors,setVendor]       = useState([]);
  const [commision,setCommision]    = useState([{cat_id:'',vendor_id:'',commission:''}]);
  const [modalIsOpen, setIsOpen] = useState(false);

  //for show list of data
  useEffect(() => {
    if (getToken() !== "") {
      categoryList();
    }
  }, [getToken()]);
  const categoryList = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("category", { headers }).then((res) => {
      setCategory(res.data.data);
    });
  };

  // for modal
  function closeModal() {
    setIsOpen(false);
  }

  async function showModal(cat_id) {
alert(cat_id);
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("shop-owner", { headers }).then((res) => {
      setVendor(res.data.data);
    });
    setCommision([...commision,{cat_id:cat_id}]);

    // setOwnerId({ id });
    // let checkVal = [];
    // services.map((service, ind) => {
    //   let che =
    //     service.shop_owners && service.shop_owners.indexOf(id) !== -1
    //       ? true
    //       : false;
    //   checkVal.push(che);
    // });
    // const chhe = checkVal.reduce(
    //   (obj, arrValue, index) => ((obj[index] = arrValue), obj),
    // );
    // setChecked(chhe);
    setIsOpen(true);
  }

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
        const headers = {
          Authorization: `Bearer ${getToken()}`,
        };
        http.delete("category/" + id, { headers }).then((res) => {
          let response = res.data;
          Swal.fire("Deleted!", `${response.message}`, `${response.status}`);
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
    {console.log(commision)}
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
                        <i className="fas fa-plus"></i>&nbsp;Add
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
                        <th>GST Charges</th>
                        <th>Status</th>
                        <th>CreatetAt</th>
                        <th>Action</th>
                      </tr>
                      {categories &&
                        categories.map((category, index) => (
                          <tr>
                            <td>{++index}</td>
                            <td>
                              {
                                <img
                                  src={
                                    category.icon
                                      ? category.icon
                                      : process.env.PUBLIC_URL +
                                        "asset/img/noimage.jpg"
                                  }
                                  className="custom-img-size"
                                />
                              }
                            </td>
                            <td>{category.name}</td>
                            <td>{category.gst_charges}</td>
                            <td>{category.status ? "Active" : "Inactive"}</td>
                            <td>{category.created}</td>
                            <td>
                              <a
                                href="javascript:void(0)"
                                className="text-success mr-2"
                                title="Assign Service"
                                // _id={vendor._id}
                                onClick={() => showModal(category._id)}
                              >
                                <i class="fas fa-solid fa-hand-holding-dollar"></i>

                              </a>
                              <Link
                                to={{
                                  pathname: "/category/edit/" + category._id,
                                }}
                                className="text-info mr-2"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <a
                                href="javascript:void(0);"
                                onClick={() => remove(category._id)}
                                className="text-danger"
                              >
                                <i className="fas fa-trash-alt"></i>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="servicemodal"
      >
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Vendor List</h3>
            <div className="card-tool">
              <button
                type="button"
                className="close"
                onClick={() => closeModal()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => assignService(e)}>
              <table className="table table-sm w-100">
                <tr>
                  <th>Vendor Name</th>
                  <th>Commision (in %)</th>
                </tr>
                {vendors &&
                  vendors.map((vendor, index) => (
                    <tr>
                      <td>{vendor.name}</td>
                      <td className="w-50">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          name={`cms-${index}`}
                        />
                      </td>

                    </tr>
                  ))}
              </table>
              <div className="form-group text-center">
                <input
                  type="submit"
                  className="btn btn-success btn-sm"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <Footer></Footer>
    </>
  );
}
