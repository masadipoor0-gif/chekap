import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, User, CalendarDays, MapPin, Package, DollarSign, Stethoscope, Clock, UserCheck } from 'lucide-react';
import moment from 'jalali-moment'; // <<-- ایمپورت جدید برای تاریخ شمسی

// --- داده‌های ثابت (Mock Data) ---
const checkupOptions = [
  { id: 1, name: "چکاپ کامل پایه (Full Panel)", price: 850000, description: "بررسی خون، کبد، کلیه و چربی" },
  { id: 2, name: "چکاپ اختصاصی قلب (Cardio Check)", price: 1200000, description: "تست‌های تخصصی قلب و عروق" },
  { id: 3, name: "چکاپ دیابت و قند (Diabetes Panel)", price: 600000, description: "آزمایش قند خون و A1C" },
];

const genderOptions = [
  { value: 'male', label: 'آقا', icon: <User size={20} /> },
  { value: 'female', label: 'خانم', icon: <User size={20} /> },
  { value: 'any', label: 'فرقی نمی‌کند', icon: <UserCheck size={20} /> },
];

const timeSlots = [
  '۰۸:۰۰ - ۱۰:۰۰',
  '۱۰:۰۰ - ۱۲:۰۰',
  '۱۲:۰۰ - ۱۴:۰۰',
  '۱۴:۰۰ - ۱۶:۰۰',
];

