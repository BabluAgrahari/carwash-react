import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Auth from "./Middleware/Auth";
import Display from "./pages/Category/Display";
import Add from "./pages/Category/Add";
import Edit from "./pages/Category/Edit";
//for vehicle
import  VehicleBrandDisplay from "./pages/VehicleBrand/Display";
import  VehicleBrandAdd from "./pages/VehicleBrand/Add";
import  VehicleBrandEdit from "./pages/VehicleBrand/Edit";

//for vehicle
import  VehicleModalDisplay from "./pages/VehicleModal/Display";
import  VehicleModalAdd from "./pages/VehicleModal/Add";
import  VehicleModalEdit from "./pages/VehicleModal/Edit";

//for services
import  ServicesDisplay from "./pages/Services/Display";
import  ServicesAdd from "./pages/Services/Add";
import  ServicesEdit from "./pages/Services/Edit";

//for services
import  ShopOwnerDisplay from "./pages/ShopOwner/Display";
import  ShopOwnerAdd from "./pages/ShopOwner/Add";
import  ShopOwnerEdit from "./pages/ShopOwner/Edit";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={ <Auth component={ Dashboard } />}>
          </Route>
          {/* for category module */}
          <Route path="/category" element={ <Auth component={ Display } />}>
          </Route>
          <Route path="/category/add" element={ <Auth component={ Add } />}>
          </Route>
          <Route path="/category/edit/:id" element={ <Auth component={ Edit } />}>
          </Route>

          {/* for vehicle Brand module */}
          <Route path="/vehicle-brand" element={ <Auth component={ VehicleBrandDisplay } />}>
          </Route>
          <Route path="/vehicle-brand/add" element={ <Auth component={ VehicleBrandAdd } />}>
          </Route>
          <Route path="/vehicle-brand/edit/:id" element={ <Auth component={ VehicleBrandEdit } />}>
          </Route>

          {/* for vehicle modal module */}
          <Route path="/vehicle-modal" element={ <Auth component={ VehicleModalDisplay } />}>
          </Route>
          <Route path="/vehicle-modal/add" element={ <Auth component={ VehicleModalAdd } />}>
          </Route>
          <Route path="/vehicle-modal/edit/:id" element={ <Auth component={ VehicleModalEdit } />}>
          </Route>

          {/* for services modal module */}
          <Route path="/services" element={ <Auth component={ ServicesDisplay } />}>
          </Route>
          <Route path="/services/add" element={ <Auth component={ ServicesAdd } />}>
          </Route>
           <Route path="/services/edit/:id" element={ <Auth component={ ServicesEdit } />}>
          </Route>

          {/* for services modal module */}
          <Route path="/shop-owner" element={ <Auth component={ ShopOwnerDisplay } />}>
          </Route>
          <Route path="/shop-owner/add" element={ <Auth component={ ShopOwnerAdd } />}>
          </Route>
           <Route path="/shop-owner/edit/:id" element={ <Auth component={ ShopOwnerEdit } />}>
          </Route>

          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
