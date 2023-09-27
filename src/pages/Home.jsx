// <div className="grid grid-cols-3">
//   <div className="bg-red-500 min-h-[50px] col-span-3" />
//   <div className="bg-green-500 min-h-[50px] col-span-3" />
//   <div className="bg-orange-500 min-h-[50px] col-span-2" />
//   <div className="bg-blue-500 min-h-[50px] col-span-1" />
//   <div className="bg-yellow-500 min-h-[50px] col-span-1" />
//   <div className="bg-pink-500 min-h-[50px] col-span-1" />
// </div>
// F5B943

import React, { Component } from "react";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import ImageDisplay from "../components/ImageDisplay";

const Home = (props) => {
  //receiving and setting the props
  const { breeds, selected, setSelected, images, currImages } = props;

  return (
    <div className="grid grid-cols-12 gap-y-3">
      <div className="bg-[#671A60] min-h-[50px] h-20 col-span-12">
        <Navbar />
      </div>
      <div className="min-h-[50px] col-span-12 ml-2 mr-2">
        <SearchBox
          breeds={breeds}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className="min-h-[50px] col-span-12 ml-2 mr-2">
        <ImageDisplay
          images={images}
          selected={selected}
          currImages={currImages}
        />
      </div>
    </div>
  );
};

export default Home;
