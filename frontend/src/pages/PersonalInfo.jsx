import React, { useState, useEffect } from "react";
import api from "../services/api";

const PersonalInfo = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    try {
      const res = await api.get("/personalinfo/getallpersonalinfo");
      // console.log("API Response:", res.data);

      // Correctly extract array from 'data' property:
      const personalInfoArray = Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setList(personalInfoArray);
    } catch (err) {
      setList([]);
      setError("Failed to fetch personal info");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingId) {
        const res = await api.put(
          `/personalinfo/updatepersonalinfo/${editingId}`,
          form
        );
        if (res.data.success) {
          setList((prevList) =>
            prevList.map((item) =>
              item._id === editingId ? res.data.personalInfo : item
            )
          );
          await fetchAll();
          setEditingId(null);
        } else {
          setError("Failed to update personal info: " + res.data.message);
        }
      } else {
        const res = await api.post("/personalinfo/addpersonalinfo", form);
        if (res.data.success) {
          setList((prevList) => [...prevList, res.data.personalInfo]);
          await fetchAll();
        } else {
          setError("Failed to create personal info: " + res.data.message);
        }
      }
      setForm({ firstname: "", lastname: "", phone: "", address: "" });
    } catch (err) {
      setError("An error occurred while saving data");
      console.error(err);
    }
  };

  const setEditing = async (id) => {
    const item = list.find((item) => item._id === id);
    if (item) {
      setForm({
        firstname: item.firstname || "",
        lastname: item.lastname || "",
        phone: item.phone || "",
        address: item.address || "",
      });
      await fetchAll();
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      const res = await api.delete("/personalinfo/deletepersonalinfo", {
        data: { id },
      });
      if (res.data.success) {
        setList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        setError("Failed to delete personal info: " + res.data.message);
      }
    } catch (err) {
      setError("An error occurred while deleting data");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // or navigate programmatically if using react-router
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Personal Information
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item, idx) => {
                if (!item) return null;
                return (
                  <tr key={item._id || idx} className="border-t">
                    <td className="px-4 py-2 font-semibold">
                      {item.firstname} {item.lastname}
                    </td>
                    <td className="px-4 py-2">{item.phone}</td>
                    <td className="px-4 py-2">{item.address}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => setEditing(item._id)}
                        className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 px-4 py-4">
                  No personal information found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
