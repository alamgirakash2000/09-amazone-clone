import React from "react";
import "./Home.style.css";

import Product from "../../components/Product/Product";

function Home({ products }) {
  return (
    <div className="home mx-auto container">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
      />
      {/*Product id,title,price,rating,image*/}
      <div className="row z-index-1">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-lg-4 col-md-6">
              <Product props={product} />
            </div>
          ))
        ) : (
          <h2 className="text-center ml-5">Sorry!! No products found.</h2>
        )}
      </div>
    </div>
  );
}

export default Home;
