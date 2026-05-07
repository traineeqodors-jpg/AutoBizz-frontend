"use client";
import { useContactUsMutation } from "@/features/slices/contactUsSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoSend,
} from "react-icons/io5";

const ContactUs = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    orgId: 0,
  });

  const [errors, setErrors] = useState({});

  const [contactUs, { isLoading }] = useContactUsMutation();

  // Handling Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Name validation
    if (!input.name.trim()) newErrors.name = "Full Name is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(input.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!input.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(input.phone)) {
      newErrors.phone = "Enter 10-15 digits";
    }

    // Subject Validation
    if (!input.subject.trim()) newErrors.subject = "Subject is required";

    // Message validation
    if (!input.message.trim()) {
      newErrors.message = "Message is required";
    } else if (input.message.length < 10) {
      newErrors.message = "Must be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors on success
    setErrors({});


    try {
      const response = await contactUs(input).unwrap();
      toast.success(response?.message);
      setInput({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className=" dark:bg-gray-800 p-4 sm:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text dark:text-white tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-text/50 dark:text-gray-200 max-w-lg mx-auto">
            Have questions about our products? Our team is here to help you
            24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-8 space-y-5">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <ContactInfoCard
              icon={<IoCallOutline size={24} />}
              title="Call Us"
              //   detail={import.meta.env.VITE_AI_SUPPORT_NUMBER}
              detail="+12345678"
              subDetail="Mon-Fri, 9am - 6pm"
            />
            <ContactInfoCard
              icon={<IoMailOutline size={24} />}
              title="Email Us"
              detail="support@yourapp.com"
              subDetail="Online 24/7"
            />
            <ContactInfoCard
              icon={<IoLocationOutline size={24} />}
              title="Visit Us"
              detail="123 Tech Avenue"
              subDetail="San Francisco, CA"
            />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-surface dark:border-0 rounded-3xl p-6 sm:p-10 shadow-xl shadow-text/5 border border-white">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Fullname Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text/50 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                    className={`w-full py-3 px-4 text-text rounded-xl border transition-all outline-none ${
                      errors.name
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200`}
                    placeholder="John Doe"
                  />
                  {/* Error Message */}
                  {errors.name && (
                    <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Address Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text/50 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    className={`w-full py-3 px-4 text-text rounded-xl border transition-all outline-none ${
                      errors.email
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text/50 ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={input.phone}
                    onChange={handleChange}
                    className={`w-full py-3 px-4 text-text rounded-xl border transition-all outline-none ${
                      errors.phone
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text/50 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={input.subject}
                  onChange={handleChange}
                  className={`w-full py-3 px-4 text-text rounded-xl border transition-all outline-none ${
                    errors.subject
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200`}
                  placeholder="How can we help?"
                />
                {errors.subject && (
                  <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text/50 ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={input.message}
                  onChange={handleChange}
                  className={`w-full py-3 px-4 text-text rounded-xl border transition-all outline-none ${
                    errors.message
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200`}
                  placeholder="Type your message here..."
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full md:w-max px-8 py-4 bg-btn-100 dark:bg-btn-200 hover:bg-btn-200 dark:hover:bg-btn-300 text-white font-bold rounded-xl l flex items-center justify-center gap-2 shadow-lg shadow-btn-100/20 active:scale-95"
              >
                {isLoading ? "Sending..." : "Send Message"}
                <IoSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoCard = ({ icon, title, detail, subDetail }) => (
  <div className="bg-surface dark:border-0 p-6 rounded-2xl border border-slate-50 shadow-sm flex items-start gap-4 hover:shadow-md">
    <div className="p-3 bg-btn-100/10 text-btn-100 rounded-xl">{icon}</div>
    <div>
      <h3 className="font-bold text-text dark:text-slate-50 mb-1">{title}</h3>
      <p className="text-text dark:text-slate-50 text-sm font-medium">
        {detail}
      </p>
      <p className="text-text/40 dark:text-slate-50/40 text-xs mt-1">
        {subDetail}
      </p>
    </div>
  </div>
);

export default ContactUs;
