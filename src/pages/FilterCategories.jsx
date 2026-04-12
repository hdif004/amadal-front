import React from "react";
import { Link } from "react-router-dom";

const FilterCategories = () => {
  return (
    <>
      <Link to='https://hpanel.hostinger.com/websites/amadal.ma'>
        <button className="w-full h-12 sm:h-[70px] bg-primary rounded-md text-white">
          <span className="text-white font-bold text-xl sm:text-4xl">Hostinger</span>
        </button>
      </Link>
    </>
  );
};

export default FilterCategories;
