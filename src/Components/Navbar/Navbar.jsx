import React, { use } from "react";
import logo from "./../../assets/Platefoodlogo.png"
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {


    const { user, logout } = use(AuthContext);
    const navigate = useNavigate ();

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    };

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

       <li> <Link to="/" className="text-white hover:text-[#83b541]">Home</Link></li>
            <li>
              <Link to="/availablefoods" className="text-white hover:text-[#83b541]">Available Foods</Link>
            </li>
            <li>
              <Link to="/addfoods" className="text-white hover:bg-[#83b541]">Add Foods</Link>
            </li>
               <li>
              <Link to="/managemyfoods" className="text-white hover:text-[#83b541]">Manage My Foods</Link>
            </li>
               <li>
              <Link to="/myfoodrequests" className="text-white hover:text-[#83b541]">My Food Requests</Link>
            </li>
      
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
           <li> <Link to="/" className="text-white hover:text-[#83b541]">Home</Link></li>
            <li>
              <Link to="/availablefoods" className="text-white hover:text-[#83b541]">Available Foods</Link>
            </li>

              {/* User Profile Dropdown */}
    {user && (
      <li className="dropdown  dropdown-end">
        <div tabIndex={0} role="button" className="flex items-center gap-2 hover:text-[#83b541] cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={user.photoURL || "https://via.placeholder.com/32"} 
              alt={user.displayName || "User"} 
              className="w-full h-full object-cover"
            />
          </div>
          <span>{user.displayName || "User"}</span>
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-[#0c2729] rounded-box z-50 mt-4 w-52 p-2 shadow">
          {/* <li className="px-4 py-2 text-white border-b border-gray-600">
            <span className="text-sm">Hello, {user.displayName || "User"}</span>
          </li> */}
          <li><Link to="/addfoods" className="text-white hover:bg-[#83b541]">Add Food</Link></li>
          <li><Link to="/managemyfoods" className="text-white hover:bg-[#83b541]">Manage My Foods</Link></li>
          <li><Link to="/myfoodrequests" className="text-white hover:bg-[#83b541]">My Food Requests</Link></li>
          <li><button onClick={handleLogout} className="text-white hover:bg-[#83b541] text-left">Logout</button></li>
        </ul>
      </li>
    )}




            {/* <li>
              <Link to="/addfoods" className="text-white hover:text-[#83b541]">Add Foods</Link>
            </li>
               <li>
              <Link to="/managemyfoods" className="text-white hover:text-[#83b541]">Manage My Foods</Link>
            </li>
               <li>
              <Link to="/myfoodrequests" className="text-white hover:text-[#83b541]">My Food Requests</Link>
            </li> */}
   
        </ul>
      </div>

      {/* Login Button and Desktop Right Side */}
      <div className="flex items-center gap-4">

        {
          user ? <button onClick={handleLogout} className="btn bg-[#83b541] hover:bg-[#6f9a37] text-white border-0 outline-none focus:outline-none focus:ring-0 rounded-3xl px-3 py-2 sm:px-8 sm:py-3 text-sm sm:text-lg shadow-none">Logout</button>:
          <Link to="/login" className="btn bg-[#83b541] hover:bg-[#6f9a37] text-white border-0 outline-none focus:outline-none focus:ring-0 rounded-3xl px-3 py-2 sm:px-8 sm:py-3 text-sm sm:text-lg shadow-none">
  Log In</Link>
        }
 
      </div>
    </nav>
   )
}

export default Navbar;