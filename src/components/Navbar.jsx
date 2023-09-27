import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-5">
      <div className="font-sans text-2xl text-[#fff] font-bold">
        Breed Fetcher
      </div>
      <div className="space-x-4">
        <a
          href="https://github.com/aducj1910/fetch-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="font-sans text-[#FFF] hover:text-gray-300">
            GitHub
          </button>
        </a>

        <a
          href="https://www.linkedin.com/in/adish-jain-958b3225b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="font-sans text-[#FFF] hover:text-gray-300">
            LinkedIn
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
