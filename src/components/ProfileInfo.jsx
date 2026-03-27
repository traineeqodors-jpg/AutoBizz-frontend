import React, { useState, useEffect } from "react";
import { FaIndustry, FaUser, FaUserEdit, FaCheck } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { ImCross } from "react-icons/im";
import countriesData from "../JSON data/country.json"; 

const ProfileInfo = ({ user, onSave }) => {

  const hiddenFields = ["id", "createdAt", "updatedAt", "role", "profileImage" , "googleRefreshToken"];
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [formFields, setFormFields] = useState({});

  


  useEffect(() => {
    if (user) setFormFields(user);
  }, [user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formFields);
    setIsEditing(false);
  };


  return (
    <div className="w-full bg-white rounded-2xl shadow-md/10 gap-5 overflow-hidden">
      <h3 className="text-xl text-text flex gap-2 p-4 bg-gray-100 border-b justify-between items-center border-gray-300 w-full">
        <div className="flex flex-row gap-3 items-center">
          <FaUser className="size-5 text-btn-100" />
          <p>{isEditing ? `Edit Profile` : `Profile Info`}</p>
        </div>
        {isEditing ? (
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex flex-col items-center text-green-600 hover:text-green-700 cursor-pointer"
            >
              <FaCheck />
              <span className="text-xs">Save</span>
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex flex-col items-center text-red-500 hover:text-red-600 cursor-pointer"
            >
              <ImCross />
              <span className="text-xs">Cancel</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex flex-col items-center text-btn-100 hover:text-btn-200 cursor-pointer"
          >
            <FaUserEdit />
            <span className="text-xs">Edit Profile</span>
          </button>
        )}
      </h3>

      <form className="grid sm:grid-cols-2 p-5 gap-3">
        {Object.entries(user)
          .filter(([key]) => !hiddenFields.includes(key))
          .map(([key, value], index) => (
            <div
              key={index}
              className="bg-back/40 py-2 px-5 rounded-xl flex items-center gap-5 border border-transparent focus-within:border-btn-100"
            >
              {key.toLowerCase().includes("business") ||
              key.toLowerCase().includes("org") ? (
                <FaIndustry className="size-4 text-btn-100" />
              ) : key === "country" ? (
                <MdOutlinePlace className="size-5 text-btn-100" />
              ) : (
                <FaUser className="size-4 text-btn-100" />
              )}



              <div className="flex-1">
                <p className="text-text/60 text-xs capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>
                {isEditing ? (
                  renderInputField(key, formFields[key], handleChange)
                ) : (
                  <p className="font-medium">
                    {formatDisplayValue(key, value)}
                  </p>
                )}
              </div>
            </div>
          ))}
      </form>
    </div>
  );
};

// Helper to render specific inputs based on key name
const renderInputField = (key, value, handleChange) => {
  const baseClass =
    "w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-btn-100 font-medium py-1";

  if (key === "businessSize" || key === "orgSize") {
    return (
      <select
        name={key}
        value={value || ""}
        onChange={handleChange}
        className={baseClass}
      >
        <option value="" disabled>
          -- Size --
        </option>
        <option value="1-50">1-50</option>
        <option value="51-200">51-200</option>
        <option value="201-500">201-500</option>
        <option value="500+">500+</option>
      </select>
    );
  }

  if (key === "country") {
    return (
      <input
        disabled
        name={key}
        value={value || ""}
        onChange={handleChange}
        className={baseClass}
      >
        {/* <option value="" disabled>
          - Country -
        </option>
        {countriesData.countries.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))} */}
      </input>
    );
  }

  if (key === "phoneNumber" || key === "phone") {
    const displayPhone =
      value && value.includes("-") ? value.split("-").pop() : value;

    return (
      <input
        type="text"
        name={key}
        value={displayPhone || ""}
        onChange={handleChange}
        placeholder="1234567890"
        className={baseClass}
      />
    );
  }

  return (
    <input
      name={key}
      value={value || ""}
      onChange={handleChange}
      className={baseClass }
    />
  );
};

// Helper to handle displaying "N/A" or formatting JSON strings
const formatDisplayValue = (key, value) => {
  if (!value) return "N/A";
  // If your country data is stored as a JSON string (like in your Signup form), parse it
  if (key === "country" && value.startsWith("{")) {
    try {
      return JSON.parse(value).name;
    } catch {
      return value;
    }
  }
  return value;
};

export default ProfileInfo;
  