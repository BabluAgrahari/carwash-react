import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../token";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Menu from "../layouts/Menu";
import http from "../../http";
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
  const [histories, setHistory] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (getToken() !== "") {
      payHistory();
    }
  }, [getToken()]);

  // for modal
  function closeModal() {
    setIsOpen(false);
  }

  const payHistory = async () => {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("pay-history", { headers }).then((res) => {
      setHistory(res.data.data);
    });
  };

  function paya() {
    // alert("under development...");
    setIsOpen(true);
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
                            <td>
                              <a
                                href="javascript:void(0);"
                                onClick={() => paya()}
                                className="btn btn-success btn-xs"
                              >
                                Pay
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
            <h3 className="card-title">Payment Mode</h3>
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

              <div className="form-group">
                <label>Payment Mode</label>
                <select name="payment_mode" className="form-control form-control-sm">
                  <option value="">Select</option>
                  <option value='imps'>IMPS</option>
                  <option value='neft'>NEFT</option>
                  <option value='net_banking'>Net Banking</option>
                </select>
              </div>
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
