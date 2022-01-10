import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./styles/navbar_styles.css";
import "./styles/homepage_styles.css";
import "./styles/auth_styles.css";
import "./styles/dashboard_styles.css";
import "./styles/product_styles.css";
import "./styles/footer_styles.css";
import "./styles/cart_styles.css";
import "mapbox-gl/dist/mapbox-gl.css";

ReactDOM.render(<Routes />, document.getElementById("root"));
