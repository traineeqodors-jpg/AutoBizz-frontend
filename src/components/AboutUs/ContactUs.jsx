import React, { useState } from "react";
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoSend,
} from "react-icons/io5";
import { toast } from "react-toastify";
import { useAddLeadMutation } from "../../features/slices/leadSlice";
 
const ContactUs = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
 
  const [addLead, { isLoading }] = useAddLeadMutation();
 
  // Handling Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
 
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // 1. Validations for Empty Fields (Login Style)
    if (
      !input.name.trim() ||
      !input.email.trim() ||
      !input.phone.trim() ||
      !input.message.trim()
    ) {
      return toast.error("Please fill all the fields");
    }
 
    // 2. Email Regex (Login Style)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      return toast.error("Please enter a valid email address");
    }
 
    // 3. Phone Validation (Login Style)
    const phoneRegex = /^[0-9\+]{10,15}$/;
    if (!phoneRegex.test(input.phone)) {
      return toast.error("Please enter a valid phone number");
    }
 
    // 4. Message Length Validation
    if (input.message.length < 10) {
      return toast.error("Message must be at least 10 characters long");
    }
 
    try {
      // Success Logic
      console.log("Contact Form Data:", input);
      const response = await addLead(input).unwrap();
 
      console.log(response);
      toast.success(response?.message);
      setInput({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
 
    // Reset form after success
    
  };
 
  return (
    <div className="min-h-screen bg-back p-4 sm:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-text/50 max-w-lg mx-auto">
            Have questions about our products? Our team is here to help you
            24/7.
          </p>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <ContactInfoCard
              icon={<IoCallOutline size={24} />}
              title="Call Us"
              detail={import.meta.env.VITE_AI_SUPPORT_NUMBER}
              subDetail="Online 24/7"
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
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-text/5 border border-white">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text/40 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                    className="w-full bg-back/50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-btn-100 transition-all text-text"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text/40 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    className="w-full bg-back/50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-btn-100 transition-all text-text"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text/40 ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={input.phone}
                    onChange={handleChange}
                    className="w-full bg-back/50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-btn-100 transition-all text-text"
                    placeholder="00000-000000"
                  />
                </div>
              </div>
 
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text/40 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={input.subject}
                  onChange={handleChange}
                  className="w-full bg-back/50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-btn-100 transition-all text-text"
                  placeholder="How can we help?"
                />
              </div>
 
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text/40 ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={input.message}
                  onChange={handleChange}
                  className="w-full bg-back/50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-btn-100 transition-all text-text resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
 
              <button
              disabled={isLoading}
                type="submit"
                className="w-full md:w-max px-8 py-4 bg-btn-100 hover:bg-btn-200 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-btn-100/20 active:scale-95"
              >
                Send Message
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
  <div className="bg-white p-6 rounded-2xl border border-slate-50 flex items-start gap-4 hover:shadow-md transition-all">
    <div className="p-3 bg-btn-100/10 text-btn-100 rounded-xl">{icon}</div>
    <div>
      <h3 className="font-bold text-text mb-1">{title}</h3>
      <p className="text-text text-sm font-medium">{detail}</p>
      <p className="text-text/40 text-xs mt-1">{subDetail}</p>
    </div>
  </div>
);
 
export default ContactUs;