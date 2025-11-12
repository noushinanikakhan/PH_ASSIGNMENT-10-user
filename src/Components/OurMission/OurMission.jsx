import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurMission = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <section className="py-20 bg-[#f7fcf5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-[#0c2729] mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            At PlateShare, we believe no good food should go to waste while people in our community go hungry. 
            We're building a sustainable future where surplus food finds its way to those who need it most.
          </p>
        </div>

        {/* Mission Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Mission Text */}
          <div data-aos="fade-right">
            <h3 className="text-3xl font-bold text-[#0c2729] mb-6">
              Creating a World Without Food Waste
            </h3>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Every year, millions of tons of perfectly good food are thrown away while millions of people 
                struggle with food insecurity. PlateShare bridges this gap by creating a community-driven 
                platform that connects food donors with recipients in real-time.
              </p>
              <p>
                We empower restaurants, cafes, event organizers, and households to share their surplus food 
                with neighbors, reducing environmental impact and strengthening community bonds.
              </p>
              <p>
                Our vision is simple: transform food waste into community wealth, one shared meal at a time.
              </p>
            </div>
          </div>

          {/* Right Side - Impact Highlights */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#83b541] rounded-full flex items-center justify-center text-white mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#0c2729]">Community First</h4>
              </div>
              <p className="text-gray-600">
                Building stronger neighborhoods through food sharing and mutual support.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#83b541] rounded-full flex items-center justify-center text-white mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#0c2729]">Environmental Impact</h4>
              </div>
              <p className="text-gray-600">
                Reducing carbon footprint by preventing food from ending up in landfills.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#83b541] rounded-full flex items-center justify-center text-white mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#0c2729]">Social Connection</h4>
              </div>
              <p className="text-gray-600">
                Bringing people together through the universal language of food and sharing.
              </p>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12" data-aos="fade-up">
          <h3 className="text-3xl font-bold text-[#0c2729] text-center mb-12">
            Community Impact Stats
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="text-center" data-aos="zoom-in" data-aos-delay="200">
              <div className="text-4xl lg:text-5xl font-bold text-[#83b541] mb-2">10,000+</div>
              <div className="text-lg text-gray-600">Meals Shared</div>
              <p className="text-sm text-gray-500 mt-2">And counting across our community</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center" data-aos="zoom-in" data-aos-delay="300">
              <div className="text-4xl lg:text-5xl font-bold text-[#83b541] mb-2">2,500+</div>
              <div className="text-lg text-gray-600">Active Users</div>
              <p className="text-sm text-gray-500 mt-2">Food heroes making a difference</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center" data-aos="zoom-in" data-aos-delay="400">
              <div className="text-4xl lg:text-5xl font-bold text-[#83b541] mb-2">15 Tons</div>
              <div className="text-lg text-gray-600">Food Waste Prevented</div>
              <p className="text-sm text-gray-500 mt-2">From ending up in landfills</p>
            </div>

            {/* Stat 4 */}
            <div className="text-center" data-aos="zoom-in" data-aos-delay="500">
              <div className="text-4xl lg:text-5xl font-bold text-[#83b541] mb-2">50+</div>
              <div className="text-lg text-gray-600">Cities Covered</div>
              <p className="text-sm text-gray-500 mt-2">Growing nationwide network</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12" data-aos="fade-up">
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of food heroes who are making a real difference in their communities
          </p>
          <button className="btn bg-[#0c2729] hover:bg-[#184c4f] text-white border-0 rounded-3xl px-8 py-3 text-lg font-medium transition-all duration-300">
            Become a Food Hero Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurMission;