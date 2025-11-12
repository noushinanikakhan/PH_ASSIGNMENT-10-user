import React from 'react';
import { Link } from 'react-router';


import errorImage from './../../assets/404-error.jpg'; // You can add your own image
import { div } from 'framer-motion/client';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const ErrorPage = () => {
    return (
        <div > 
            <Navbar></Navbar>
        <div className="min-h-screen bg-[#f7fcf5] flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Error Image */}
                <div className="mb-8">
                    <img 
                        src={errorImage || "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"} 
                        alt="404 Error" 
                        className="w-full max-w-md mx-auto rounded-lg"
                    />
                </div>

    
                    {/* Back to Home Button */}
                    <div className="pt-6">
                        <Link 
                            to="/" 
                            className="btn bg-[#83b541] hover:bg-[#6f9a37] text-white border-0 rounded-3xl px-8 py-3 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Back to Home
                        </Link>
                    </div>

                    {/* Optional: Fun message
                    <p className="text-gray-500 text-sm mt-8">
                        Don't worry, even the best chefs sometimes lose their recipes!
                    </p> */}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;