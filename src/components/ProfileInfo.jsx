import React, { useState, useEffect } from "react";
import { FaIndustry, FaUser, FaUserEdit, FaCheck } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { ImCross } from "react-icons/im";

const ProfileInfo = ({ user, onSave }) => {
  const hiddenFields = [
    "id",
    "createdAt",
    "updatedAt",
    "role",
    "profileImage",
    "googleRefreshToken",
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [formFields, setFormFields] = useState({});

  useEffect(() => {
    if (user) setFormFields(user);
  }, [user]); // Removed isEditing from dependency to prevent overwrite while typing

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formFields);
    setIsEditing(false);
  };

  // Helper inside or outside component
  const formatDisplayValue = (key, value) => {
    if (!value) return "N/A";
    if (
      key === "country" &&
      typeof value === "string" &&
      value.startsWith("{")
    ) {
      try {
        return JSON.parse(value).name;
      } catch {
        return value;
      }
    }
    return value;
  };

  const renderInputField = (key, value) => {
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

    return (
      <input
        type="text"
        name={key}
        value={value || ""}
        onChange={handleChange}
        className={baseClass}
        // Disable country if you don't want them editing it here
        disabled={key === "country"}
      />
    );
  };

  if (!user) return null;

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-none dark:shadow-sm dark:shadow-gray-700/30">
      <div className="text-xl text-text flex gap-2 p-4 bg-gray-50 dark:bg-gray-700 border-b justify-between items-center border-gray-200 w-full">
        <div className="flex flex-row gap-3 items-center">
          <FaUser className="size-5 text-btn-100" />
          <p className="font-bold dark:text-white">
            {isEditing ? `Edit Profile` : `Profile Info`}
          </p>
        </div>

        {isEditing ? (
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={handleSubmit}
              className="flex flex-col items-center text-green-600 hover:text-green-700"
            >
              <FaCheck size={12} />
              <span className="text-[10px] font-bold uppercase">Save</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setFormFields(user);
              }}
              className="flex flex-col items-center text-red-500 hover:text-red-600"
            >
              <ImCross size={12} />
              <span className="text-[10px] font-bold uppercase">Cancel</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex flex-col items-center text-btn-100 hover:text-btn-200"
          >
            <FaUserEdit size={20} />
            <span className="text-[10px] font-bold uppercase">Edit</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 p-5 gap-4">
        {Object.entries(user)
          .filter(([key]) => !hiddenFields.includes(key))
          .map(([key, value], index) => (
            <div
              key={key}
              className="bg-back/40 dark:bg-gray-700 py-2 px-4 rounded-xl flex items-center gap-3 border border-transparent focus-within:border-btn-100 min-w-0 w-full"
            >
              {/* Icon - Fixed width to prevent shrinking */}
              <div className="shrink-0">
                {key.toLowerCase().includes("business") ||
                key.toLowerCase().includes("org") ? (
                  <FaIndustry className="size-4 text-btn-100" />
                ) : key === "country" ? (
                  <MdOutlinePlace className="size-5 text-btn-100" />
                ) : (
                  <FaUser className="size-4 text-btn-100" />
                )}
              </div>

              {/* Text Container - min-w-0 is the secret fix for flex overflows */}
              <div className="flex-1 min-w-0">
                <p className="text-text/60 dark:text-gray-400 text-[10px] uppercase font-bold tracking-tight">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>

                {isEditing ? (
                  renderInputField(key, formFields[key])
                ) : (
                  <p className="font-medium dark:text-white text-sm sm:text-base wrap-break-words">
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

export default ProfileInfo;
