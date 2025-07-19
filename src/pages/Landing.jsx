import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdInfo, MdCheckCircle, MdEmail, MdQrCode, MdDashboard, MdQuestionAnswer, MdWidgets, MdImportExport } from "react-icons/md";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/auth";

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("online");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  useEffect(()=>{
    if(isUserLoggedIn()){
      navigate('/admin');//Redirect if already logged in
    }

  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="flex-shrink-0 flex items-center">
                  <MdInfo className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">FeedbackPro</span>
                </div>
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.a
                href="#features"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Features
              </motion.a>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Pricing
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                onClick={()=>{navigate('/user/register')}}
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium"
                onClick={()=>{navigate('/user/login')}}
              >
                Login
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6"
          >
            Collect Valuable Customer Feedback
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            Seamlessly gather insights with our online and offline feedback system. 
            Turn customer opinions into actionable data.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg border border-indigo-100"
            >
              See Demo
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-20 bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("online")}
              className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === "online" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
            >
              Online Feedback
            </button>
            <button
              onClick={() => setActiveTab("offline")}
              className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === "offline" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
            >
              QR Feedback
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === "dashboard" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
            >
              Admin Dashboard
            </button>
          </div>
          <div className="p-8">
            {activeTab === "online" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Email-Triggered Feedback</h3>
                  <p className="text-gray-600 mb-6">
                    Automatically send personalized feedback requests after purchases. 
                    Customers can rate their experience with just one click.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">Personalized with customer & order details</span>
                    </li>
                    <li className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">Conditional questions based on responses</span>
                    </li>
                    <li className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">Integrated with SendGrid/Mailgun</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <img 
                      src="https://placehold.co/600x400/e2e8f0/cbd5e1?text=Email+Feedback+Form" 
                      alt="Email Feedback Form" 
                      className="rounded-md"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {activeTab === "offline" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">QR-Based Offline Feedback</h3>
                  <p className="text-gray-600 mb-6">
                    Collect feedback from physical locations with QR codes. Perfect for retail stores, 
                    restaurants, and service centers.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">Generate unique QR codes per location</span>
                    </li>
                    <li className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">Mobile-optimized PWA form</span>
                    </li>
                    <li className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">Works offline with automatic sync</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center"
                  >
                    <img 
                      src="https://placehold.co/300x300/e2e8f0/cbd5e1?text=QR+Code" 
                      alt="QR Code" 
                      className="rounded-md mb-4 w-48 h-48"
                    />
                    <img 
                      src="https://placehold.co/300x500/e2e8f0/cbd5e1?text=Mobile+Feedback+Form" 
                      alt="Mobile Feedback Form" 
                      className="rounded-md h-64"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Powerful Admin Dashboard</h3>
                  <p className="text-gray-600 mb-6">
                    Manage all your feedback in one place with our intuitive dashboard. 
                    Get insights, respond to reviews, and track performance.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">Real-time analytics and reports</span>
                    </li>
                    <li className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">Filter and search reviews</span>
                    </li>
                    <li className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">Export data to CSV/Excel</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <img 
                      src="https://placehold.co/600x400/e2e8f0/cbd5e1?text=Admin+Dashboard" 
                      alt="Admin Dashboard" 
                      className="rounded-md"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to collect, manage, and leverage customer feedback
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: (
                 <MdEmail className="h-10 w-10 text-indigo-600" />
              ),
              title: "Email Feedback System",
              description: "Automatically send personalized feedback requests after purchases with order details."
            },
            {
              icon: (
                <MdQrCode className="h-10 w-10 text-indigo-600" />
              ),
              title: "QR Offline Feedback",
              description: "Collect feedback from physical locations with unique QR codes for each branch."
            },
            {
              icon: (
                <MdDashboard className="h-10 w-10 text-indigo-600" />
              ),
              title: "Admin Dashboard",
              description: "Comprehensive dashboard to manage all feedback with analytics and reporting."
            },
            {
              icon: (
                <MdQuestionAnswer className="h-10 w-10 text-indigo-600" />
              ),
              title: "Customizable Questions",
              description: "Tailor rating questions to your business needs with our admin panel."
            },
            {
              icon: (
                <MdWidgets className="h-10 w-10 text-indigo-600" />
              ),
              title: "Website Widget",
              description: "Display your ratings proudly with our customizable website widget."
            },
            {
              icon: (
                <MdImportExport className="h-10 w-10 text-indigo-600" />
              ),
              title: "Export & Integration",
              description: "Export your data or integrate with other tools via our API."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 rounded-2xl my-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Basic",
              price: "$19",
              period: "/month",
              limit: "50 reviews/month",
              features: [
                "Manual email feedback",
                "Basic widget",
                "Admin dashboard",
                "Email support"
              ],
              highlighted: false
            },
            {
              name: "Standard",
              price: "$49",
              period: "/month",
              limit: "150 reviews/month",
              features: [
                "Monthly email automation",
                "Advanced statistics",
                "More filters",
                "Priority support"
              ],
              highlighted: true
            },
            {
              name: "Premium",
              price: "$99",
              period: "/month",
              limit: "400 reviews/month",
              features: [
                "Custom branding",
                "Advanced analytics",
                "API access",
                "24/7 support",
                "Trust badges"
              ],
              highlighted: false
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`bg-white rounded-xl shadow-md overflow-hidden ${plan.highlighted ? "ring-2 ring-indigo-600 transform md:-translate-y-5" : ""}`}
            >
              <div className={`p-6 ${plan.highlighted ? "bg-indigo-600 text-white" : "bg-white text-gray-900"}`}>
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`ml-1 text-lg ${plan.highlighted ? "text-indigo-100" : "text-gray-500"}`}>{plan.period}</span>
                </div>
                <p className={`mb-6 ${plan.highlighted ? "text-indigo-100" : "text-gray-600"}`}>{plan.limit}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold ${plan.highlighted ? "bg-white text-indigo-600" : "bg-indigo-600 text-white"}`}
                >
                  Get Started
                </motion.button>
              </div>
              <div className="p-6 bg-gray-50">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <MdCheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Customer Feedback?</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Join hundreds of businesses that trust FeedbackPro to collect and analyze their customer feedback.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg"
          >
            Start Your Free 14-Day Trial
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MdInfo className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">FeedbackPro</span>
              </div>
              <p className="text-gray-400">
                The complete solution for collecting and managing customer feedback.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2023 FeedbackPro. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;