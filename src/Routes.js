import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/Signin";
import Home from "./Components/Homepage/Home";
import ProductList from "./Components/Products/ProductList";
import ProductDetail from "./Components/Products/ProductDetail";
import ProductSearchResults from "./Components/Products/ProductSearchResults";

import CustomerDashboard from "./Components/Dashboard/Customer/Dashboard";
import DashboardOrder from "./Components/Dashboard/Customer/OrderHistory";
import CustomerOrder from "./Components/Dashboard/Customer/CustomerOrder";
import EditProfile from "./Components/Dashboard/Customer/EditProfile";
import ChangePassword from "./Components/Dashboard/Customer/ChangePassword";
import AddressBook from "./Components/Dashboard/Customer/AddressBook";

import AdminDashboard from "./Components/Dashboard/Admin/Dashboard";
import CreateCategory from "./Components/Dashboard/Admin/CreateCategory";
import CreateProduct from "./Components/Dashboard/Admin/CreateProduct";
import UpdateProduct from "./Components/Dashboard/Admin/UpdateProduct";
import Order from "./Components/Dashboard/Admin/Order";
import Products from "./Components/Dashboard/Admin/Products";
import OrderDetail from "./Components/Dashboard/Admin/OrderDetail";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import Checkout from "./Components/Checkout/Checkout";
import SuccessCheckout from "./Components/Checkout/SuccessCheckout";
import Payment from "./Components/Checkout/Payment";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/*GENERAL ROUTES*/}
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/products" exact component={ProductList} />
        <Route path="/product/:productId" exact component={ProductDetail} />
        <Route path="/searchResults" exact component={ProductSearchResults} />

        {/*CUSTOMER ROUTES*/}
        <PrivateRoute
          path="/customer/account"
          exact
          component={CustomerDashboard}
        />
        <PrivateRoute
          path="/customer/order/history"
          exact
          component={DashboardOrder}
        />
        <PrivateRoute
          path="/customer/order/history/:orderId"
          exact
          component={CustomerOrder}
        />
        <PrivateRoute
          path="/customer/profile/update"
          exact
          component={EditProfile}
        />
        <PrivateRoute
          path="/customer/password/update"
          exact
          component={ChangePassword}
        />
        <PrivateRoute path="/customer/address" exact component={AddressBook} />
        <PrivateRoute path="/checkout" exact component={Checkout} />
        <PrivateRoute path="/checkout/payment" exact component={Payment} />
        <PrivateRoute
          path="/checkout/success"
          exact
          component={SuccessCheckout}
        />

        {/*ADMIN ROUTES*/}
        <AdminRoute path="/admin/account" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/category/create"
          exact
          component={CreateCategory}
        />
        <AdminRoute
          path="/admin/product/create"
          exact
          component={CreateProduct}
        />
        <AdminRoute path="/admin/order/list" exact component={Order} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/order/:orderId"
          exact
          component={OrderDetail}
        />
        <AdminRoute path="/admin/products" exact component={Products} />

        {/*ERROR ROUTES*/}
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
