import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import foodbox from "./../../assets/foodbox.jpg";
import EnjoyMeals from "./../../assets/EnjoyMeals.jpg";
import findmeals from "./../../assets/findmeals.jpg";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-[#0c2729] mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our mission to reduce food waste and help your community in three simple steps
          </p>
        </div>

        {/* Step 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20" data-aos="fade-right">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="w-20 h-20 bg-[#83b541] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto lg:mx-0">
              1
            </div>
            <h3 className="text-2xl font-bold text-[#0c2729] mb-4">Post Your Surplus Food</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Have extra food from events, restaurants, or your kitchen? List it on PlateShare. 
              Simply upload photos, add details like food type, quantity, expiration date, and set a pickup location. 
              Your surplus becomes someone's next meal.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-2xl h-64 flex items-center justify-center overflow-hidden">
              <img 
                src={findmeals} 
                alt="Post surplus food" 
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20" data-aos="fade-left">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="w-20 h-20 bg-[#83b541] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto lg:mx-0">
              2
            </div>
            <h3 className="text-2xl font-bold text-[#0c2729] mb-4">Find Available Meals</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Browse through available food listings in your neighborhood. Use filters to find exactly what you need - 
              search by location, food category, dietary preferences, or pickup time. Discover fresh meals shared by your community members.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-2xl h-64 flex items-center justify-center overflow-hidden">
              <img 
                src={foodbox} 
                alt="Find available meals" 
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col lg:flex-row items-center gap-12" data-aos="fade-right">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="w-20 h-20 bg-[#83b541] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto lg:mx-0">
              3
            </div>
            <h3 className="text-2xl font-bold text-[#0c2729] mb-4">Collect & Enjoy</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Once you find food you like, contact the donor directly through our secure messaging system. 
              Arrange a convenient pickup time and location. Collect your food and enjoy delicious meals 
              while helping reduce food waste in your community.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-2xl h-64 flex items-center justify-center overflow-hidden">
              <img 
                src={EnjoyMeals} 
                alt="Collect and enjoy meals" 
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;