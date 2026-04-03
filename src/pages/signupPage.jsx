import { useState } from "react";
import FormLeftSIde from "../components/LoginAndSignUp/FormLeftSIde";
import SignupForm from "../components/LoginAndSignUp/SignupForm";
import { orgApi, useRegisterOrgMutation } from "../features/slices/orgSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
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
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Mutation Hook
  const [register, { isLoading }] = useRegisterOrgMutation();

  const dispatch = useDispatch();

  //   Handling Input Chnage
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && isNaN(value)) return;
    setInput({ ...input, [name]: value });
  };

  //   Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations for Empty Fields
    if (
      !input.firstName.trim() ||
      !input.lastName.trim() ||
      !input.orgName.trim() ||
      !input.orgSize.trim() ||
      !input.country.trim() ||
      !input.phone.trim() ||
      !input.email.trim() ||
      !input.password.trim()
    ) {
      return toast.error("Please Fill all the Fields");
    }

    // Name Validation for Length
    if (input.firstName.length < 2 || input.lastName.length < 2) {
      return toast.error("Name must be atleast 2 Character Long!");
    }

    // Name Regex Check
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (
      !isNaN(input.firstName) ||
      !nameRegex.test(input.firstName) ||
      !isNaN(input.lastName) ||
      !nameRegex.test(input.lastName)
    ) {
      return toast.error("Invalid Name!!");
    }

    // Organization Validation for Length
    if (input.orgName.length < 2) {
      return toast.error("Organization Name must be atleast 2 Character Long!");
    }

    // Organization Name Regex Check
    if (!isNaN(input.orgName) || !nameRegex.test(input.orgName)) {
      return toast.error("Invalid Organization Name!!");
    }

    // Phone Number Validation
    if (isNaN(input.phone)) {
      return toast.error("Enter valid phone number!");
    }

    // Phone Number Validation for Length
    if (input.phone.length < 10) {
      return toast.error("Phone Number must be 10 Digits Long");
    }

    // Improved regex for standard email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      return toast.error("Please enter a valid email address");
    }

    //Validation for Length
    if (input.password.length < 7) {
      return toast.error("Password must be atleast 7 Character Long");
    }

    // Password REGEX Validation
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{7,}$/;

    if (!passwordRegex.test(input.password)) {
      return setPasswordError(
        "Password must contain at least one number and one special character",
      );
      // return toast.error(
      //   "Password must contain at least one number and one special character",
      // );
    } else {
      setPasswordError("");
    }

    // Formatting Input
    const countryData = JSON.parse(input.country);
    const formattedPhone = `+${countryData.code}-${input.phone}`;

    const formData = {
      ...input,
      country: countryData.name,
      phone: formattedPhone,
    };

    // Register API call
    try {
      const response = await register(formData).unwrap();
      localStorage.setItem("isLoggedIn", "true");
      toast.success(response?.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };;
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4">
        {/* Main Container */}
        <div className="w-full sm:max-w-lg lg:max-w-5xl flex rounded-3xl shadow-2xl overflow-hidden min-h-137.5 bg-white dark:bg-gray-900">
          {/* left side : Image  */}
          <FormLeftSIde />

          {/* Form */}
          <div className="flex-1 flex flex-col justify-center p-8 sm:p-10">
            <SignupForm
              input={input}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              passwordError={passwordError}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;