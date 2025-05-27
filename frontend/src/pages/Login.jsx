import React, { useState } from "react";
import api from "../services/api";

const Login = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, seterror] = useState("");

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");

    if (!form.email || !form.password) {
      seterror("Please fill in all fields");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      console.log("Response:", response.data); // Log the response data for debugging
      if (response.data.success) {
        // const token = response.data.data.generatedAccessToken; // fix: use response.data.accessToken not generatedAccessToke
        // console.log("Token:", token); // Log the token for debugging
        localStorage.setItem("token", response.data.data.generatedAccessToken); // fix: use response.data.accessToken not generatedAccessToken
        window.location = "/personalinfo"; // Redirect to personal info page
        console.log("Login successful:", response.data);
      } else {
        seterror(response.data.message || "Login failed");
      }
    } catch (err) {
      seterror(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Login
      </h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
