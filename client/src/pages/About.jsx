import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div dir='rtl' className="min-h-screen bg-slate-50 pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">درباره هوم‌چک</h1>
        <p className="text-slate-600">داستان ما و تیم متخصصان پزشکی ما.</p>
      </div>
      <Footer />
    </div>
  );
}