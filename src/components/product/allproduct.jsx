import React from "react";
import FilterCard from "./FilterCard";
import BrandSillder from "./brandSlider";

const AllProduct = () => {

  return (
    <>
      <div className="p-5">
        <BrandSillder />
      </div>
      <FilterCard />
      <br />
    </>
  );
};
export default AllProduct;
