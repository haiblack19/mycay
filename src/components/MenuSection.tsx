import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Flame, Star, Coffee, Soup, Plus, Search, HelpCircle, Check } from 'lucide-react';

interface MenuSectionProps {
  onAddToOrder: (item: MenuItem, spiceLevel?: number) => void;
}

export default function MenuSection({ onAddToOrder }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'noodles' | 'toppings' | 'snacks' | 'combos'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Keep track of card-specific selected spice levels (default is 1 for noodles)
  const [selectedLevels, setSelectedLevels] = useState<{ [key: string]: number }>({});

  const dishes: MenuItem[] = [
    {
      id: 'm1',
      name: 'Mì Cay Bò Mỹ, Kim Chi',
      description: 'Bò Mỹ mềm ngọt, xúc xích, kim chi chua cay, cá viên, ngô ngọt, rau nấm tươi mát hầm chung.',
      price: 65000,
      category: 'noodles',
  image: new URL('../assets/images/mi-cay-bo-my-kim-chi.jpeg', import.meta.url).href,
      isPopular: true
    },
    {
      id: 'm2',
      name: 'Mì Cay Thập Cẩm',
      description: 'Món ăn thịnh soạn nhất với tôm sú, bò, sụn non, bạch tuộc tươi, mực giòn, cá viên, xúc xích cùng rau củ, nấm.',
      price: 77000,
      category: 'noodles',
  image: new URL('../assets/images/mi-cay-thap-cam.jpeg', import.meta.url).href,
      isPopular: true
    },
    {
      id: 'm3',
      name: 'Mì Cay Xúc Xích Cá Viên',
      description: 'Hương vị truyền thống béo béo từ xúc xích xông khói, cá viên chiên thơm lừng, ngô, bắp cải và nấm kim chi.',
      price: 55000,
      category: 'noodles',
  image: new URL('../assets/images/mi-cay-xuc-xich-ca-vien.jpeg', import.meta.url).href
    },
    {
      id: 'm4',
      name: 'Mì Cay Sườn Sụn Kim Chi',
      description: 'Sườn sụn giòn sần sật được hầm mềm, xúc xích đậm đà, cá viên, nấm bùi béo và rau củ thanh mát.',
      price: 65000,
      category: 'noodles',
  image: new URL('../assets/images/mi-cay-suon-sun-kim-chi.jpeg', import.meta.url).href
    },
    {
      id: 'm5',
      name: 'Mì Cay Đặc Biệt, Nấm Kim Chi',
      description: 'Đầy đủ tôm sú ngọt nước, trứng ốp la béo ngậy, mực ống, bạch tuộc tươi, xúc xích, cá viên và nấm.',
      price: 87500,
      category: 'noodles',
  image: new URL('../assets/images/mi-cay-dac-biet-nam-kim-chi.jpeg', import.meta.url).href,
      isPopular: true
    },
    {
      id: 'm6',
      name: 'Mì Cay Hải Sản',
      description: 'Vị ngọt tự nhiên của đại dương từ tôm sú, mực giòn, bạch tuộc tươi ngon hòa quyện cùng cải thảo và nấm.',
      price: 67000,
      category: 'noodles',
  image: new URL('../assets/images/mi-cay-hai-san.jpg', import.meta.url).href
    },
    {
      id: 'm7',
      name: 'Mì Cay Xúc Xích, Kim Chi',
      description: 'Mì ramyun dai giòn, xúc xích Đức xông khói, cá viên tròn vị, bắp cải xào tỏi và nấm kim châm thanh đạm.',
      price: 55000,
      category: 'noodles',
  image: new URL('../assets/images/mi-cay-xuc-xich-ca-vien.jpeg', import.meta.url).href
    },
    {
      id: 'm8',
      name: 'Mì Cay Cá Viên',
      description: 'Tràn ngập cá viên chiên giòn, súp hải sản rau củ quả hành ngô, kim chi cay tê đậm đà ngon miệng.',
      price: 50000,
      category: 'noodles',
  image: new URL('../assets/images/mi-cay-ca-vien-chien.jpg', import.meta.url).href
    },
    {
      id: 'm9',
      name: 'Mì Cay 10 Cá Viên',
      description: 'Dành riêng cho fan của viên chiên: 10 viên chả cá bùi bùi đặc trưng chìm đắm trong nước súp kim chi đỏ rực.',
      price: 45000,
      category: 'noodles',
  image: new URL('../assets/images/mi-cay-ca-vien-chien.jpg', import.meta.url).href
    },
    {
      id: 'm10',
      name: 'Sườn Sụn Thêm',
      description: 'Sườn sụn non tẩm ướp sơ chế kỹ càng, giòn sần sật béo ngậy thêm cho fan mê nhai sụn.',
      price: 15000,
      category: 'toppings',
  image: new URL('../assets/images/suon-sun.jpg', import.meta.url).href
    },
    {
      id: 'm11',
      name: 'Bạch Tuộc Thêm',
      description: 'Bạch tuộc tươi sống nguyên con loại nhỏ, nhúng lẩu mì dai ngon giòn ngọt đậm đà vị cay.',
      price: 15000,
      category: 'toppings',
  image: new URL('../assets/images/bac-tuoc-nuong.jpg', import.meta.url).href
    },
    {
      id: 'm12',
      name: 'Lạp Xưởng Hà Khẩu',
      description: 'Lạp xưởng nướng đá nổi danh, béo ngậy ngọt nhẹ thơm dịu ngũ vị hương chuẩn chỉ.',
      price: 20000,
      category: 'snacks',
  image: new URL('../assets/images/lap-xuong.jpg', import.meta.url).href,
      isPopular: true
    },
    {
      id: 'm13',
      name: 'Cá Viên Chiên',
      description: 'Cá viên chiên lút dầu phồng to vàng ruộm, dai giòn bên ngoài ấm ngọt ẩm mịn phía trong.',
      price: 35000,
      category: 'snacks',
  image: new URL('../assets/images/ca-vien-chien.jpeg', import.meta.url).href
    },
    {
      id: 'm14',
      name: 'Khoai Lang Kén',
      description: 'Khoai lang kén ngậy thơm cốt dừa vỏ bột chiên xù ròn rụm bên ngoài, bùi ngọt lịm bên trong.',
      price: 35000,
      category: 'snacks',
  image: new URL('../assets/images/khoai-lang-nen.jpg', import.meta.url).href
    },
    {
      id: 'm15',
      name: 'Lạp Xưởng Chiên',
      description: 'Lạp xưởng nướng chiên nóng hổi thái lát vừa ăn, giòn thơm nức mũi chấm tương đỏ tương đen cực cuốn.',
      price: 14000,
      category: 'snacks',
  image: new URL('../assets/images/lap-xuong.jpg', import.meta.url).href
    },
    {
      id: 'm16',
      name: 'Dồi Sụn Chiên',
      description: 'Dồi sụn nhồi hành nấm và sụn non nướng giòn vỏ thơm nức tanh tách sần sật lạ miệng.',
      price: 15000,
      category: 'snacks',
  image: new URL('../assets/images/doi-sun-chien.png', import.meta.url).href
    },
    {
      id: 'm17',
      name: 'Xúc Xích Rán',
      description: '1 chiếc xúc xích đỏ rán căng múp tách vỏ giòn chấm tương cay ấm nồng hấp dẫn.',
      price: 13000,
      category: 'snacks',
  image: new URL('../assets/images/xuc-xich-ran.avif', import.meta.url).href
    },
    {
      id: 'm18',
      name: 'Combo: Mì Cay Bò Kim Chi X Trà Quất',
      description: 'Lựa chọn tiện lợi kinh tế nhất gồm 1 bát mì cay bò nấm kim chi nóng hổi cấp 1 và 1 cốc trà quất dầm tươi tắn bùi ngậy đá mát.',
      price: 83000,
      category: 'combos',
  image: new URL('../assets/images/mi-cay-dac-biet-nam-kim-chi.jpeg', import.meta.url).href,
      isPopular: true
    },
  ];

  // Filters navigation
  const tabs = [
    { value: 'all', label: 'Tất cả món ăn' },
    { value: 'noodles', label: 'Mì Cay 7 Cấp Độ', id: 'mi-cay' },
    { value: 'toppings', label: 'Topping thêm', id: 'topping' },
    { value: 'snacks', label: 'Đồ ăn kèm vặt', id: 'an-vat' },
    { value: 'combos', label: 'Combo đặc biệt', id: 'combo' }
  ];

  // Filtering logic
  const filteredDishes = dishes.filter(dish => {
    const matchesTab = activeTab === 'all' || dish.category === activeTab;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleLevelChange = (dishId: string, level: number) => {
    setSelectedLevels(prev => ({
      ...prev,
      [dishId]: level
    }));
  };

  const handleAddClick = (dish: MenuItem) => {
    const level = dish.category === 'noodles' ? (selectedLevels[dish.id] ?? 1) : undefined;
    onAddToOrder(dish, level);
  };

  const formatPrice = (p: number) => {
    return p.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <section id="thuc-don" className="py-20 lg:py-28 bg-[#fbfbfb] scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" id="menu-header">
          <div className="inline-flex items-center space-x-1.5 bg-orange-50 text-orange-600 font-sans font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            <span>Bản sắc tinh hoa ẩm thực</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-900 leading-tight">
            Thực Đơn Nổi Bật của Hà My
          </h2>
          <p className="font-sans text-neutral-500 mt-4 leading-relaxed text-[15px] sm:text-base">
            Mì ramyun dai dẻo nhập trực tiếp từ Hàn Quốc quyện chung nước dùng kim chi chua chua, hầm đậm đà theo đúng tiêu chuẩn 7 cấp độ tột cùng sảng khoái.
          </p>
        </div>

        {/* Searching and Tabs Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12" id="menu-controls">
          
          {/* Custom functional Tabs selector */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value as any);
                  // also scroll to appropriate element id if applicable
                  if (tab.id) {
                    const el = document.getElementById(tab.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex-shrink-0 font-sans font-semibold text-[13.5px] px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.value
                    ? 'bg-white text-orange-600 shadow-sm font-bold'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box with Icon */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm bát mì của bạn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-200 focus:border-orange-500 focus:outline-none rounded-2xl pl-10 pr-4 py-3 text-sm text-neutral-800 tracking-tight transition-all shadow-sm focus:shadow-orange-500/5 placeholder:text-neutral-400"
            />
          </div>

        </div>

        {/* Categories Dividers within Main View (Optional references) */}
        <div id="mi-cay" className="scroll-mt-24" />
        <div id="topping" className="scroll-mt-24" />
        <div id="an-vat" className="scroll-mt-24" />
        <div id="combo" className="scroll-mt-24" />

        {/* Menu Cards Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" id="menu-grid">
            {filteredDishes.map((dish) => {
              const spiceLvl = selectedLevels[dish.id] ?? 1;

              return (
                <div 
                  key={dish.id} 
                  className="bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.02)] flex flex-col hover:shadow-[0_20px_35px_rgba(255,77,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 group"
                  id={`dish-card-${dish.id}`}
                >
                  
                  {/* Card Image and badging section */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    
                    {dish.isPopular && (
                      <span className="absolute top-4 left-4 z-10 bg-amber-500 text-white font-display font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current animate-spin-slow" /> MỚI & BÁN CHẠY
                      </span>
                    )}

                    {dish.category === 'noodles' && (
                      <span className="absolute top-4 right-4 z-10 bg-red-650/90 bg-red-600 text-white font-mono font-bold text-[11px] px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1 backdrop-blur-sm">
                        <Flame className="w-3.5 h-3.5 fill-current" /> Cấp {spiceLvl}
                      </span>
                    )}

                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shadow inside card image bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Card details body content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow text-left">
                    
                    {/* Header: Title and Price */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-display font-extrabold text-neutral-900 text-lg group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
                        {dish.name}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="font-sans text-neutral-500 text-[13px] leading-relaxed mt-2.5 flex-grow line-clamp-3">
                      {dish.description}
                    </p>

                    {/* Interactive 7 Spice Levels Selector (Noodles ONLY) */}
                    {dish.category === 'noodles' && (
                      <div className="mt-4 pt-3.5 border-t border-neutral-50" id={`spice-lvl-selector-${dish.id}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-neutral-500 font-sans text-xs flex items-center gap-1 font-semibold">
                            🔥 Chọn cấp độ cay (0 - 7):
                          </span>
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-600">
                            Cấp {spiceLvl}
                          </span>
                        </div>
                        <div className="grid grid-cols-8 gap-1">
                          {[0, 1, 2, 3, 4, 5, 6, 7].map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => handleLevelChange(dish.id, lvl)}
                              className={`h-7 rounded-lg font-mono text-[11.5px] font-bold transition-all focus:outline-none cursor-pointer flex items-center justify-center ${
                                spiceLvl === lvl
                                  ? 'bg-gradient-to-tr from-orange-600 to-red-500 text-white shadow-md shadow-orange-500/20 scale-105'
                                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border border-neutral-200/50'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer: Price and Add To Cart button */}
                    <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-neutral-400 font-sans text-[10px] font-bold uppercase tracking-widest leading-none">Mức giá</span>
                        <span className="text-xl font-display font-extrabold text-neutral-900 mt-1">
                          {formatPrice(dish.price)}
                        </span>
                      </div>

                      {/* Vibrant Orange Plus Cart trigger */}
                      <button
                        onClick={() => handleAddClick(dish)}
                        className="h-11 w-11 bg-orange-500 hover:bg-neutral-900 text-white rounded-2xl flex items-center justify-center transition-all shadow-md shadow-orange-500/10 hover:shadow-neutral-950/10 hover:-translate-y-0.5 cursor-pointer"
                        title="Thêm vào giỏ"
                        id={`btn-add-${dish.id}`}
                      >
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl max-w-xl mx-auto border border-neutral-100">
            <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="font-display font-bold text-neutral-800 text-[16px]">Không tìm thấy món ăn phù hợp</h3>
            <p className="font-sans text-neutral-400 text-sm mt-1">Hủy tiêu chí tìm kiếm hoặc đổi từ khóa khác xem sao nhé!</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
              className="mt-4 px-5 py-2 bg-neutral-900 text-white font-sans text-xs rounded-full hover:bg-orange-500 transition-colors"
            >
              Hủy bộ lọc
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
