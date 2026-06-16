import React from 'react';
import { Sparkles, Calendar, Coffee, Zap, ShoppingBag, ArrowRight } from 'lucide-react';
import FallbackImage from './FallbackImage';

interface ConversionSectionProps {
  onOrderNow: () => void;
}

export default function ConversionSection({ onOrderNow }: ConversionSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white" id="khuyen-mai">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Campaign big promotional card wrapper */}
        <div 
          className="bg-[#fff7ed] border border-orange-200/50 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl shadow-orange-500/[0.02]"
          id="promo-campaign-card"
        >
          
          {/* Abstract background blobs for premium aesthetic */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Core Promo offer info */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-left relative z-10">
              
              {/* Promo Badge */}
              <div className="inline-flex items-center space-x-1.5 bg-orange-600 text-white font-sans font-bold text-[10.5px] uppercase tracking-widest px-3 py-1.5 rounded-xl w-fit shadow-md">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>COMBO NÓNG HÔM NAY // HOT DEAL DEALS</span>
              </div>

              {/* Title & Price Label */}
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-900 leading-tight">
                  Mì Cay Bò Kim Chi <br className="hidden sm:inline" />
                  Kèm Trà Quất Khổng Lồ
                </h3>
                <p className="text-orange-600 font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight mt-1">
                  Chỉ từ 83.000đ <span className="text-neutral-500 font-sans font-normal text-base sm:text-lg">/ một phần ngon lành</span>
                </p>
              </div>

              {/* Description body */}
              <p className="font-sans text-neutral-600 text-[14px] sm:text-[15px] leading-relaxed max-w-xl">
                Bữa trưa tột đỉnh sướng vui cùng bát mì cay bò mềm múp súp kim chi đậm đà, kết hợp hoàn hảo cùng cốc trà quất khổng lồ chua ngọt dập mồi giải cay cực đã. Chương trình áp dụng giao nhanh và mua mang về trong khung giờ vàng hằng ngày.
              </p>

              {/* Dynamic trust points checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                <div className="flex items-center space-x-2.5 text-neutral-700">
                  <div className="bg-white p-1.5 rounded-full text-orange-600 border border-orange-100 shadow-sm flex items-center justify-center">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-sans text-[13.5px] font-semibold text-neutral-800">Đặt nhanh giao tận bàn trong 20p</span>
                </div>
                <div className="flex items-center space-x-2.5 text-neutral-700">
                  <div className="bg-white p-1.5 rounded-full text-amber-600 border border-orange-100 shadow-sm flex items-center justify-center">
                    <Coffee className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="font-sans text-[13.5px] font-semibold text-neutral-800">Ưu đãi tặng trà quất đá 1000ml</span>
                </div>
              </div>

              {/* CTA Action button */}
              <button
                onClick={onOrderNow}
                className="bg-neutral-900 hover:bg-orange-600 text-white font-sans font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-neutral-950/10 hover:shadow-orange-600/15 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all w-fit flex items-center gap-2 group"
                id="btn-promo-cta"
              >
                <span>Đặt combo ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

            {/* Right Column: Visual Showcase containing stacked components */}
            <div className="lg:col-span-5 relative flex items-center justify-center" id="promo-showcase">
              <div className="relative w-72 sm:w-80 aspect-square">
                
                {/* Decorative gold ring */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-full opacity-[0.05] animate-pulse pointer-events-none scale-105" />
                
                {/* Product bowl rendering */}
                <div className="absolute inset-0 bg-white border border-orange-100 p-3 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                  <FallbackImage
                    src={new URL('../assets/images/mi-cay-bo-my-kim-chi.jpeg', import.meta.url).href}
                    alt="Steaming Hot premium ramyun"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Overlaid Badges */}
                <div className="absolute -top-3 -right-3 z-10 bg-white border border-orange-100 p-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
                  <span className="text-xl">🧋</span>
                  <div>
                    <span className="block text-[8px] font-mono text-neutral-400 font-extrabold uppercase leading-none">FREE DRINK</span>
                    <span className="block text-[11px] font-display font-extrabold text-neutral-800 leading-none mt-1">Trà quất mát lạnh</span>
                  </div>
                </div>

                <div className="absolute -bottom-3 -left-3 z-10 bg-orange-600 text-white p-3 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                  <span className="block font-sans font-bold text-[13px] leading-tight text-center">BEST <br className="hidden sm:inline" />SELLER</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
