import React from 'react';
import { Flame, CookingPot, Truck, Star, ArrowRight } from 'lucide-react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  // Array of assets for the infinite marquees
  const marqueeItems = [
    {
      title: 'Mì Cay Bò Mỹ Kim Chi',
      price: '65.000đ',
      img: '/src/assets/images/mi-cay-bo-my-kim-chi.jpeg',
    },
    {
      title: 'Mì Cay Sườn Sụn',
      price: '65.000đ',
      img: '/src/assets/images/mi-cay-suon-sun-kim-chi.jpeg',
    },
    {
      title: 'Khoai Lang Kén Giòn',
      price: '35.000đ',
      img: '/src/assets/images/khoai-lang-nen.jpg',
    },
    {
      title: 'Mỳ Cay Hải Sản Hà My',
      price: '67.000đ',
      img: '/src/assets/images/mi-cay-hai-san.jpg',
    }
  ];

  const marqueeItemsSec = [
    {
      title: 'Mì Cay Đặc Biệt',
      price: '87.500đ',
      img: '/src/assets/images/mi-cay-dac-biet-nam-kim-chi.jpeg',
    },
    {
      title: 'Lạp Xưởng Hà Khẩu',
      price: '20.000đ',
      img: '/src/assets/images/lap-xuong.jpg',
    },
    {
      title: 'Bạch Tuộc Tươi Thêm',
      price: '15.000đ',
      img: '/src/assets/images/bac-tuoc-nuong.jpg',
    },
    {
      title: 'Dồi Sụn Chiên Giòn',
      price: '15.000đ',
      img: '/src/assets/images/doi-sun-chien.png',
    }
  ];

  return (
    <section id="trang-chu" className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 bg-gradient-to-b from-neutral-50/50 via-white to-[#fbfbfb] overflow-hidden">
      
      {/* Decorative Warm Light Background Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-50/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Core content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left" id="hero-content">
            
            {/* Elegant customer trust badge */}
            <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full w-fit hover:bg-orange-100/50 transition-colors">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-sans font-semibold text-neutral-800 text-xs sm:text-sm tracking-tight">
                🔥 4.9/5 • 5.000+ khách hàng đã thưởng thức
              </span>
            </div>

            {/* Impressive, styled large title */}
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[72px] text-neutral-900 leading-[1.08] tracking-tight">
              Chinh Phục <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d00] via-orange-500 to-red-500 drop-shadow-sm">
                Mì Cay
              </span> <br/>
              7 Cấp Độ
            </h1>

            {/* Clear, appealing brand subtitle description */}
            <p className="font-sans text-neutral-500 text-base sm:text-lg leading-relaxed max-w-xl">
              Mì cay chuẩn vị Hàn Quốc với nước dùng đậm đà, kim chi chua cay tự nhiên và hơn 30 loại topping hấp dẫn. Từ cấp độ 0 đến cấp độ 7 dành cho mọi tín độ đam mê thử thách vị giác.
            </p>

            {/* 3 Core benefits rearranged as clean elevated cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100/80">
              
              {/* Item 1 */}
              <div className="flex flex-col space-y-2 p-4 rounded-2xl bg-white border border-neutral-100/80 shadow-sm transition-all hover:shadow-md hover:border-orange-100">
                <div className="text-[#ff4d00] flex items-center space-x-2">
                  <span className="bg-orange-50 p-1.5 rounded-lg">
                    <Flame className="w-4 h-4 fill-current text-[#ff4d00]" />
                  </span>
                  <h3 className="font-display font-bold text-neutral-800 text-[14px]">7 Cấp Độ Cay</h3>
                </div>
                <p className="font-sans text-neutral-400 text-xs leading-normal">
                  Từ không cay đến siêu cay, phù hợp với mọi khẩu vị riêng biệt.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col space-y-2 p-4 rounded-2xl bg-white border border-neutral-100/80 shadow-sm transition-all hover:shadow-md hover:border-orange-100">
                <div className="text-amber-600 flex items-center space-x-2">
                  <span className="bg-amber-50 p-1.5 rounded-lg">
                    <CookingPot className="w-4 h-4 text-amber-600" />
                  </span>
                  <h3 className="font-display font-bold text-neutral-800 text-[14px]">Chuẩn Vị Hàn</h3>
                </div>
                <p className="font-sans text-neutral-400 text-xs leading-normal">
                  Hầm kỹ xương ống đậm vị, thơm cay tự nhiên quyến rũ.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col space-y-2 p-4 rounded-2xl bg-white border border-neutral-100/80 shadow-sm transition-all hover:shadow-md hover:border-orange-100">
                <div className="text-red-500 flex items-center space-x-2">
                  <span className="bg-red-50 p-1.5 rounded-lg">
                    <Truck className="w-4 h-4 text-red-500" />
                  </span>
                  <h3 className="font-display font-bold text-neutral-800 text-[14px]">Giao Nóng Hổi</h3>
                </div>
                <p className="font-sans text-neutral-400 text-xs leading-normal">
                  Đóng túi bảo ôn, giao cực tốc tận nhà trong 20 phút.
                </p>
              </div>

            </div>

            {/* Call to action action buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onScrollTo('thuc-don')}
                className="inline-flex items-center space-x-2 bg-neutral-900 hover:bg-orange-600 hover:scale-[1.01] active:scale-[0.99] text-white font-sans font-semibold text-[15px] px-8 py-4 rounded-full shadow-xl shadow-neutral-950/10 hover:shadow-orange-500/20 transition-all cursor-pointer group"
              >
                <span>Đặt món ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => onScrollTo('thuc-don')}
                className="bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 text-neutral-800 font-sans font-semibold text-[15px] px-8 py-4 rounded-full transition-all cursor-pointer shadow-sm"
              >
                Xem thực đơn
              </button>
            </div>

          </div>

          {/* Column 2: Dual Marquee for Desktop */}
          <div className="hidden lg:block lg:col-span-5 h-[580px] relative pointer-events-auto" id="hero-marquee-desktop">
            
            {/* Top and Bottom Fading Mask Shields */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fbfbfb] to-transparent z-20 pointer-events-none" />

            <div className="grid grid-cols-2 gap-5 h-full overflow-hidden marquee-mask rounded-3xl p-2 bg-neutral-100/40 border border-neutral-200/30">
              
              {/* Vertical Scroll Column 1 (Scrolls UP) */}
              <div className="relative h-full overflow-hidden">
                <div className="flex flex-col gap-5 animate-marquee-up py-4">
                  {marqueeItems.concat(marqueeItems).map((item, index) => (
                    <div 
                      key={`col1-${index}`} 
                      className="bg-white border border-neutral-100/80 p-3 rounded-2xl shadow-[0_10px_24px_rgba(0,0,0,0.02)] flex flex-col gap-2 hover:scale-[1.04] transition-all group"
                    >
                      <div className="overflow-hidden rounded-xl h-36">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="px-1 py-0.5">
                        <h4 className="font-display font-extrabold text-neutral-800 text-[13px] leading-tight line-clamp-1">{item.title}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-bold text-orange-500 font-mono">{item.price}</span>
                          <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-50 px-1.5 py-0.5 rounded">Korea</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Scroll Column 2 (Scrolls DOWN) */}
              <div className="relative h-full overflow-hidden">
                <div className="flex flex-col gap-5 animate-marquee-down py-4">
                  {marqueeItemsSec.concat(marqueeItemsSec).map((item, index) => (
                    <div 
                      key={`col2-${index}`} 
                      className="bg-white border border-neutral-100/80 p-3 rounded-2xl shadow-[0_10px_24px_rgba(0,0,0,0.02)] flex flex-col gap-2 hover:scale-[1.04] transition-all group"
                    >
                      <div className="overflow-hidden rounded-xl h-36 border border-neutral-50">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="px-1 py-0.5">
                        <h4 className="font-display font-extrabold text-neutral-800 text-[13px] leading-tight line-clamp-1">{item.title}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-bold text-orange-500 font-mono">{item.price}</span>
                          <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Hot</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Horizontal Product Marquee - Visible on Mobile ONLY */}
      <div className="block lg:hidden mt-12 border-t border-b border-neutral-100 py-6 bg-orange-50/20" id="hero-marquee-mobile">
        <div className="px-4 mb-3">
          <span className="font-display font-extrabold text-neutral-700 text-xs uppercase tracking-widest block">
            🔥 MÓN HOT ĐANG CHẠY / POPULAR COMBOS
          </span>
        </div>
        
        <div className="relative w-full overflow-hidden marquee-mask-horiz">
          <div className="flex animate-marquee-horiz gap-4 px-2">
            
            {/* Duplicated array for smooth looping */}
            {[...marqueeItems, ...marqueeItemsSec, ...marqueeItems, ...marqueeItemsSec].map((item, index) => (
              <div 
                key={`mob-${index}`} 
                onClick={() => onScrollTo('thuc-don')}
                className="w-36 flex-shrink-0 bg-white border border-neutral-100/80 p-2.5 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.02)] flex flex-col gap-1.5 active:scale-95 transition-all text-left"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-neutral-50">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-0.5">
                  <h4 className="font-display font-bold text-neutral-800 text-[11px] leading-tight truncate">{item.title}</h4>
                  <span className="text-[11px] font-bold text-orange-500 font-mono block mt-0.5">{item.price}</span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
      
    </section>
  );
}
