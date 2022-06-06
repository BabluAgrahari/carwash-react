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
  const [account, setAccount] = useState([]);

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

  async function accountModal(value) {
    // alert("under development...");
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("vendor-account/" + value, { headers }).then((res) => {
      setAccount(res.data.data);
    });
    setIsOpen(true);
  }
  return (
    <>
    {console.log(account)}
      <Header></Header>
      <Menu></Menu>
      <div className="content-wrapper mt-2">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Payment History List</h3>
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
                                onClick={() => accountModal(pay.vendor_id)}
                                className="btn btn-success btn-xs"
                              >
                                <i class="fa-solid fa-comment-dollar"></i> Pay
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
            <h3 className="card-title">Payment Details</h3>
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
              <div className="row">
                <div className="col-md-12 mb-2">
                  <b>Store Name :</b>
                  <span className="ml-2">{account.store_name}</span>
                </div>
                <div className="card col-md-12 ">
                  <table className="table table-sm">
                    <tr></tr>
                    <tr>
                      <th>Account Holder :</th>
                      <td>{account.bank_account.holder_name}</td>
                    </tr>
                    <tr>
                      <th>Bank Name :</th>
                      <td>{account.bank_account.bank_name}</td>
                    </tr>
                    <tr>
                      <th>Account Number :</th>
                      <td>{account.bank_account.account_number}</td>
                    </tr>
                    <tr>
                      <th>IFSC Code :</th>
                      <td>{account.bank_account.ifsc_code}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <div className="form-group text-center">

                <button type="submit" className="btn btn-danger btn-sm"><i class="fas fa-solid fa-comment-dollar"></i> Pay</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Footer></Footer>
    </>
  );
}