// --- کامپوننت Stepper (روند مرحله‌ای) ---
const Stepper = ({ currentStep }) => {
    const steps = [
      { name: "نوع چکاپ", icon: Package },
      { name: "انتخاب کادر", icon: Stethoscope },
      { name: "زمان مراجعه", icon: CalendarDays },
      { name: "آدرس و نهایی‌سازی", icon: MapPin },
    ];
  
    return (
      <div className="flex flex-col space-y-4 pr-4 border-r-2 border-slate-200">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* دایره وضعیت */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center -mr-4 transition-colors duration-300 ${
              index <= currentStep ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'
            }`}>
              {index < currentStep ? <ChevronLeft size={16} /> : <step.icon size={16} />}
            </div>
            {/* عنوان مرحله */}
            <span className={`mr-6 font-bold text-sm transition-colors duration-300 ${
              index === currentStep ? 'text-teal-600' : 'text-slate-500'
            }`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
// --- کامپوننت جعبه خلاصه سفارش (سمت چپ) ---
const SummaryBox = ({ order }) => {
    const total = order.checkup ? order.checkup.price : 0;
  
    const items = [
      { label: "چکاپ انتخابی", value: order.checkup?.name, icon: Package },
      { label: "کادر نمونه‌گیر", value: order.gender === 'male' ? 'آقا' : order.gender === 'female' ? 'خانم' : 'فرقی نمی‌کند', icon: Stethoscope },
      { label: "تاریخ مراجعه", value: order.date ? moment(order.date).format('dddd، jD jMMMM') : null, icon: CalendarDays },
      { label: "بازه زمانی", value: order.time, icon: Clock },
      { label: "آدرس دقیق", value: order.address, icon: MapPin },
    ];
  
    return (
      <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 h-fit">
        <h3 className="text-xl font-bold mb-6 text-teal-700 border-b pb-3">خلاصه سفارش شما</h3>
  
        <div className="space-y-4">
          {items.map((item, index) => (
            // فیلتر کردن آیتم‌های خالی
            (item.value && item.value !== 'null' && item.value !== 'فرقی نمی‌کند' && item.value !== '') && (
              <div key={index} className="flex justify-between items-start text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <item.icon size={18} className="text-teal-500" />
                  <span>{item.label}</span>
                </div>
                <span className="font-medium text-slate-800 text-right max-w-[50%]">{item.value}</span>
              </div>
            )
          ))}
        </div>
  
        <div className="mt-8 pt-4 border-t border-dashed">
          <div className="flex justify-between items-center font-bold text-lg">
            <span>مبلغ نهایی:</span>
            <span className="text-2xl text-teal-600">{total.toLocaleString('fa-IR')} <span className="text-base font-medium">تومان</span></span>
          </div>
        </div>
      </div>
    );
  };

// --- کامپوننت اصلی درخواست (فرم) ---
export default function Request() {
  const [step, setStep] = useState(0); 
  const [order, setOrder] = useState({
    checkup: null,
    gender: null,
    date: null, // تاریخ شمسی
    time: null,
    address: '',
  });
  const [showSummary, setShowSummary] = useState(false); 
  
  // --- Date Picker Logic (Jalali) ---
  const [currentDate, setCurrentDate] = useState(moment());

  const getWeekDays = (start) => {
    const days = [];
    let current = moment(start).startOf('jWeek'); // شروع هفته شمسی (شنبه)
    for (let i = 0; i < 7; i++) {
      days.push(current.clone().add(i, 'days'));
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);

  const handleDateChange = (date) => {
    // فقط روزهایی که هنوز نرسیده‌اند قابل انتخاب باشند
    if (moment(date).isBefore(moment(), 'day')) return; 
    setOrder(prev => ({ ...prev, date: date.format('YYYY/MM/DD') }));
  };

  const nextWeek = () => {
    setCurrentDate(prev => prev.clone().add(7, 'days'));
  };

  const prevWeek = () => {
    // جلوگیری از رفتن به هفته‌های گذشته
    if (moment(currentDate).subtract(7, 'days').isBefore(moment(), 'week')) {
      setCurrentDate(moment());
    } else {
      setCurrentDate(prev => prev.clone().subtract(7, 'days'));
    }
  };
  // --- End Date Picker Logic ---

  const handleNext = () => {
    // اعتبارسنجی ساده
    if (step === 0 && !order.checkup) return alert("لطفاً نوع چکاپ را انتخاب کنید.");
    if (step === 1 && !order.gender) return alert("لطفاً نوع کادر را انتخاب کنید.");
    if (step === 2 && (!order.date || !order.time)) return alert("لطفاً تاریخ و بازه زمانی را مشخص کنید.");

    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handleConfirmOrder = () => {
    if (order.address.length < 10) {
      return alert("لطفاً آدرس دقیق خود را وارد کنید.");
    }
    setShowSummary(true); 
  };

  // --- رندرینگ مراحل فرم ---
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">۱. نوع چکاپ مورد نظر خود را انتخاب کنید</h2>
            {checkupOptions.map(option => (
              <div
                key={option.id}
                className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                  order.checkup?.id === option.id ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-slate-200 hover:border-teal-300'
                }`}
                onClick={() => setOrder(prev => ({ ...prev, checkup: option }))}
              >
                {/* ... (محتوای چکاپ) ... */}
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-slate-800">{option.name}</h3>
                    <span className="font-extrabold text-teal-600 text-xl">{option.price.toLocaleString('fa-IR')} <span className="text-sm font-medium text-slate-500">تومان</span></span>
                </div>
                <p className="text-slate-500 text-sm mt-1">{option.description}</p>
              </div>
            ))}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">۲. ترجیح می‌دهید کادر نمونه‌گیر آقا باشد یا خانم؟</h2>
            <div className="grid grid-cols-3 gap-4">
              {genderOptions.map(option => (
                <div
                  key={option.value}
                  className={`flex flex-col items-center justify-center p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all h-28 md:h-32 text-sm ${
                    order.gender === option.value ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-200 hover:border-blue-300'
                  }`}
                  onClick={() => setOrder(prev => ({ ...prev, gender: option.value }))}
                >
                  <div className={`p-2 rounded-full mb-1 ${order.gender === option.value ? 'bg-blue-200' : 'bg-slate-100'}`}>
                    {option.icon}
                  </div>
                  <span className="font-medium text-center">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">۳. زمان مناسب برای مراجعه کادر را انتخاب کنید</h2>
            
            {/* تقویم هفتگی (ریسپانسیو) */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h3 className="font-bold text-base md:text-lg text-slate-700">انتخاب روز ({currentDate.format('jMMMM jYYYY')})</h3>
                <div className="flex gap-2">
                  <button onClick={prevWeek} className="p-2 border rounded-lg hover:bg-white transition-colors" disabled={moment(currentDate).isSame(moment(), 'week')}><ChevronRight size={18} /></button>
                  <button onClick={nextWeek} className="p-2 border rounded-lg hover:bg-white transition-colors"><ChevronLeft size={18} /></button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
                {weekDays.map((day, index) => {
                    const isSelected = day.format('YYYY/MM/DD') === order.date;
                    const isPassed = day.isBefore(moment(), 'day');
                    
                    return (
                        <div
                            key={index}
                            className={`p-1 md:p-2 rounded-lg md:rounded-xl cursor-pointer transition-all border-2 text-xs md:text-sm ${
                            isSelected
                                ? 'bg-teal-600 text-white border-teal-600 shadow-lg'
                                : isPassed
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                                : day.isSame(moment(), 'day')
                                ? 'bg-yellow-50 text-slate-800 border-yellow-300 hover:bg-yellow-100'
                                : 'bg-white text-slate-600 border-slate-100 hover:border-teal-300 hover:bg-teal-50'
                            }`}
                            onClick={() => !isPassed && handleDateChange(day)}
                        >
                            <span className="font-bold block">{day.format('ddd')}</span>
                            <span className="text-xs opacity-80 block">{day.format('jD')}</span>
                        </div>
                    )
                })}
              </div>
            </div>

            {/* بازه‌های ساعتی */}
            <div className="pt-4">
              <h3 className="font-bold text-lg mb-4 text-slate-700">انتخاب بازه ساعتی</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.map(slot => (
                  <div
                    key={slot}
                    className={`p-3 border-2 rounded-xl cursor-pointer text-center transition-all font-medium text-sm ${
                      order.time === slot ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-300'
                    }`}
                    onClick={() => setOrder(prev => ({ ...prev, time: slot }))}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">۴. آدرس محل نمونه‌گیری و نهایی‌سازی</h2>
            <div className="space-y-4">
              <label htmlFor="address" className="block font-medium text-slate-700">آدرس دقیق پستی</label>
              <textarea
                id="address"
                rows="4"
                className="w-full p-4 border border-slate-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 resize-none"
                placeholder="مثال: تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۰، واحد ۵"
                value={order.address}
                onChange={(e) => setOrder(prev => ({ ...prev, address: e.target.value }))}
              ></textarea>
            </div>
            
            <button
                onClick={handleConfirmOrder}
                className="w-full px-6 py-4 bg-teal-600 text-white rounded-xl text-lg font-bold hover:bg-teal-700 transition-all transform hover:shadow-lg"
            >
                ثبت نهایی آدرس و مشاهده پیش‌فاکتور
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // --- رندرینگ نهایی ---
  return (
    <div dir="rtl" className="flex flex-col min-h-screen bg-white font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-28 md:py-32 flex-grow">
        
        {/* حالت نهایی (Full Summary) */}
        {showSummary ? (
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-extrabold text-teal-700 mb-8 md:mb-10 text-center">تایید نهایی سفارش و پرداخت</h1>
            <div className="flex justify-center">
                <div className="w-full max-w-xl md:max-w-2xl">
                    <SummaryBox order={order} />
                    <div className="mt-8 flex flex-col gap-4">
                        <button 
                            className="w-full px-8 py-4 bg-green-600 text-white rounded-xl text-xl font-bold hover:bg-green-700 transition-colors"
                            onClick={() => alert("انتقال به صفحه پرداخت...")}
                        >
                            تایید و پرداخت ({order.checkup.price.toLocaleString('fa-IR')} تومان)
                        </button>
                         <button 
                            className="w-full px-8 py-3 bg-white border border-slate-300 text-slate-600 rounded-xl text-lg font-bold hover:bg-slate-50 transition-colors"
                            onClick={() => { setShowSummary(false); setStep(0); }}
                        >
                            ویرایش سفارش
                        </button>
                    </div>
                </div>
            </div>
          </div>
        ) : (
          /* حالت چند مرحله‌ای: دو ستون (در موبایل تک ستون) */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            
            {/* ستون چپ: خلاصه سفارش و Stepper (فقط دسکتاپ) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                 <Stepper currentStep={step} />
                 <div className='mt-10'>
                    <SummaryBox order={order} />
                 </div>
              </div>
            </div>
            
            {/* ستون راست: فرم مرحله‌ای (باکس اصلی) */}
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100">
              
              {/* خلاصه کوچک در موبایل */}
              <div className='lg:hidden mb-6'>
                 <h3 className='font-bold text-teal-600 text-lg border-b pb-2 mb-4'>مرحله {step + 1} از ۴</h3>
                 <p className='text-sm text-slate-500'>چکاپ: <span className='font-bold text-slate-700'>{order.checkup?.name || 'انتخاب نشده'}</span></p>
                 <p className='text-sm text-slate-500'>تاریخ: <span className='font-bold text-slate-700'>{order.date ? moment(order.date, 'YYYY/MM/DD').format('dddd، jD jMMMM') : 'انتخاب نشده'}</span></p>
              </div>

              {renderStepContent()}

              {/* دکمه‌های ناوبری بین مراحل */}
              <div className="mt-8 pt-4 border-t flex justify-between">
                <button
                  onClick={() => setStep(prev => prev - 1)}
                  disabled={step === 0}
                  className={`flex items-center gap-1 px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                    step === 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ChevronRight size={18} />
                  مرحله قبل
                </button>

                <button
                  onClick={handleNext}
                  disabled={step === 3}
                  className={`flex items-center gap-1 px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all ${
                    step === 3
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-teal-600 text-white hover:bg-teal-700 shadow-md'
                  }`}
                >
                  {step === 2 ? 'تایید و آدرس' : 'مرحله بعد'}
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}