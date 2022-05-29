import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="main-footer">
          <strong>
            Copyright © 2021-2022 <a href="">CARWASH</a>.
          </strong>
          All rights reserved.
          <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 1.0.0-rc
          </div>
        </footer>
      </div>
    );
  }
}
