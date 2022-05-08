import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Display() {
  const [modalShow, setModalShow] = React.useState(false);
  const [owners, setOwner] = useState([]);
  const [services, service] = useState([]);
  const [checkboxes, setCheckbox] = useState([]);
  const [ownerId, setOwnerId] = useState([]);

  //for show list of data
  useEffect(() => {
    OwnerList();
  }, []);
  const OwnerList = async () => {
    await http.get("shop-owner").then((res) => {
      setOwner(res.data.data);
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
        http.delete("shop-owner/" + id).then((res) => {
          let response = res.data;
          Swal.fire("Deleted!", `${response.message}`, `${response.status}`);
          OwnerList();
          if (response.status == "success") {
            setTimeout(() => {
              Swal.close();
            }, 1000);
          }
        });
      }
    });
  };

  //for show list of data
  useEffect(() => {
    ServiceList();
  }, []);
  const ServiceList = async () => {
    await http.get("services").then((res) => {
      service(res.data.data);
    });
  };

  const handleCheckbox = (e) => {
    e.persist();
    var isChecked = e.target.checked;
    let checkedVal = isChecked ? e.target.value : "";
    setCheckbox({ ...checkboxes, [e.target.name]: checkedVal });
  };

  function showModal(id) {
    setOwnerId({ id });
   $("#exampleModalCenter").modal("show");
  }

  //for Assign services to vendor
  function assignService(e) {
    e.preventDefault();
    var id = ownerId.id;
    const inputsV = new FormData();

    const obj = Object.entries(checkboxes);
    obj.forEach(([key, value]) =>
      value ? inputsV.append("services[]", value) : ""
    );

    http.post("assign-services/" + id, inputsV).then((res) => {
      let response = res.data;
      Swal.fire(
        `${response.status}`,
        `${response.message}`,
        `${response.status}`
      );
      if (response.status == "success") {
        setTimeout(() => {
          Swal.close();
          $("#exampleModalCenter").modal("hide");
        }, 1000);
      }
    });
  }


  return (
    <>
      {console.log(checkboxes.length)}
      <Header></Header>
      <Menu></Menu>
      <div className="content-wrapper mt-2">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Shop Owner List</h3>
                    <div className="card-tools">
                      <Link
                        to="/shop-owner/add"
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
                        <th>Business Name</th>
                        <th>Business Email</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        {/* <th>Status</th> */}
                        <th>CreatetAt</th>
                        <th>Action</th>
                      </tr>
                      {owners &&
                        owners.map((owner, index) => (
                          <tr>
                            <td>{++index}</td>
                            <td>{owner.business_name}</td>
                            <td>{owner.business_email}</td>
                            <td>{owner.mobile}</td>
                            <td>{owner.address}</td>
                            {/* <td>{owner.status}</td> */}
                            <td>{owner.created}</td>
                            <td>
                              <a
                                href="javascript:void(0)"
                                className="text-success mr-2"
                                title="Assign Service"
                                _id={owner._id}
                                onClick={() => showModal(owner._id)}
                              >
                                <i class="fas fa-concierge-bell"></i>
                              </a>
                              <Link
                                to={{
                                  pathname: "/shop-owner/edit/" + owner._id,
                                }}
                                className="text-info mr-2"
                              >
                                <i class="fas fa-edit"></i>
                              </Link>
                              <a
                                href="javascript:void(0);"
                                onClick={() => remove(owner._id)}
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

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Service List
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => assignService(e)}>
                <table className="table table-sm">
                  <tr>
                    <th>Service</th>
                    <th>Action</th>
                  </tr>
                  {services &&
                    services.map((service, index) => (
                      <tr>
                        <td>{service.title}</td>
                        <td>
                          <input
                            type="checkbox"
                            name={index}
                            id=""
                            value={service._id}
                            onClick={handleCheckbox}
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
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
