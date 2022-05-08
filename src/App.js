import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Auth from "./Middleware/Auth";
import Display from "./pages/Category/Display";
import Add from "./pages/Category/Add";
import Edit from "./pages/Category/Edit";
//for vehicle
import VehicleBrandDisplay from "./pages/VehicleBrand/Display";
import VehicleBrandAdd from "./pages/VehicleBrand/Add";
import VehicleBrandEdit from "./pages/VehicleBrand/Edit";

//for vehicle
import VehicleModalDisplay from "./pages/VehicleModal/Display";
import VehicleModalAdd from "./pages/VehicleModal/Add";
import VehicleModalEdit from "./pages/VehicleModal/Edit";

//for services
import ServicesDisplay from "./pages/Services/Display";
import ServicesAdd from "./pages/Services/Add";
import ServicesEdit from "./pages/Services/Edit";

//for services
import ShopOwnerDisplay from "./pages/ShopOwner/Display";
import ShopOwnerAdd from "./pages/ShopOwner/Add";
import ShopOwnerEdit from "./pages/ShopOwner/Edit";

//for Driver
import DriverDisplay from "./pages/Driver/Display";
import DriverAdd from "./pages/Driver/Add";
import DriverEdit from "./pages/Driver/Edit";

//for vendor services
import VendorServices from "./pages/VendorServices/Services";

//for vendor profile
import Profile from "./pages/VendorProfile/Profile";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={<Auth component={Dashboard} role={["admin", "vendor"]} />}
          ></Route>
          {/* for category module */}
          <Route
            path="/category"
            element={<Auth component={Display} role={["admin"]} />}
          ></Route>
          <Route
            path="/category/add"
            element={<Auth component={Add} role={["admin"]} />}
          ></Route>
          <Route
            path="/category/edit/:id"
            element={<Auth component={Edit} role={["admin"]} />}
          ></Route>

          {/* for vehicle Brand module */}
          <Route
            path="/vehicle-brand"
            element={<Auth component={VehicleBrandDisplay} role={["admin"]} />}
          ></Route>
          <Route
            path="/vehicle-brand/add"
            element={<Auth component={VehicleBrandAdd} role={["admin"]} />}
          ></Route>
          <Route
            path="/vehicle-brand/edit/:id"
            element={<Auth component={VehicleBrandEdit} role={["admin"]} />}
          ></Route>

          {/* for vehicle modal module */}
          <Route
            path="/vehicle-modal"
            element={<Auth component={VehicleModalDisplay} role={["admin"]} />}
          ></Route>
          <Route
            path="/vehicle-modal/add"
            element={<Auth component={VehicleModalAdd} role={["admin"]} />}
          ></Route>
          <Route
            path="/vehicle-modal/edit/:id"
            element={<Auth component={VehicleModalEdit} role={["admin"]} />}
          ></Route>

          {/* for services modal module */}
          <Route
            path="/services"
            element={<Auth component={ServicesDisplay} role={["admin"]} />}
          ></Route>
          <Route
            path="/services/add"
            element={<Auth component={ServicesAdd} role={["admin"]} />}
          ></Route>
          <Route
            path="/services/edit/:id"
            element={<Auth component={ServicesEdit} role={["admin"]} />}
          ></Route>

          {/* for services modal module */}
          <Route
            path="/shop-owner"
            element={<Auth component={ShopOwnerDisplay} role={["admin"]} />}
          ></Route>
          <Route
            path="/shop-owner/add"
            element={<Auth component={ShopOwnerAdd} role={["admin"]} />}
          ></Route>
          <Route
            path="/shop-owner/edit/:id"
            element={<Auth component={ShopOwnerEdit} role={["admin"]} />}
          ></Route>

          {/* for Driver module */}
          <Route
            path="/driver"
            element={<Auth component={DriverDisplay} role={["vendor"]} />}
          ></Route>
          <Route
            path="/driver/add"
            element={<Auth component={DriverAdd} role={["vendor"]} />}
          ></Route>
          <Route
            path="/driver/edit/:id"
            element={<Auth component={DriverEdit} role={["vendor"]} />}
          ></Route>

          {/* for Vendor Services */}
          <Route
            path="/vendor-services"
            element={<Auth component={VendorServices} role={["vendor"]} />}
          ></Route>

          {/* for Vendor Profile */}
          <Route
            path="/profile"
            element={<Auth component={Profile} role={["vendor","admin"]} />}
          ></Route>

          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
