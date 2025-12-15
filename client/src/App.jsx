import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from "./pages/Landing.jsx"
import Services from './pages/Services';
import HealthRecord from './pages/HealthRecord';
import HealthMonitoring from './pages/healthMonitoring.jsx';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Request from './pages/Request';

function App() {
  return (
    // <Router> را حذف کردیم!
    <div className="app-container">
      {/* Navbar را می توانید در اینجا یا داخل هر صفحه قرار دهید */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/health-record" element={<HealthRecord />} />
        <Route path="/health-monitoring" element={<HealthMonitoring />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<Request />} />
        {/* برای صفحاتی که وجود ندارند */}
        <Route path="*" element={<div className="text-center pt-24">404 - صفحه پیدا نشد</div>} />
      </Routes>
    </div>
    // تگ بسته شدن </Router> را هم حذف کردیم
  );
}

export default App;