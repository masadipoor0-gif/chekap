import React, { useState } from "react"; // useState را ایمپورت کنید
import { Link, useNavigate } from "react-router-dom";
import { Activity, Stethoscope, Menu, X } from "lucide-react"; // آیکون‌های Menu و X را اضافه کنید

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // وضعیت منوی موبایل

  const navItems = [
    { name: "خدمات چکاپ", path: "/services" },
    { name: "پرونده سلامت", path: "/health-record" },
    { name: "پایش سلامت", path: "/health-monitoring" },
    { name: "مجله‌سلامت", path: "/blog" },
    { name: "درباره ما", path: "/about" },
    { name: "تماس با ما", path: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="bg-teal-50 p-2 rounded-xl">
            <Activity className="text-teal-600 w-8 h-8" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-700">
            هوم‌چک
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-8 text-slate-600 font-medium text-sm">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="hover:text-teal-600 transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Actions (Desktop & Mobile) */}
        <div className="flex gap-4 items-center">
          <Link
            to="/login"
            className="hidden md:block text-slate-600 hover:text-blue-600 font-medium cursor-pointer transition-colors"
          >
            ورود
          </Link>
          
          <button
            onClick={() => navigate("/request")}
            className="hidden sm:flex px-6 py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white cursor-pointer rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/30 transition-all transform hover:-translate-y-0.5 items-center gap-2 text-sm"
          >
            درخواست چکاپ
            <Stethoscope size={18} />
          </button>

          {/* Hamburger Icon (Mobile) */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-teal-600"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Drawer --- */}
      <div 
        className={`md:hidden absolute w-full bg-white transition-all duration-300 ease-in-out border-t border-slate-100 shadow-xl ${
          isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="flex flex-col gap-4 px-4 pb-4">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="text-slate-700 font-medium py-2 border-b border-slate-50 hover:text-teal-600"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="text-slate-700 font-medium py-2 border-b border-slate-50 hover:text-blue-600"
            onClick={toggleMenu}
          >
            ورود
          </Link>
        </nav>
      </div>
    </header>
  );
}