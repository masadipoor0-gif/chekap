import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Activity, 
  Home, 
  Building2, 
  ChevronLeft, 
  CheckCircle2,
  BrainCircuit,
  FileHeart,
  Microscope,
  Phone,
  UserCheck,
  BellRing
} from "lucide-react";
import Navbar from "../components/Navbar"; // ایمپورت نوبار
import Footer from "../components/Footer"; // ایمپورت فوتر

// --- ANIMATION VARIANTS (همان انیمیشن‌های قبلی) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const scaleOnHover = {
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-white text-slate-800 overflow-x-hidden font-sans">
      
      {/* استفاده از کامپوننت نوبار */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-60 -z-10 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 -z-10 -translate-x-1/3 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-right space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              مدرن‌ترین سامانه پایش سلامت در کشور
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-slate-900">
                سلامتی شما، <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-teal-500 to-blue-600">بدون خروج از خانه </span>
                 تضمین می‌شود
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              از چکاپ کامل در منزل تا تحلیل هوشمند آزمایش‌ها توسط هوش مصنوعی. 
              ما نه‌تنها آزمایش می‌گیریم، بلکه با <span className="font-bold text-slate-800">پرونده سلامت دیجیتال</span>، مراقب همیشگی قلب و جان شما هستیم.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => navigate("/request")} className="flex items-center cursor-pointer justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl text-lg font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1">
                درخواست چکاپ
                <ChevronLeft size={20} />
              </button>
              <button className="flex items-center cursor-pointer justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl text-lg font-bold hover:border-teal-200 hover:bg-teal-50 transition-all">
               نمونه تحلیل هوشمند
               <BrainCircuit size={20} className="text-teal-600"/>
              </button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3]">
                 <img src="/Picture2.png" alt="پزشک در حال چکاپ در منزل" className="w-full h-full object-cover" />
                 
                 {/* Floating Card: Heart Rate */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute top-10 right-8 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-red-50 flex items-center gap-3"
                 >
                    <div className="bg-red-100 p-2 rounded-full text-red-500"><Activity size={24}/></div>
                    <div>
                        <p className="text-xs text-gray-500">ضربان قلب</p>
                        <p className="font-bold text-slate-800">نرمال (۷۲)</p>
                    </div>
                 </motion.div>

                 {/* Floating Card: Result Ready */}
                 <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                    className="absolute bottom-10 left-8 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-green-50 flex items-center gap-3"
                 >
                    <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle2 size={24}/></div>
                    <div>
                        <p className="text-xs text-gray-500">نتیجه آزمایش</p>
                        <p className="font-bold text-slate-800">آماده دانلود</p>
                    </div>
                 </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES PREVIEW (گزیده خدمات در صفحه اصلی) --- */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">خدمات جامع هوم‌چک</h2>
            <p className="text-slate-500">پوشش کامل نیازهای پزشکی شما، در هر مکان و زمان</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Service 1 */}
            <motion.div variants={fadeInUp} whileHover="hover" className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-teal-100 transition-all group">
               <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                 <Home size={32} />
               </div>
               <h3 className="text-xl font-bold mb-3 text-slate-800">چکاپ در منزل</h3>
               <p className="text-slate-500 leading-relaxed text-sm">
                 بدون ترافیک و صف انتظار. پرستاران مجرب ما برای نمونه‌گیری خون، تست فشار و نوار قلب به خانه شما می‌آیند.
               </p>
            </motion.div>

            {/* Service 2 */}
            <motion.div variants={fadeInUp} whileHover="hover" className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[2rem] shadow-lg text-white md:-translate-y-4 relative overflow-hidden group">
               <div className="absolute top-0 right-0 bg-white/10 w-32 h-32 rounded-full blur-2xl -mr-10 -mt-10"></div>
               <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white mb-6">
                 <Building2 size={32} />
               </div>
               <h3 className="text-xl font-bold mb-3">چکاپ سازمانی</h3>
               <p className="text-blue-100 leading-relaxed text-sm">
                 ارتقای سلامت کارکنان با بسته‌های ویژه شرکتی. گزارش تحلیلی سلامت سازمان و پایش دوره‌ای پرسنل در محل کار.
               </p>
            </motion.div>

            {/* Service 3 */}
            <motion.div variants={fadeInUp} whileHover="hover" className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-100 transition-all group">
               <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                 <Activity size={32} />
               </div>
               <h3 className="text-xl font-bold mb-3 text-slate-800">پایش مداوم سلامت</h3>
               <p className="text-slate-500 leading-relaxed text-sm">
                 ثبت علائم حیاتی، یادآوری زمان داروها و چکاپ‌های دوره‌ای. ما مثل یک دستیار هوشمند مراقب سلامتی شما هستیم.
               </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SMART FEATURES (ZigZag) --- */}
      <section id="features" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
            
            {/* Feature 1: Digital Record */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full lg:w-1/2 relative"
                >
                    {/* Mockup Image */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 aspect-video flex items-center justify-center">
                         <img src="/pic1.jpg" alt="داشبورد پرونده پزشکی" className="object-cover w-full h-full" />
                         {/* Optional Overlay UI Element */}
                         <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg flex gap-4 items-center animate-bounce-slow">
                             <div className="h-2 w-20 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="h-full w-2/3 bg-green-500 rounded-full"></div>
                             </div>
                             <span className="text-xs font-bold text-green-600">وضعیت پایدار</span>
                         </div>
                    </div>
                </motion.div>
                
                <div className="w-full lg:w-1/2 text-right">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                        <FileHeart size={24} />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
                        پرونده پزشکی شما، <br/>
                        <span className="text-teal-600">همیشه همراه شماست</span>
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-loose">
                        دیگر نگران گم شدن جواب آزمایش‌های قدیمی نباشید. تمام سوابق پزشکی، نتایج چکاپ‌ها و تصاویر رادیولوژی شما در یک پروفایل امن و رمزنگاری شده ذخیره می‌شود.
                    </p>
                    <ul className="space-y-4">
                        {["دسترسی ۲۴ ساعته به سوابق", "نمودار تغییرات فاکتورهای خونی (قند، چربی و...)", "قابلیت اشتراک‌گذاری امن با پزشک متخصص"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                <CheckCircle2 size={18} className="text-teal-500"/>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Feature 2: AI Analysis */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
                <div className="w-full lg:w-1/2 text-right">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                        <BrainCircuit size={24} />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
                        تحلیل هوشمند نتایج <br/>
                        <span className="text-purple-600">فراتر از اعداد معمولی</span>
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-loose">
                        ما فقط اعداد آزمایش را به شما نمی‌دهیم. هوش مصنوعی هوم‌چک با تحلیل دقیق، به شما می‌گوید که هر عدد چه معنایی دارد و برای بهبود آن چه تغییری در سبک زندگی خود باید ایجاد کنید.
                    </p>
                    <div className="flex gap-4">
                         <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 w-full">
                            <h4 className="font-bold text-purple-800 mb-1 flex items-center gap-2"><Microscope size={16}/> تفسیر خودکار</h4>
                            <p className="text-xs text-purple-600">تبدیل اصطلاحات پزشکی به زبان ساده</p>
                         </div>
                         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 w-full">
                            <h4 className="font-bold text-orange-800 mb-1 flex items-center gap-2"><BellRing size={16}/> هشدار خطر</h4>
                            <p className="text-xs text-orange-600">شناسایی فوری موارد اورژانسی</p>
                         </div>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full lg:w-1/2 relative"
                >
                     <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white aspect-video flex items-center justify-center p-6">
                         {/* Mock UI for AI Analysis */}
                         <div className="w-full h-full bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white"><BrainCircuit size={16}/></div>
                                <span className="text-sm font-bold">تحلیلگر هوشمند</span>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-200 rounded w-full"></div>
                                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-100 mt-4">
                                    تذکر: سطح ویتامین D شما کمتر از حد نرمال است. پیشنهاد می‌شود...
                                </div>
                            </div>
                         </div>
                    </div>
                </motion.div>
            </div>

        </div>
      </section>

      {/* --- PROCESS STEPS --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4fd1c5 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold mb-4">فرایند ساده چکاپ با هوم‌چک</h2>
               <p className="text-slate-400">تنها ۴ مرحله تا اطمینان از سلامتی</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[
                 { icon: <Phone size={24}/>, title: "۱. ثبت درخواست", desc: "انتخاب نوع چکاپ در سایت یا اپلیکیشن" },
                 { icon: <UserCheck size={24}/>, title: "۲. اعزام نمونه‌گیر", desc: "حضور متخصص در زمان و مکان دلخواه" },
                 { icon: <Microscope size={24}/>, title: "۳. انجام آزمایش", desc: "بررسی نمونه‌ها در آزمایشگاه‌های معتبر" },
                 { icon: <FileHeart size={24}/>, title: "۴. دریافت نتیجه", desc: "مشاهده گزارش و تحلیل در پنل کاربری" }
               ].map((step, index) => (
                 <motion.div 
                    key={index} 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                 >
                    <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-teal-500 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-teal-500/20">
                            {step.icon}
                        </div>
                        <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                        <p className="text-slate-400 text-sm">{step.desc}</p>
                    </div>
                    {/* Arrow for Desktop */}
                    {index < 3 && (
                        <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2 text-slate-600">
                           <ChevronLeft size={24} />
                        </div>
                    )}
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-teal-500 to-blue-600 rounded-[3rem] p-10 lg:p-16 text-center text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 relative z-10">نوبت به سلامتی خودتان رسیده!</h2>
          <p className="text-teal-50 text-xl mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
            همین حالا اولین پروفایل سلامت خود را ایجاد کنید و از وضعیت جسمانی خود باخبر شوید. پیشگیری، همیشه ارزان‌تر از درمان است.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <button onClick={() => navigate("/request")} className="bg-white cursor-pointer text-blue-700 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 hover:scale-105 transition-all shadow-xl">
                درخواست چکاپ
              </button>
              <button className="bg-blue-700/50 backdrop-blur border border-white/30 cursor-pointer text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all">
                مشاوره تلفنی
              </button>
          </div>
        </div>
      </section>

      {/* استفاده از کامپوننت فوتر */}
      <Footer />

    </div>
  );
}