"use client";
import { useState } from "react";
import FormLeftSIde from "./components/FormLeftSIde";
import SignupForm from "./components/SignupForm";
import AnimatedWrapper from "../../../components/AnimatedWrapper";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useRegisterOrgMutation } from "@/features/slices/userSlice";

const Register = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    orgName: "",
    orgSize: "",
    country: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  // Mutation Hook
  const [register, { isLoading }] = useRegisterOrgMutation();

  const router = useRouter();

  //   Handling Input Chnage
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && isNaN(value)) return;
    setInput({ ...input, [name]: value });
  };

  //   Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // // Validations for Empty Fields
    // if (
    //   !input.firstName.trim() ||
    //   !input.lastName.trim() ||
    //   !input.orgName.trim() ||
    //   !input.orgSize.trim() ||
    //   !input.country.trim() ||
    //   !input.phone.trim() ||
    //   !input.email.trim() ||
    //   !input.password.trim()
    // ) {
    //   return toast.error("Please Fill all the Fields");
    // }

    // First Name validation
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!input.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (input.firstName.length < 2) {
      newErrors.firstName = "must be atleast 2 Character Long!";
    } else if (!isNaN(input.firstName) || !nameRegex.test(input.firstName)) {
      newErrors.firstName = "Invalid Name!";
    }

    // Last Name validation
    if (!input.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (input.lastName.length < 2) {
      newErrors.lastName = "must be atleast 2 Character Long!";
    } else if (!isNaN(input.lastName) || !nameRegex.test(input.lastName)) {
      newErrors.lastName = "Invalid Name!";
    }

    // Organization Validation
    const orgNameRegex = /^[a-zA-Z0-9 .,&()-]+$/;
    if (!input.orgName.trim()) {
      newErrors.orgName = "Organization Name is required";
    } else if (input.orgName.length < 2) {
      newErrors.orgName = "must be atleast 2 Character Long!";
    } else if (!orgNameRegex.test(input.orgName)) {
      newErrors.orgName = "Invalid organization name!";
    }

    // Organization size Validation
    if (!input.orgSize.trim()) {
      newErrors.orgSize = "Size is required";
    }

    // Country Validation
    if (!input.country.trim()) {
      newErrors.country = "Country is required";
    }

    // Phone Number Validation
    const cleanedPhone = input.phone.replace(/\s/g, "");
    if (!input.phone.trim()) {
      newErrors.phone = "Number is required";
    } else if (isNaN(cleanedPhone)) {
      newErrors.phone = "Enter valid phone number!";
    } else if (cleanedPhone.length < 10) {
      newErrors.phone = "Phone Number must be 10 Digits Long";
    } else if (!/^[0-9]{10,15}$/.test(cleanedPhone)) {
      newErrors.phone = "Invalid phone number";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(input.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*_\-])[a-zA-Z0-9!@#$%^&*_\-]{7,}$/;
    if (!input.password.trim()) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 7) {
      newErrors.password = "must be atleast 7 Character Long";
    } else if (!passwordRegex.test(input.password)) {
      newErrors.password =
        "Password must contain at least one number and one special character";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors on success
    setErrors({});

    // Formatting Input
    const countryData = JSON.parse(input.country);
    const formattedPhone = `+${countryData.code}-${cleanedPhone}`;

    const formData = {
      ...input,
      country: countryData.name,
      phone: formattedPhone,
    };

    console.log(formData);

    // Register API call
    try {
      const response = await register(formData).unwrap();
      toast.success(response?.message);
      router.push("/org/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "Registration failed. Please try again.",
      );
    }
  };
  return (
    <>
      <AnimatedWrapper>
        <div className="min-h-screen w-full flex items-center justify-center p-4">
          {/* Main Container */}
          <div className="w-full sm:max-w-lg lg:max-w-5xl flex rounded-3xl shadow-2xl overflow-hidden min-h-137.5 bg-surface border">
            {/* left side : Image  */}
            <FormLeftSIde />

            {/* Form */}
            <div className="flex-1 flex flex-col justify-center p-4 sm:p-10">
              <SignupForm
                input={input}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </>
  );
};

export default Register;
