import React, { useEffect } from "react";
import HeroImage from "./HeroImage";
import HomeLayout from "../Layout/HomeLayout";
import FeaturedProducts from "./FeaturedProducts";
import About from "./About";

const Home = () => {
  // Scroll to top on reload
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    document.title = "Homepage";
  }, []);

  return (
    <HomeLayout>
      {HeroImage()}
      {FeaturedProducts()}
      {About()}
    </HomeLayout>
  );
};

export default Home;
