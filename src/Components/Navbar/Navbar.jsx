import React from "react";
import logo from "./../../assets/Platefoodlogo.png"

const Navbar = () => {
   return (
    <nav className="flex items-center justify-between bg-[#0c2729] shadow-sm px-4 py-3">
      {/* Mobile Menu - Now on Left Side */}
      <div className="flex items-center gap-4 lg:hidden">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-ghost text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#0c2729] rounded-box z-50 mt-2 w-52 p-2 shadow">
            <li><a className="text-white hover:bg-[#83b541]">Home</a></li>
            <li><a className="text-white hover:bg-[#83b541]">Available Foods</a></li>
            <li><a className="text-white hover:bg-[#83b541]">About Us</a></li>
            <li><a className="text-white hover:bg-[#83b541]">Contact</a></li>
            <li><a className="text-white hover:bg-[#83b541]">Log In</a></li>
          </ul>
        </div>
      </div>

     {/* Logo and Title - Perfectly Horizontally Aligned */}
<div className="flex items-center flex-shrink-0 mx-auto lg:mx-0">
  <img
    src={logo}
    className="h-16 w-16 sm:h-20 sm:w-20 lg:h-[120px] lg:w-[120px] pt-2 lg:pt-6 object-contain"
    alt="PlateShare Logo"
  />
  <div className="flex flex-col justify-center border-l border-[#83b541] pl-3">
    <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-white leading-tight">PlateShare</h2>
    <p className="text-white text-sm sm:text-base mt-0.5 leading-tight">Meals with Meaning</p>
  </div>
</div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="flex items-center gap-8 text-white text-lg">
          <li><a className="hover:text-[#83b541] transition-colors duration-200">Home</a></li>
          <li><a className="hover:text-[#83b541] transition-colors duration-200">Available Foods</a></li>
          <li><a className="hover:text-[#83b541] transition-colors duration-200">About Us</a></li>
          <li><a className="hover:text-[#83b541] transition-colors duration-200">Contact</a></li>
        </ul>
      </div>

      {/* Login Button and Desktop Right Side */}
      <div className="flex items-center gap-4">
       <a
  className="btn bg-[#83b541] hover:bg-[#6f9a37] text-white border-0 outline-none focus:outline-none focus:ring-0 rounded-3xl px-8 text-lg hidden sm:inline-flex shadow-none"
>
  Log In
</a>

        
        {/* This empty div maintains space balance on mobile */}
        <div className="w-10 lg:hidden"></div>
      </div>
    </nav>
   )
}

export default Navbar;