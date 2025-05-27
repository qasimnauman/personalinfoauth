import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          About Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          We're a team of dedicated engineers passionate about building
          single-page applications using the{" "}
          <span className="font-semibold">MERN Stack</span> — MongoDB,
          Express.js, React.js, and Node.js. We strive to deliver high-quality,
          scalable, and user-friendly web solutions.
        </p>
      </div>
    </div>
  );
};

export default About;
