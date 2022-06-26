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
  const [histories, setHistory]  = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [account, setAccount]    = useState({
    store_name: "",
    amount: "",
    bank_account: { holder_name: "" },
  });
  const [totalAmount, setTotalAmount] = useState([]);
  const [fInputs, setFInputs] = useState([]);
  const [stores, setStore]    = useState([]);
  const [storeId, setStoreId] = useState([]);
  const [payId, setPayId] = useState([]);

  useEffect(() => {
    if (getToken() !== "") {
      payHistory();
      store();
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

  function handleAmount(e) {
    e.persist();
    setTotalAmount(e.target.value);
  }

  function handleStoreId(e) {
    e, persist();
    setStoreId(e.target.value);
  }

  async function accountModal(value, amount) {
    // alert("under development...");
    setTotalAmount(amount);
    setPayId(value);
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("vendor-account/" + value, { headers }).then((res) => {
      setAccount(res.data.data);
    });
    setIsOpen(true);
  }

  //filter functionality
  const handleFInput = (e) => {
    e.persist();
    setFInputs({ ...fInputs, [e.target.name]: e.target.value });
  };

  async function store() {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    await http.get("shop-owner", { headers }).then((res) => {
      setStore(res.data.data);
    });
  }

  async function history() {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    const inputsV = new FormData();
    inputsV.append("amount", totalAmount ? totalAmount : "");
    inputsV.append("store_id", storeId ? storeId : "");
    inputsV.append("pay_id", payId ? payId : '');

    await http.get("payHistory", inputsV, { headers }).then((res) => {
      setStore(res.data.data);
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
                    <h3 className="card-title">Payment History List</h3>
                    <div className="card-tools">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-success btn-sm"
                      >
                        Filter
                      </a>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <form onSubmit={(e) => store(e)}>
                          <div className="form-row">
                            <div class="form-group col-md-2">
                              <label>Start Date</label>
                              <div class="input-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">
                                    <i class="far fa-calendar-alt"></i>
                                  </span>
                                </div>
                                <input
                                  type="date"
                                  name="start_date"
                                  class="form-control float-right"
                                  id="start_date"
                                  onChange={handleFInput}
                                />
                              </div>
                            </div>

                            <div class="form-group col-md-2">
                              <label>End Date</label>
                              <div class="input-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">
                                    <i class="far fa-calendar-alt"></i>
                                  </span>
                                </div>
                                <input
                                  type="date"
                                  name="end_date"
                                  class="form-control float-right"
                                  id="end_date"
                                  onChange={handleFInput}
                                />
                              </div>
                            </div>

                            <div className="form-group col-md-2">
                              <label>Store</label>
                              <select
                                class="form-control"
                                name="store"
                                onChange={handleFInput}
                              >
                                <option value="">Select</option>
                                {stores.map((store, index) => (
                                  <option value={store.id}>
                                    {store.business_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div
                              className="form-group col-md-2"
                              style={{ "margin-top": "26px" }}
                            >
                              <input
                                type="submit"
                                class="btn btn-success btn-sm"
                                value="Search"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <table className="table table-sm">
                      <tr>
                        <th>Sr.No</th>
                        <th>Store Name</th>
                        <th>Service Name</th>
                        <th>Amount</th>
                        <th>Commision Amount</th>
                        <th>Total Amount</th>
                        <th>Created Date</th>
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
                            <td>{pay.created}</td>
                            <td>
                              <a
                                href="javascript:void(0);"
                                onClick={() =>
                                  accountModal(pay.vendor_id, pay.total_amount)
                                }
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

              <div className="row">
                <div className="col-md-12 mb-2">
                  <b>Store Name :</b>
                  <span className="ml-2">{account.store_name}</span>
                  <input
                    type="hidden"
                    value={account.id}
                    name="store_id"
                    onChnage={handleStoreId}
                  />
                </div>
                <div className="form-group col-md-8">
                  <label>Amount</label>
                  <input
                    type="text"
                    name="amount"
                    className="form-control form-control-sm"
                    onChange={handleAmount}
                    value={totalAmount}
                  />
                </div>

                <div className="card col-md-12 ">
                  <table className="table table-sm">
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
                <button
                  type="button"
                  onClick={history}
                  className="btn btn-danger btn-sm"
                >
                  <i class="fas fa-solid fa-comment-dollar"></i> Pay
                </button>
              </div>
          </div>
        </div>
      </Modal>

      <Footer></Footer>
    </>
  );
}
