import React from "react";
import Navbar from "./shared/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-100 via-white to-orange-100 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto text-center px-4">

          <span className="px-4 py-2 rounded-full bg-white shadow text-red-500 font-medium">
            #1 Job Search Platform
          </span>

          <h1 className="text-6xl font-bold mt-6">
            Find Your <span className="text-[#6A38C2]">Dream Job</span>
            <br />
            Today
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            Connect with top companies and discover opportunities
            that match your skills and career goals.
          </p>

          <div className="flex justify-center mt-8">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-[500px] px-6 py-4 rounded-l-full border outline-none"
            />

            <button className="bg-[#6A38C2] text-white px-8 rounded-r-full">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            "Frontend",
            "Backend",
            "Full Stack",
            "Data Science",
            "Android",
            "Cyber Security",
          ].map((item) => (
            <div
              key={item}
              className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition text-center cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            Why Choose JobPortal?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl">10K+</h3>
              <p>Jobs Available</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl">500+</h3>
              <p>Companies</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl">50K+</h3>
              <p>Candidates</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl">24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <h2 className="text-xl font-bold">JobPortal</h2>
        <p className="text-gray-400 mt-2">
          Find jobs. Build careers. Hire talent.
        </p>
      </footer>
    </>
  );
};

export default Home;