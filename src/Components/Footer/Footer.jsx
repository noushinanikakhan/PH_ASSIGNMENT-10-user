import React from "react";
import logoFooter from "./../../assets/logofooter.png"

const Footer = () => {
    return (
        <footer className="bg-[#0c2729] text-white py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center ">
                {/* Logo and Brand */}
      <div className="flex flex-col items-center gap-1">
  <img src={logoFooter} className="h-36 w-36 object-contain" alt="PlateShare Logo" />
  <h1 className="font-bold text-5xl -mt-10">PlateShare</h1>
  <p className="font-medium text-lg">Meals with Meaning</p>
  <p className="text-sm">Providing reliable foods since 2024</p>
</div>


       {/* Copyright */}
                <div className="mt-6">
                    <p className="text-sm">Copyright © {new Date().getFullYear()} - All right reserved</p>
                </div>

                {/* Social Media Links */}
                <nav className="mt-4">
                    <div className="flex justify-center gap-6">
                       <a className="hover:scale-110 transition-transform" href="#" aria-label="X (Twitter)">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="fill-current"
  >
    <path d="M18.244 2H21L14.355 10.088L22 22H15.532L10.58 14.882L4.902 22H2L9.067 13.344L2 2H8.6L13.07 8.465L18.244 2ZM17.108 20H18.776L7.03 3.935H5.245L17.108 20Z" />
  </svg>
</a>

                        <a className="hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a className="hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>

         
            </div>
        </footer>
    )
}

export default Footer;