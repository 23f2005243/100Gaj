import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import RealEstateBackground from '../components/RealEstateBackground';

export default function About() {
  const stats = [];

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <RealEstateBackground variant="default" />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 relative z-10">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-light-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-light-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-200 rounded-2xl mb-6 shadow-lg">
            <img
              src="/Logo.jpg"
              alt="100 Gaj Estate Logo"
              className="w-20 h-20 object-contain rounded"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About -<span className="text-light-orange-400">100 GajEstate</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            We are a leading real estate agency dedicated to helping clients find their perfect properties.
            With years of experience and a passion for real estate, we make your dreams come true.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-slate-700" />
                </div>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
              <p className="text-slate-600 mb-4">
                At 100 GajEstate, our mission is to provide exceptional real estate services
                that help our clients achieve their goals. Whether you're buying, selling, or renting,
                we're here to guide you every step of the way.
              </p>
              <p className="text-slate-600 mb-6">
                We believe in transparency, integrity, and delivering results. Our team of experts
                is dedicated to making your real estate journey smooth and successful.
              </p>

            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
                alt="Modern building"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>





      {/* Contact CTA */}
      <div className="bg-blue-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-slate-700 mb-8">Contact us today and let us help you find the perfect property</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=gajestatesupport@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-300 border-2 border-slate-700 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-slate-700 transition-all"
            >
              <FaEnvelope />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
