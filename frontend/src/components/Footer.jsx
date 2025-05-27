import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold">Single Page Application</span>. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
