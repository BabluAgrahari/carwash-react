import React, { Component } from "react";
import Header from "./layouts/Header";
import Menu from "./layouts/Menu";
import Dashboard from "./Dashboard";
import Footer from "./layouts/Footer";

export default class Page extends Component {
  render() {
    return (
      <>
        <Header></Header>
        <Menu></Menu>
        <Dashboard></Dashboard>
        <Footer></Footer>
      </>
    );
  }
}
