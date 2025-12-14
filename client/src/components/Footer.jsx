import React from "react";
import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12 text-right">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-teal-600 w-6 h-6" />
              <span className="text-xl font-bold text-slate-800">هوم‌چک</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm text-sm">
              هوم‌چک، سامانه هوشمند ارائه خدمات آزمایشگاهی و پزشکی در محل است که با بهره‌گیری از تکنولوژی و کادر مجرب، سلامتی را به خانه شما می‌آورد.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li><Link to="/services" className="hover:text-teal-600 transition-colors">خدمات چکاپ</Link></li>
              <li><Link to="/health-record" className="hover:text-teal-600 transition-colors">پرونده سلامت</Link></li>
              <li><Link to="/about" className="hover:text-teal-600 transition-colors">درباره ما</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-4">پشتیبانی</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li><span className="block">تلفن: ۰۲۱-۸۸۸۸۸۸۸۸</span></li>
              <li><span className="block">ایمیل: support@homecheck.ir</span></li>
              <li><Link to="/contact" className="hover:text-teal-600">تماس با ما</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <p>© ۱۴۰۴ تمامی حقوق برای هوم‌چک محفوظ است.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-slate-600">قوانین و مقررات</span>
            <span className="cursor-pointer hover:text-slate-600">حریم خصوصی</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
