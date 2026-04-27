'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 수정 후 (Calendar와 Clock 삭제)
import { User, Phone, ChevronRight, X, CheckCircle2 } from 'lucide-react';

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

  // DB 연동 대신 로딩 효과만 주는 가짜 핸들러
  const handleSubmit = async () => {
    setLoading(true);
    
    // 1.5초간 서버에 저장하는 척 하기 (간지 포인트)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStep(3);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#2C2C2C] font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {/* STEP 0: 메인 랜딩 */}
        {step === 0 && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-[#D4A373] rounded-full mb-8 flex items-center justify-center shadow-xl"
            >
              <span className="text-white text-4xl font-serif">L</span>
            </motion.div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2 italic">LUBA SPA</h1>
            <p className="text-gray-400 mb-10 font-light tracking-[0.2em] text-xs">BIENESTAR Y RELAJACIÓN</p>
            <button 
              onClick={nextStep}
              className="group flex items-center gap-3 bg-[#2C2C2C] text-white px-10 py-5 rounded-full font-bold shadow-2xl hover:bg-black transition-all active:scale-95"
            >
              RESERVAR AHORA
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* STEP 1: 날짜/시간 (네이버 예약 스타일 슬라이드 업) */}
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
              <h2 className="text-xl font-bold flex items-center gap-2 font-serif">Seleccionar Fecha</h2>
              <button onClick={() => setStep(0)} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Abril 2026</label>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(14)].map((_, i) => {
                    const day = i + 20; // 20일부터 표시
                    const isSelected = bookingData.date === `2026-04-${day}`;
                    return (
                      <button 
                        key={i} 
                        onClick={() => setBookingData({...bookingData, date: `2026-04-${day}`})}
                        className={`py-3 rounded-xl text-sm transition-all ${isSelected ? 'bg-[#D4A373] text-white shadow-lg' : 'bg-gray-50 text-gray-500'}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={bookingData.date ? "opacity-100 transition-opacity" : "opacity-30 pointer-events-none"}>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Horarios</label>
                <div className="grid grid-cols-3 gap-3">
                  {['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'].map(t => (
                    <button 
                      key={t}
                      onClick={() => { setBookingData({...bookingData, time: t}); nextStep(); }}
                      className={`py-4 rounded-xl border text-sm transition-all ${bookingData.time === t ? 'border-[#2C2C2C] bg-[#2C2C2C] text-white' : 'border-gray-200 text-gray-400'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
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
              <h2 className="text-2xl font-bold font-serif">Tus Datos</h2>
            </div>
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-gray-300" size={20}/>
                  <input 
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    placeholder="Ej. Maria Lopez" 
                    className="w-full p-4 pl-12 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#D4A373] outline-none" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-gray-300" size={20}/>
                  <input 
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    placeholder="55 1234 5678" 
                    className="w-full p-4 pl-12 bg-gray-50 border-none rounded-2xl focus:ring-1 focus:ring-[#D4A373] outline-none" 
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={loading || !bookingData.name || !bookingData.phone}
              className="w-full bg-[#2C2C2C] text-white py-5 rounded-2xl font-bold shadow-xl disabled:bg-gray-100 transition-all active:scale-95"
            >
              {loading ? 'Confirmando...' : 'FINALIZAR RESERVA'}
            </button>
          </motion.div>
        )}

        {/* STEP 3: 예약 완료 화면 */}
        {step === 3 && (
          <motion.div 
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-bold mb-2 font-serif">¡Todo listo!</h2>
            <p className="text-gray-400 mb-10 text-sm leading-relaxed">
              Tu reserva en Luba Spa ha sido confirmada.<br/>
              Fecha: {bookingData.date} a las {bookingData.time}
            </p>
            <button 
              onClick={() => setStep(0)}
              className="text-[#D4A373] font-bold border-b-2 border-[#D4A373] pb-1"
            >
              Volver al inicio
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}