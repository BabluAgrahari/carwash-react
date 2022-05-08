import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../http";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Profile() {
  const [services, service] = useState([]);
  const [serviceData, setServiceData] = useState({id:"",charge:""});
  const [discoutnData, setDiscountCharge] = useState({discount_by_vendor:"",actual_charge:""});

  //for show list of data
  useEffect(() => {
    ServiceList();
  }, []);
  const ServiceList = async () => {
    await http.get("vendor-services").then((res) => {
      service(res.data.data);
    });
  };

  function showModal(data) {
    setServiceData(data);
    $("#exampleModalCenter").modal("show");
  }

function discount(val){
  let charge = (val*serviceData.charge)/100;
  let discount_charge = Math.round(serviceData.charge - charge);
setDiscountCharge({'discount_by_vendor':val,'actual_charge':discount_charge});

}
  //for Assign services to vendor
  function updatePrice(e) {
    e.preventDefault();
    var id = serviceData.id;
    const inputsV = new FormData();
 inputsV.append("discount_by_vendor", discoutnData.discount_by_vendor);
  inputsV.append("actual_charge", discoutnData.actual_charge);
    http.post("update-price/" + id, inputsV).then((res) => {
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
    { console.log(discoutnData)}
      <Header></Header>
      <Menu></Menu>
      <div className="content-wrapper mt-2">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">User Profile</h3>
                    <div className="card-tools">
                      <Link
                        to="/services/add"
                        className="btn btn-success btn-sm"
                      >
                        <i class="fas fa-plus"></i>&nbsp;Add
                      </Link>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">

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
