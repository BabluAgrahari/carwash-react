import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import http from "../../http";

export default function Display() {
  const [histories, setHistory] = useState([]);

  useEffect(() => {
    if (getToken() !== "") {
      payHistory();
    }
  }, [getToken()]);

  const payHistory = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("pay-history", { headers }).then((res) => {
      setHistory(res.data.data);
    });
  };

  function paya(){
      alert('under development...');
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
                    <h3 className="card-title">Pay History List</h3>
                    <div className="card-tools"></div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table className="table table-sm">
                      <tr>
                        <th>Sr.No</th>
                        <th>Store Name</th>
                        <th>Service Name</th>
                        <th>Amount</th>
                        <th>Commision Amount</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                      </tr>

                      {histories &&
                        histories.map((pay, index) => (
                          <tr>
                            <td>{++index}</td>
                            <td>{pay.store_name}</td>
                            <td>{pay.service_name}</td>
                            <td>{pay.amount}</td>
                            <td>{pay.comission_amount}</td>
                            <td>{pay.total_amount}</td>
                            <td><a href="javascript:void(0);" onClick={() => paya()} className="btn btn-success btn-xs">Pay</a></td>
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
