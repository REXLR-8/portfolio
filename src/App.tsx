import React, { useEffect, useState } from 'react';
import { 
  Code, 
  Briefcase, 
  PenTool, 
  Database, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin,
  Check,
  X
} from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
      valid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send the form data to your backend here
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: '',
        message: ''
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Close mobile menu after clicking a link
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Code className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Hassam Ahmed</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-indigo-600 transition-colors">Services</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-indigo-600 transition-colors">Testimonials</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-indigo-600 transition-colors">Portfolio</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</button>
          </div>
          <button onClick={() => scrollToSection('contact')} className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Hire Me
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-full left-0 right-0 z-50 transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-indigo-600 transition-colors py-2 text-left">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-indigo-600 transition-colors py-2 text-left">Testimonials</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-indigo-600 transition-colors py-2 text-left">Portfolio</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-indigo-600 transition-colors py-2 text-left">Contact</button>
              <button onClick={() => scrollToSection('contact')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full text-center mt-2">
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-20 md:pb-32 bg-gradient-to-br from-indigo-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Transforming Ideas Into Digital Excellence
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                I craft high-performance, beautiful digital solutions that help businesses grow and succeed in today's competitive landscape.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors shadow-lg hover:shadow-xl"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="border border-gray-300 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 font-medium py-3 px-6 rounded-md transition-colors"
                >
                  View My Work
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Professional headshot" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-100 rounded-full opacity-50 z-0"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-indigo-200 rounded-full opacity-50 z-0"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I offer comprehensive solutions tailored to your specific needs and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Web Development</h3>
              <p className="text-gray-600 mb-6">
                I build responsive, high-performance websites and web applications using modern technologies. From simple landing pages to complex web apps, I deliver solutions that drive results and provide exceptional user experiences.
              </p>
              <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
                Learn More <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <PenTool className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">UI/UX Design</h3>
              <p className="text-gray-600 mb-6">
                I create intuitive, engaging user interfaces and experiences that delight users and achieve business goals. My design process focuses on user research, wireframing, prototyping, and iterative testing to ensure optimal results.
              </p>
              <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
                Learn More <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Strategy</h3>
              <p className="text-gray-600 mb-6">
                I help businesses develop comprehensive digital strategies that align with their goals. From market analysis and competitor research to implementation roadmaps, I provide the guidance needed to succeed in the digital landscape.
              </p>
              <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
                Learn More <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take my word for it. Here's what my clients have to say.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600">CEO, TechStart Inc.</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Working with Hassam was a game-changer for our business. Our new website increased conversions by 45% and significantly improved our brand perception. The entire process was smooth and professional."
              </p>
              <p className="text-sm text-gray-500">E-commerce Website Redesign</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Michael Chen" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-600">Marketing Director, GrowthLabs</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Hassam delivered our project ahead of schedule and exceeded our expectations. The custom CRM solution helped us streamline operations and reduce administrative costs by 30%. Highly recommended!"
              </p>
              <p className="text-sm text-gray-500">Custom CRM Development</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80" 
                  alt="Emily Rodriguez" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Emily Rodriguez</h4>
                  <p className="text-gray-600">Founder, DesignMatters</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The UI/UX redesign Hassam created for our app resulted in a 60% increase in user engagement and a significant decrease in bounce rate. The attention to detail and user-centered approach made all the difference."
              </p>
              <p className="text-sm text-gray-500">Mobile App UI/UX Redesign</p>
            </div>
          </div>
          
          {/* Client Logos */}
          {/* <div className="mt-20">
            <p className="text-center text-gray-600 mb-8">Trusted by innovative companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <svg className="h-8 md:h-10" viewBox="0 0 124 24" fill="#000">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  <path d="M36 6h-4v12h4c3.314 0 6-2.686 6-6s-2.686-6-6-6zm0 10h-2V8h2c2.206 0 4 1.794 4 4s-1.794 4-4 4zM54 6h-8v12h2v-5h6v-2h-6V8h6V6zM64 6h-6v12h6v-2h-4v-3h4v-2h-4V8h4V6zM78 6h-8v12h2v-5h6v-2h-6V8h6V6zM92 6h-8v12h2v-5h6v-2h-6V8h6V6zM106 6h-6v12h2v-4h4c1.657 0 3-1.343 3-3s-1.343-3-3-3zm0 4h-4V8h4c.552 0 1 .448 1 1s-.448 1-1 1zM124 14h-4v-2h4v-2h-4V8h4V6h-6v12h6v-2z"/>
                </svg>
              </div>
              <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <svg className="h-8 md:h-10" viewBox="0 0 124 24" fill="#000">
                  <path d="M6 6h12v2H6zM6 11h12v2H6zM6 16h12v2H6zM36 6h-8v12h2v-5h6v-2h-6V8h6V6zM46 6h-2v12h2V6zM56 6h-2v12h8v-2h-6V6zM78 6h-8v12h8v-2h-6v-3h5v-2h-5V8h6V6zM92 6h-8v12h2v-5h6v-2h-6V8h6V6zM106 6h-8v12h8v-2h-6v-3h5v-2h-5V8h6V6zM124 6h-8v12h2v-5h6v-2h-6V8h6V6z"/>
                </svg>
              </div>
              <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <svg className="h-8 md:h-10" viewBox="0 0 124 24" fill="#000">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM36 6h-4v12h4c3.314 0 6-2.686 6-6s-2.686-6-6-6zm0 10h-2V8h2c2.206 0 4 1.794 4 4s-1.794 4-4 4zM54 6h-8v12h2v-5h6v-2h-6V8h6V6zM70 6h-6v12h6c3.314 0 6-2.686 6-6s-2.686-6-6-6zm0 10h-4V8h4c2.206 0 4 1.794 4 4s-1.794 4-4 4zM92 6h-8v12h8v-2h-6v-3h5v-2h-5V8h6V6zM106 6h-6v12h2v-4h4c1.657 0 3-1.343 3-3s-1.343-3-3-3zm0 4h-4V8h4c.552 0 1 .448 1 1s-.448 1-1 1zM124 6h-8v12h8v-2h-6v-3h5v-2h-5V8h6V6z"/>
                </svg>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a look at some of my recent work and the results achieved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="E-commerce Website Redesign" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-indigo-900 bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-indigo-600 font-medium py-2 px-4 rounded-md">View Case Study</button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">E-commerce Website Redesign</h3>
                <p className="text-gray-600 mb-4">
                  Complete redesign and development of an e-commerce platform for a fashion retailer.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">React</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Node.js</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Shopify</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-gray-700">45% increase in conversion rate</p>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-gray-700">32% reduction in bounce rate</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Mobile Banking App" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-indigo-900 bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-indigo-600 font-medium py-2 px-4 rounded-md">View Case Study</button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile Banking App</h3>
                <p className="text-gray-600 mb-4">
                  Design and development of a mobile banking application with advanced security features.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">React Native</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">TypeScript</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Firebase</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-gray-700">60% increase in mobile transactions</p>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-gray-700">4.8/5 average user rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-6 rounded-md transition-colors">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a project in mind? Get in touch and let's create something amazing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. I'll get back to you within 24-48 hours.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${formErrors.projectType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                      <option value="">Select project type</option>
                      <option value="website">Website Development</option>
                      <option value="app">Mobile App</option>
                      <option value="design">UI/UX Design</option>
                      <option value="consulting">Digital Strategy</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.projectType && <p className="mt-1 text-sm text-red-600">{formErrors.projectType}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-2 border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Tell me about your project..."
                    ></textarea>
                    {formErrors.message && <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
            
            <div>
              <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700">hello@hassam.dev</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-700">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-700">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Availability</h3>
                <p className="text-gray-600 mb-4">
                  I'm currently available for freelance projects starting in:
                </p>
                <div className="bg-green-100 text-green-800 font-medium py-2 px-4 rounded-md inline-block mb-6">
                  Available from June 2025
                </div>
                <p className="text-gray-600">
                  For urgent projects or consultations, please mention this in your message and I'll do my best to accommodate your timeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Code className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">Hassam Ahmed</span>
            </div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Hassam Ahmed. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;