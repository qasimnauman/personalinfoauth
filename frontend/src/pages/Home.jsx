import React from "react";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700">
          Welcome to IT Solutions
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Category 1 */}
        <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Service Category 1
          </h2>
          <p className="text-gray-700">Mobile App Development</p>
        </div>

        {/* Service Category 2 */}
        <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Service Category 2
          </h2>
          <p className="text-gray-700">Software Development</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
