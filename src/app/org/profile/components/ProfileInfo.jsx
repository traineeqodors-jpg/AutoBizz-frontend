"use client";

import { useState } from "react";
import { FaUserEdit, FaCheck, FaGlobeAmericas } from "react-icons/fa";
import { ImCross } from "react-icons/im";
// Added more specific heroicons for a modern look
import {
  HiUser,
  HiMail,
  HiOfficeBuilding,
  HiIdentification,
} from "react-icons/hi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfileInfo = ({ user, onSave }) => {
  const hiddenFields = [
    "id",
    "orgId",
    "createdAt",
    "updatedAt",
    "role",
    "profileImage",
    "googleRefreshToken",
    "isVerified",
    "type",
    "onboarding",
    "profileImagePublicId",
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [formFields, setFormFields] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formFields);
    setIsEditing(false);
  };

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
      "w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-btn-100 font-medium py-1 dark:text-text";

    if (key === "businessSize" || key === "orgSize") {
      return (
        <Select
          value={value || ""}
          onValueChange={(val) =>
            handleChange({
              target: {
                name: key,
                value: val,
              },
            })
          }
        >
          <SelectTrigger className="w-full bg-transparent border-b border-gray-300 dark:text-white focus:outline-none focus:border-btn-100 font-medium py-1">
            <SelectValue placeholder="-- Size --" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Size</SelectLabel>
              <SelectItem value="1-50">1-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
              <SelectItem value="201-500">201-500</SelectItem>
              <SelectItem value="500+">500+</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    }

    return (
      <input
        type="text"
        name={key}
        value={value || ""}
        onChange={handleChange}
        className={baseClass}
        disabled={key === "country" || key === "email" || key === "id" || key === "phoneNumber"} // Make country and email non-editable
      />
    );
  };

  if (!user) return null;

  return (
    <div className="w-full bg-surface rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-none dark:shadow-sm dark:shadow-gray-700/30">
      <div className="text-lg sm:text-xl text-text flex gap-2 p-4 bg-gray-50 dark:bg-gray-700 border-b justify-between items-center border-gray-200 w-full">
        <div className="flex flex-row gap-3 items-center">
          <HiUser className="size-6 text-btn-100" /> {/* Changed Icon */}
          <p className="font-bold dark:text-white">
            {isEditing ? `Edit Profile` : `Profile Info`}
          </p>
        </div>

        {user?.type === "organization" && (
          <>
            {isEditing ? (
              <div className="flex gap-4 items-center justify-center">
                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="flex flex-col items-center text-green-600 hover:text-green-700"
                  >
                    <FaCheck size={12} />
                    <span className="text-[10px] font-bold uppercase">
                      Save
                    </span>
                  </button>
                </form>

                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormFields(user);
                  }}
                  className="flex flex-col items-center text-red-500 hover:text-red-600"
                >
                  <ImCross size={12} />
                  <span className="text-[10px] font-bold uppercase">
                    Cancel
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex flex-col items-center text-btn-100 cursor-pointer"
              >
                <FaUserEdit size={20} />
                <span className="text-[10px] font-bold uppercase">Edit</span>
              </button>
            )}
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 p-5 gap-4">
        {Object.entries(user)
          .filter(([key]) => !hiddenFields.includes(key))
          .map(([key, value]) => (
            <div
              key={key}
              className="bg-back dark:bg-gray-700 py-2 px-4 rounded-xl flex items-center gap-3 border border-transparent focus-within:border-btn-100 min-w-0 w-full"
            >
              <div className="shrink-0">
                {/* Updated Icon Selection Logic */}
                {key.toLowerCase().includes("email") ? (
                  <HiMail className="size-5 text-btn-100" />
                ) : key.toLowerCase().includes("business") ||
                  key.toLowerCase().includes("org") ? (
                  <HiOfficeBuilding className="size-5 text-btn-100" />
                ) : key === "country" ? (
                  <FaGlobeAmericas className="size-5 text-btn-100" />
                ) : key.toLowerCase().includes("name") ? (
                  <HiIdentification className="size-5 text-btn-100" />
                ) : (
                  <HiUser className="size-5 text-btn-100" />
                )}
              </div>

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
