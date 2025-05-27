import React from "react";

const Contacts = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Sales</h3>
          <p className="text-gray-700">
            Email:{" "}
            <a
              href="mailto:221345@students.au.edu.pk"
              className="text-blue-600 hover:underline"
            >
              221345@students.au.edu.pk
            </a>
          </p>
          <p className="text-gray-700">
            Phone:{" "}
            <a
              href="tel:+921234567890"
              className="text-blue-600 hover:underline"
            >
              +92 123 4567890
            </a>
          </p>
        </div>

        {/* Support Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Support</h3>
          <p className="text-gray-700">
            Email:{" "}
            <a
              href="mailto:221345@students.au.edu.pk"
              className="text-blue-600 hover:underline"
            >
              221345@students.au.edu.pk
            </a>
          </p>
          <p className="text-gray-700">
            Phone:{" "}
            <a
              href="tel:+921234567890"
              className="text-blue-600 hover:underline"
            >
              +92 123 4567890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
