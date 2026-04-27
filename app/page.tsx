'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, ChevronRight, X, CheckCircle2, Star, ShieldCheck } from 'lucide-react';

export default function LubaSpaBooking() {
  const [step, setStep] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    service: 'Masaje Relajante'
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!bookingData.name || !bookingData.phone) return;
    setLoading(true);
    // 1.5초간 가짜 로딩 처리 (신뢰도 향상용)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStep(3);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#2C2C2C] font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {/* STEP 0: 랜딩 페이지 */}
        {step === 0 && (
          <motion.div 
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-screen p-8 text-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-[#D4A373] rounded-full mb-8 flex items-center justify-center shadow-2xl ring-8 ring-[#D4A373]/10"
            >
              <span className="text-white text-4xl font-serif italic">L</span>
            </motion.div>

            <h1 className="text-5xl font-bold tracking-tighter mb-3 italic font-serif text-[#2C2C2C]">LUBA SPA</h1>
            <p className="text-[#D4A373] font-medium tracking-[0.3em] text-xs mb-4 uppercase">Relax & Wellness Experience</p>
            
            <div className="flex items-center gap-2 mb-10 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <Star size={14} className="fill-[#D4A373] text-[#D4A373]" />
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">Ambiente profesional y relajante</span>
            </div>

            <button 
              onClick={nextStep}
              className="group flex items-center gap-4 bg-[#2C2C2C] text-white px-12 py-5 rounded-full font-bold shadow-2xl hover:scale-105 transition-all active:scale-95"
            >
              RESERVAR AHORA
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="mt-8 text-gray-300 text-[10px] uppercase tracking-widest italic">Ciudad de México, MX</p>
          </motion.div>
        )}

        {/* STEP 1: 날짜 및 시간 선택 */}
        {step === 1 && (
          <motion.div 
            key="datetime"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-50 flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center bg-white">
              <h2 className="text-xl font-bold font-serif italic">Seleccionar Fecha</h2>
              <button onClick={() => setStep(0)} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
              <div>
                <label className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.2em] mb-4 block">Abril 2026</label>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(14)].map((_, i) => {
                    const day = i + 20;
                    const isSelected = bookingData.date === `2026-04-${day}`;
                    return (
                      <button 
                        key={i} 
                        onClick={() => setBookingData({...bookingData, date: `2026-04-${day}`, time: ''})}
                        className={`py-3 rounded-xl text-sm transition-all font-medium ${isSelected ? 'bg-[#D4A373] text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={bookingData.date ? "opacity-100 transition-opacity" : "opacity-30 pointer-events-none"}>
                <label className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.2em] mb-4 block">Horarios disponibles</label>
                <div className="grid grid-cols-3 gap-3">
                  {['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setBookingData({...bookingData, time: t})}
                      className={`py-4 rounded-xl border text-sm transition-all font-bold ${bookingData.time === t ? 'border-[#2C2C2C] bg-[#2C2C2C] text-white shadow-lg' : 'border-gray-100 text-gray-400'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {bookingData.date && bookingData.time && (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t"
                >
                  <button onClick={nextStep} className="w-full bg-[#D4A373] text-white py-5 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">
                    CONTINUAR CON {bookingData.time}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* STEP 2: 개인 정보 입력 */}
        {step === 2 && (
          <motion.div 
            key="info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-h-screen bg-white p-6 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-10">
              <button onClick={prevStep} className="p-2 bg-gray-50 rounded-full rotate-180"><ChevronRight size={20} /></button>
              <h2 className="text-2xl font-bold font-serif italic text-[#2C2C2C]">Tus Datos</h2>
            </div>
            <div className="space-y-6 flex-1 max-w-sm mx-auto w-full">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    placeholder="Ej. Maria Lopez" 
                    className="w-full p-5 pl-12 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#D4A373] outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    placeholder="55 1234 5678" 
                    className="w-full p-5 pl-12 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#D4A373] outline-none transition-all" 
                  />
                </div>
              </div>
              
              <div className="pt-4 space-y-4">
                <button 
                  onClick={handleSubmit}
                  disabled={loading || !bookingData.name || !bookingData.phone}
                  className="w-full bg-[#2C2C2C] text-white py-5 rounded-2xl font-bold shadow-2xl disabled:bg-gray-100 transition-all active:scale-95"
                >
                  {loading ? 'Confirmando...' : 'FINALIZAR RESERVA'}
                </button>
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] uppercase tracking-tighter">Conexión segura y privada</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: 예약 완료 */}
        {step === 3 && (
          <motion.div 
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-bold mb-4 font-serif italic text-[#2C2C2C]">¡Excelente!</h2>
            <p className="text-gray-400 mb-12 text-sm leading-relaxed px-4">
              Hemos recibido tu solicitud para <span className="text-[#D4A373] font-bold">{bookingData.date}</span> a las <span className="text-[#D4A373] font-bold">{bookingData.time}</span>. 
              <br/><br/>
              Nos pondremos en contacto contigo pronto.
            </p>
            <button onClick={() => setStep(0)} className="text-[#D4A373] font-bold border-b-2 border-[#D4A373] pb-1 uppercase text-xs tracking-widest">
              Volver al inicio
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}