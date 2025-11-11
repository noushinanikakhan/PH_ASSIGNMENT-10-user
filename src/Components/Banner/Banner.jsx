import React from "react";
// import heroBg from "./../../assets/hero-food.jpg"; // optional background

const Banner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* ===== Image Section - Now FIRST on mobile ===== */}
          <div className="order-1 lg:order-2"> {/* Changed to order-1 for mobile */}
            <div className="relative w-full h-72 sm:h-96 lg:h-[420px] flex justify-center items-center overflow-hidden rounded-3xl bg-gray-100">
              {/* 👉 You can replace this <img> later with animated images */}
              <img
                src=""
                alt="Banner visual placeholder"
                className="h-full w-full object-cover"
              />
              {/* Optional overlay or gradient */}
              <div className="absolute inset-0 bg-black/5"></div>

              {/* Label or small badge */}
              <div className="absolute top-4 right-4 bg-[#0c2729] text-white text-xs px-3 py-1 rounded-full">
                Image Area
              </div>
            </div>
          </div>

          {/* ===== Text Section - Now SECOND on mobile ===== */}
          <div className="order-2 lg:order-1"> {/* Changed to order-2 for mobile */}
            <span className="inline-block rounded-full bg-[#83b541]/10 px-3 py-1 text-xs font-medium text-[#0c2729]">
              Community Powered • Since 2024
            </span>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0c2729] sm:text-5xl">
              Share surplus meals.{" "}
              <span className="text-[#83b541]">Fight waste.</span>
            </h1>

            <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              PlateShare connects donors and neighbors so good food never goes
              to waste. Discover available meals near you—or offer what you can.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/foods"
                className="btn bg-[#83b541] hover:bg-[#6f9a37] text-white border-0 outline-none focus:outline-none focus:ring-0 rounded-3xl px-8 text-base"
              >
                View All Foods
              </a>

              <a
                href="/search"
                className="btn bg-[#0c2729] hover:bg-[#184c4f] text-white border-0 outline-none focus:outline-none focus:ring-0 rounded-3xl px-8 text-base"
              >
                Search Food
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;