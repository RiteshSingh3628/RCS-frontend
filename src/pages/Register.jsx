import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";

const plans = [
  {
    name: "Basic",
    price: "$19/mo",
    features: ["50 reviews/month", "Email support"],
    value: "basic",
  },
  {
    name: "Standard",
    price: "$49/mo",
    features: ["150 reviews/month", "Priority support"],
    value: "standard",
  },
  {
    name: "Premium",
    price: "$99/mo",
    features: ["400 reviews/month", "24/7 support", "Custom branding"],
    value: "premium",
  },
];

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    setSubmitted(true);
    // TODO: Add API call here
    // reset(); // Uncomment to clear form after submit
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg py-10 md:p-8 flex flex-col md:flex-col overflow-hidden">
        <h2 className="text-2xl font-bold text-indigo-700 mb-8 text-center">
          Register Your Business
        </h2>
        {/* form section */}
        <div className="flex flex-col md:flex-row overflow-hidden">
          {/* Left: Registration Form */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} id="register-form" noValidate>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    {...register("firstName", { required: "First name is required" })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  {errors.firstName && <Alert severity="error" className="mt-2">{errors.firstName.message}</Alert>}
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName", { required: "Last name is required" })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  {errors.lastName && <Alert severity="error" className="mt-2">{errors.lastName.message}</Alert>}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.email && <Alert severity="error" className="mt-2">{errors.email.message}</Alert>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  {...register("businessName", { required: "Business name is required" })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.businessName && <Alert severity="error" className="mt-2">{errors.businessName.message}</Alert>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  placeholder="https://yourbusiness.com"
                  {...register("website", {
                    required: "Website URL is required",
                    pattern: {
                      value: /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/,
                      message: "Invalid website URL"
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.website && <Alert severity="error" className="mt-2">{errors.website.message}</Alert>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  {...register("contact", { required: "Contact number is required" })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.contact && <Alert severity="error" className="mt-2">{errors.contact.message}</Alert>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  {...register("country", { required: "Country is required" })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.country && <Alert severity="error" className="mt-2">{errors.country.message}</Alert>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="At least 8 chars, special char, alphanumeric"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: passwordPattern,
                      message:
                        "Password must be at least 8 characters, include a special character, and be alphanumeric."
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.password && <Alert severity="error" className="mt-2">{errors.password.message}</Alert>}
              </div>
              {submitted && (
                <div className="text-green-600 text-center mt-4">
                  Registration submitted!
                </div>
              )}
            </form>
          </div>
          {/* Right: Plan Selection */}
          <div className="w-full md:w-1/2 bg-indigo-50 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
              Select Your Plan
            </h3>
            <div className="flex flex-col gap-4">
              {plans.map((plan) => (
                <button
                  key={plan.value}
                  type="button"
                  onClick={() => setSelectedPlan(plan.value)}
                  className={`border rounded-lg px-4 py-4 text-left transition shadow-sm hover:shadow-md focus:outline-none ${
                    selectedPlan === plan.value
                      ? "border-indigo-600 ring-2 ring-indigo-200 bg-white"
                      : "border-gray-200 bg-indigo-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-indigo-700 text-lg">
                      {plan.name}
                    </span>
                    <span className="font-semibold text-gray-700">
                      {plan.price}
                    </span>
                  </div>
                  <ul className="text-sm text-gray-600 list-disc pl-5">
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  {selectedPlan === plan.value && (
                    <div className="mt-2 text-xs text-indigo-600 font-semibold">
                      Selected
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom: Sign In Link and Submit Button */}
        <div className="mt-8 flex  flex-col md:flex-row items-center justify-between gap-4">
          <Link
            to="/user/login"
            className="text-indigo-600 hover:underline font-semibold text-sm order-2 md:order-1"
          >
            Already have an account? Sign In
          </Link>
          <button
            type="submit"
            form="register-form"
            className="w-2/3 md:w-auto bg-indigo-600 text-white py-3 px-8 rounded-md font-semibold hover:bg-indigo-700 transition order-1 md:order-2"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
