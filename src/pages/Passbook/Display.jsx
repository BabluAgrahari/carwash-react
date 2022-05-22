import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../http";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";

export default function Display() {
  const [passbook, setPassbook] = useState([]);

  //for show list of data
  useEffect(() => {
    if (getToken() !== "") {
      passbookList();
    }
  }, [getToken()]);
  const passbookList = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("passbook", { headers }).then((res) => {
      setPassbook(res.data.data);
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
                    <h3 className="card-title">Passbook List</h3>
                    <div className="card-tools">

                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table id="example1" className="table table-hover table-sm">
                      <tr>
                        <th>Sr.No</th>
                        <th>Store Name</th>
                        <th>Transaction Time</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Closing Amount</th>
                        <th>Status</th>
                      </tr>
                      {passbook &&
                        passbook.map((item, index) => {
                          if (item.status === "SUCCESS") {
                            var status = (
                              <span className="tag-small">SUCCESS</span>
                            );
                          } else if (item.status === "FAILED") {
                            var status = (
                              <span className="tag-small-danger">FAILED</span>
                            );
                          }
                         var type = (item.type ==='CREDIT')?<span className="text-success">CREDIT</span>:<span className="text-damger">DEBIT</span>
                          return (
                            <tr>
                              <td>{++index}</td>
                              <td>{item.store_name}</td>
                              <td>{item.created}</td>
                              <td>{item.amount}</td>
                              <td>{type}</td>
                              <td>{item.closing_amount}</td>
                              <td>{status}</td>
                            </tr>
                          );
                        })}
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
