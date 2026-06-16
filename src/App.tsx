import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ConversionSection from './components/ConversionSection';
import { MenuItem, CartItem, Testimonial } from './types';
import FallbackImage from './components/FallbackImage';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Clock, 
  Trash2, 
  Plus, 
  Minus, 
  CheckCircle, 
  Compass, 
  Heart, 
  Star, 
  X, 
  MessageCircle, 
  Share2, 
  ShoppingBag,
  Bike,
  Smile
} from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  
  // Validation State
  const [formError, setFormError] = useState('');
  const [isSendingOrder, setIsSendingOrder] = useState(false);

  // Testimonials database
  const testimonials: Testimonial[] = [
    {
      name: 'Trần Minh Quân',
  avatar: new URL('./assets/images/bac-tuoc-nuong.jpg', import.meta.url).href,
      comment: 'Mình là fan cứng của mì cay ở đây. Nước dùng sền sệt đậm đà, không lỏng bỏng như quán khác. Thử thách cấp độ 3 cay xé lưỡi nhưng ngọt hậu cực ngon. Toppings mực bạch tuộc tươi sần sật.',
      rating: 5,
      date: 'Hôm qua'
    },
    {
      name: 'Nguyễn Thảo Vy',
  avatar: new URL('./assets/images/mi-cay-xuc-xich-ca-vien.jpeg', import.meta.url).href,
      comment: 'Thích nhất là lạp xưởng Hà Khẩu béo ngậy ăn kèm mì cay cấp độ 1 vừa miệng của mình. Quán thiết kế hiện đại sạch sẽ, đóng gói giao hàng bọc giấy bạc giữ nhiệt kỹ lưỡng lắm!',
      rating: 5,
      date: '2 ngày trước'
    },
    {
      name: 'Phạm Thế Hoàng',
  avatar: new URL('./assets/images/mi-cay-hai-san.jpg', import.meta.url).href,
      comment: 'Vừa đặt combo mì bò kèm trà quất của quán hôm nay. Trà quất siêu to dập lửa thần tốc luôn! Mực xoắn với dồi sụn dòn ngon. Rất xứng đáng điểm tuyệt đối.',
      rating: 5,
      date: '1 tuần trước'
    }
  ];

  // Spicy Level description reference card
  const spiceGuides = [
    { lvl: '0.5', desc: 'The Thé', title: 'Khởi động nhẹ nhàng cho trẻ em hoặc người ăn cay nhẹ.' },
    { lvl: '1.0', desc: 'Vừa Vị', title: 'Cay tê nhè nhẹ giống vị kim chi chuẩn Hàn Quốc.' },
    { lvl: '3.0', desc: 'Thử Thách', title: 'Bắt đầu toát mồ hôi. Dành cho tín đồ ăn cay thường xuyên.' },
    { lvl: '5.0', desc: 'Tê Liệt', title: 'Cay gắt rạo rực. Thách thức chịu đựng cao của bợm cay thực thụ.' },
    { lvl: '7.0', desc: 'Bất Bại', title: 'Nóc nhà của cay nóng! Đăng quang bảng vàng chinh phục.' }
  ];

  // Helper formatting currency
  const formatPrice = (p: number) => {
    return p.toLocaleString('vi-VN') + 'đ';
  };

  const scrollSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToOrder = (item: MenuItem, spiceLevel?: number) => {
    setCart(prevCart => {
      // Find if item already exists with matching level
      const existingIdx = prevCart.findIndex(
        cartItem => cartItem.menuItem.id === item.id && cartItem.spiceLevel === spiceLevel
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { menuItem: item, quantity: 1, spiceLevel }];
      }
    });

    // Automatically trigger cart sidebar opening for user gratification
    setIsCartOpen(true);
  };

  const handleUpdateQty = (idx: number, delta: number) => {
    setCart(prevCart => {
      const updated = [...prevCart];
      const newQty = updated[idx].quantity + delta;
      if (newQty <= 0) {
        updated.splice(idx, 1);
      } else {
        updated[idx].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveItem = (idx: number) => {
    setCart(prevCart => {
      const updated = [...prevCart];
      updated.splice(idx, 1);
      return updated;
    });
  };

  // Calculation total order values
  const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const deliveryFee = subtotal > 150000 ? 0 : (subtotal === 0 ? 0 : 15000);
  const totalBill = subtotal + deliveryFee;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Form Submission
  const handlePlaceOrder = async (e: React.FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    // Trim values
    const nameTrim = customerName.trim();
    const phoneTrim = customerPhone.trim();
    const addressTrim = customerAddress.trim();

    // Frontend validations
    if (!nameTrim || nameTrim.length < 2) {
      setFormError('Quý khách vui lòng nhập đầy đủ họ và tên (ít nhất 2 ký tự)!');
      return;
    }
    
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneTrim || !phoneRegex.test(phoneTrim)) {
      setFormError('Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại Việt Nam (ví dụ: 0912345678).');
      return;
    }

    if (!addressTrim || addressTrim.length < 10) {
      setFormError('Địa chỉ nhận hàng quá ngắn! Quý khách vui lòng nhập địa chỉ chi tiết hơn (ít nhất 10 ký tự).');
      return;
    }

    setFormError('');
    setIsSendingOrder(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: nameTrim,
          customerPhone: phoneTrim,
          customerAddress: addressTrim,
          customerNotes: customerNotes.trim(),
          cart,
          totalBill,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsOrderPlaced(true);
      } else {
        setFormError(data.error || 'Có lỗi xảy ra khi xử lý đơn hàng.');
      }
    } catch (err) {
      console.error('Order error:', err);
      setFormError('Không thể kết nối server. Vui lòng gọi trực tiếp: 0971062696');
    } finally {
      setIsSendingOrder(false);
    }
  };

  const handleResetAfterOrder = () => {
    setCart([]);
    setIsOrderPlaced(false);
    setIsCheckoutStep(false);
    setIsCartOpen(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setCustomerNotes('');
    setFormError('');
    setIsSendingOrder(false);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-neutral-900 font-sans relative antialiased selección">
      
      {/* Floating Customer Help Button */}
      <a 
        href="tel:0971062696" 
        className="fixed bottom-6 left-6 z-40 bg-neutral-900 hover:bg-orange-600 text-white rounded-full p-4 shadow-xl shadow-neutral-950/20 hover:scale-105 active:scale-95 transition-all text-sm font-semibold flex items-center gap-2 group cursor-pointer"
        id="floating-hotline"
      >
        <span className="bg-orange-500 text-white p-1 rounded-full group-hover:bg-white group-hover:text-orange-600 transition-colors">
          <Phone className="w-3.5 h-3.5 animate-bounce" />
        </span>
        <span className="hidden sm:inline">CSKH: 0971 062 696</span>
      </a>

      {/* Floating Cart Panel Button (Only visible on scroll/when cart is populated) */}
      {cartItemCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-orange-500 hover:bg-neutral-900 text-white rounded-full p-5 shadow-xl shadow-orange-500/20 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          title="Xem giỏ hàng"
          id="floating-cart-btn"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-3.5 -right-3.5 bg-red-600 border border-white text-[10.5px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
              {cartItemCount}
            </span>
          </div>
        </button>
      )}

      {/* Navbar section */}
      <Navbar 
        cartCount={cartItemCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onScrollTo={scrollSection}
      />

      {/* Main Page Render Sections */}
      <main>
        
        {/* Hero Banner Section */}
        <Hero onScrollTo={scrollSection} />

        {/* Level Heat Info Segment */}
        <section className="py-14 border-t border-b border-neutral-100 bg-white" id="mi-cay-info">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              <div className="md:col-span-4 text-left">
                <span className="font-display font-extrabold text-orange-500 text-xs uppercase tracking-widest block mb-1">
                  CẨM NANG ĂN CAY
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 leading-tight">
                  Chinh Phục Thang Cay <br/> Chuẩn Hà My
                </h3>
                <p className="font-sans text-neutral-500 text-sm mt-3 leading-relaxed">
                  Đừng lo lắng nếu bạn không ăn được cay nhiều! Hà My thiết kế thang cấp độ thông minh và an toàn sức khỏe từ súp trái ớt sừng tự nhiên.
                </p>
              </div>

              <div className="md:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {spiceGuides.map((guide, idx) => (
                    <div 
                      key={idx} 
                      className="bg-neutral-50 hover:bg-orange-50/40 border border-neutral-100 hover:border-orange-200/50 rounded-2xl p-4 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono font-bold text-sm text-neutral-400 group-hover:text-orange-500">
                          {idx + 1}.
                        </span>
                        <span className="font-display font-black text-xs px-2 py-0.5 rounded-full bg-orange-100/50 text-orange-600">
                          Cấp {guide.lvl}
                        </span>
                      </div>
                      <h4 className="font-display font-extrabold text-neutral-900 text-sm group-hover:text-orange-600 transition-colors">
                        Vị {guide.desc}
                      </h4>
                      <p className="font-sans text-neutral-500 text-[11px] leading-normal mt-1.5 line-clamp-3">
                        {guide.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Featured Menu items lists */}
        <MenuSection onAddToOrder={handleAddToOrder} />

        {/* Promotional Special Banner Campaign */}
        <ConversionSection onOrderNow={() => handleAddToOrder({
          id: 'm18',
          name: 'Combo: Mì Cay Bò Kim Chi X Trà Quất',
          description: 'Combo bò cấp 1 và trà quất dầm tươi.',
          price: 83000,
          category: 'combos',
          image: '/assets/images/mi-cay-bo-my-kim-chi.jpeg',
        }, 1)} />

        {/* Social Proof & Testimonials Segment */}
        <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-neutral-50/50 border-t border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-display font-extrabold text-amber-600 text-xs uppercase tracking-widest block mb-2">ĐÁNH GIÁ THỰC TẾ</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3.5xl text-neutral-900">
                Thực Khách Nói Gì Về Chúng Tôi
              </h2>
              <p className="font-sans text-neutral-500 text-[14px] mt-3">
                Ý kiến đóng góp chân thực từ trải nghiệm ăn cay sảng khoái và tiện lợi tại nhà.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {testimonials.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.015)] text-left flex flex-col justify-between hover:shadow-lg transition-all hover:border-orange-100"
                >
                  <div>
                    <div className="flex text-amber-500 gap-1 mb-4">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-current" />
                      ))}
                    </div>
                    <p className="font-sans text-neutral-600 text-[13.5px] leading-relaxed italic">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-3.5 pt-5 border-t border-neutral-50 mt-5">
                    <FallbackImage
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-orange-100"
                    />
                    <div>
                      <h4 className="font-display font-bold text-neutral-800 text-xs sm:text-sm">{item.name}</h4>
                      <span className="font-sans text-[11px] text-neutral-400 block">{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Footer component block */}
      <footer className="bg-neutral-900 text-white pt-16 pb-8 border-t border-neutral-800/80" id="lien-he">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-neutral-800">
            
            {/* Logo/Description */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-tr from-orange-600 to-red-500 p-2 rounded-full text-white shadow-md">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <span className="font-display font-black text-lg tracking-tight text-white">
                  MỲ CAY <span className="text-orange-500">HÀ MY</span>
                </span>
              </div>
              <p className="font-sans text-neutral-400 text-xs sm:text-[13px] leading-relaxed max-w-sm">
                Thương hiệu Mì Cay 7 Cấp Độ chuẩn vị Hàn Quốc dẫn đầu xu hướng ẩm thực trẻ. Thơm cay nồng đượm, sảng khoái và cực kỳ an lành.
              </p>
              
              <div className="flex items-center space-x-3 pt-2">
                {/* Social media icons emulation */}
                <a href="#facebook" className="h-9 w-9 bg-neutral-800 hover:bg-orange-600 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white transition-colors">
                  <span className="text-sm font-bold font-display">Fb</span>
                </a>
                <a href="#tiktok" className="h-9 w-9 bg-neutral-800 hover:bg-orange-600 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white transition-colors">
                  <span className="text-sm font-bold font-display">Tk</span>
                </a>
                <a href="#shopee" className="h-9 w-9 bg-neutral-800 hover:bg-orange-600 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white transition-colors text-xs font-semibold">
                  SFood
                </a>
                <a href="#grab" className="h-9 w-9 bg-neutral-800 hover:bg-orange-600 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white transition-colors text-xs font-semibold">
                  Grab
                </a>
              </div>
            </div>

            {/* Quick links & Hours */}
            <div className="md:col-span-3 text-left space-y-3.5">
              <h3 className="font-display font-extrabold text-neutral-200 text-[14px] uppercase tracking-wider">
                Giờ Mở Cửa
              </h3>
              <div className="space-y-2 text-xs sm:text-[13px] text-neutral-400">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>09:00 AM - 10:30 PM hằng ngày</span>
                </div>
                <p className="text-[11.5px] text-neutral-500">
                  (Hoạt động xuyên lễ Tết, nhận đơn giao hàng tới 10:00 PM)
                </p>
              </div>
            </div>

            {/* Address Contact */}
            <div className="md:col-span-4 text-left space-y-3.5">
              <h3 className="font-display font-extrabold text-neutral-200 text-[14px] uppercase tracking-wider">
                Hệ Thống Liên Hệ
              </h3>
              <ul className="space-y-3 text-xs sm:text-[13px] text-neutral-400">
                <li className="flex items-start space-x-2.5">
                  <MapPin className="w-4.5 h-4.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>71C, Ngách 71, Ngõ 342 Khương Đình, P. Khương Đình, Hà Nội</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Phone className="w-4.5 h-4.5 text-orange-500 flex-shrink-0" />
                  <span className="font-semibold text-white">Hotline: 0971 062 696</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Smile className="w-4.5 h-4.5 text-amber-500 flex-shrink-0" />
                  <span>Email: phucdat276@gmail.com</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 text-xs text-center">
            <p>© 2026 Mỳ Cay Hà My. All rights reserved.</p>
            <p className="hidden sm:inline">Phục vụ tận tâm • Đậm đà bản sắc Hàn Quốc</p>
          </div>

        </div>
      </footer>

      {/* Black backdrop shadow for shopping cart slide-over sidebar panel */}
      {isCartOpen && (
        <div 
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs z-50 transition-opacity animate-in fade-in py-2"
        />
      )}

      {/* Shopping Cart Slide-over Panel drawer layout */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] max-w-full bg-white shadow-2xl flex flex-col transition-transform duration-300 transform border-l border-neutral-200/50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="shopping-cart-drawer"
      >
        
        {/* Drawer Header */}
        <div className="h-20 px-6 sm:px-8 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center space-x-2.5">
            <span className="bg-orange-500 text-white p-2 rounded-xl">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-display font-extrabold text-neutral-900 text-base">Đơn hàng của bạn</h3>
              <p className="font-mono text-[10px] text-blue-600 font-bold tracking-wider leading-none mt-0.5">
                {cartItemCount} MÓN ĐÃ THÈM
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-all"
            aria-label="Đóng giỏ"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Dynamic State View Router */}
        {isOrderPlaced ? (
          
          // Successful Order Tracker view
          <div className="p-8 sm:p-10 flex flex-col items-center justify-center flex-grow text-center overflow-y-auto">
            <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-400 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 mb-6">
              <CheckCircle className="w-8 h-8 stroke-[2.5]" />
            </div>
            
            <h3 className="font-display font-black text-xl text-neutral-900">Đặt món thành công!</h3>
            <p className="font-sans text-neutral-500 text-[13px] mt-2 leading-relaxed">
              Cảm ơn quý khách <span className="font-bold text-neutral-800">{customerName}</span>. Đơn hàng của quý khách đang được chuyển xuống bếp chế biến ngay!
            </p>

            {/* Tracker status panel */}
            <div className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl p-5 my-6 text-left space-y-3.5">
              <span className="font-display font-extrabold text-orange-650 text-[11px] uppercase tracking-wider block">
                TRẠNG THÁI GIAO HÀNG
              </span>
              
              <div className="space-y-4">
                
                {/* Active Cook Step */}
                <div className="flex items-start space-x-3">
                  <div className="relative mt-1">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
                    </span>
                    <div className="absolute top-3 left-1.5 w-0.5 h-10 bg-neutral-200" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-neutral-800 text-[13px]">Bếp nấu hồng ngoại</h5>
                    <p className="font-sans text-neutral-500 text-[11px]">Đang hầm sôi ở thang cấp độ yêu cầu.</p>
                  </div>
                </div>

                {/* Shipped Step */}
                <div className="flex items-start space-x-3">
                  <div className="relative mt-1">
                    <div className="rounded-full h-3 w-3 bg-neutral-200" />
                    <div className="absolute top-3 left-1.5 w-0.5 h-10 bg-neutral-200" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-neutral-400 text-[13px]">Bàn giao Shippers Hà My</h5>
                    <p className="font-sans text-neutral-400 text-[11px]">Shipper đón lấy hàng nóng hôi hổi và giao bằng túi bạc bảo ôn.</p>
                  </div>
                </div>

                {/* Arrived Step */}
                <div className="flex items-start space-x-3">
                  <div className="rounded-full h-3 w-3 bg-neutral-200 mt-1" />
                  <div>
                    <h5 className="font-sans font-bold text-neutral-400 text-[13px]">Nhận hàng siêu cay</h5>
                    <p className="font-sans text-neutral-400 text-[11px]">Thưởng thức & đánh giá cấp độ.</p>
                  </div>
                </div>

              </div>

              {/* Delivery customer info summary */}
              <div className="border-t border-orange-100 pt-4 mt-2 space-y-1.5 text-xs text-neutral-600">
                <p><span className="font-semibold text-neutral-700">Điện thoại:</span> {customerPhone}</p>
                <p><span className="font-semibold text-neutral-700">Địa chỉ:</span> {customerAddress}</p>
                {customerNotes && <p><span className="font-semibold text-neutral-700">Lưu ý:</span> {customerNotes}</p>}
                <p className="font-mono text-orange-650 pt-1 font-bold">Tổng thanh toán: {formatPrice(totalBill)} (COD)</p>
              </div>

            </div>

            <button
              onClick={handleResetAfterOrder}
              className="bg-neutral-900 hover:bg-orange-600 text-white font-sans font-bold text-xs px-6 py-2.5 rounded-full cursor-pointer transition-colors"
            >
              Tiếp tục đặt món
            </button>
          </div>

        ) : cart.length > 0 ? (
          
          <div className="flex flex-col flex-grow overflow-hidden">
            
            {/* List items scroll area */}
            <div className="flex-grow overflow-y-auto p-6 sm:p-8 space-y-4 no-scrollbar">
              
              {!isCheckoutStep ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400 font-sans text-xs uppercase font-bold tracking-wider">Danh sách món ăn</span>
                    <button 
                      onClick={() => setCart([])} 
                      className="text-neutral-400 hover:text-red-500 text-xs font-sans font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả
                    </button>
                  </div>

                  {cart.map((item, idx) => (
                    <div 
                      key={`${item.menuItem.id}-${item.spiceLevel ?? 'no'}`} 
                      className="bg-neutral-50/50 border border-neutral-100 p-3 sm:p-4 rounded-2xl flex items-center space-x-3.5"
                    >
                      <img 
                        src={item.menuItem.image} 
                        alt={item.menuItem.name} 
                        className="w-14 h-14 rounded-xl object-cover border border-neutral-100"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="flex-grow text-left">
                        <h4 className="font-display font-bold text-neutral-900 text-[13px] leading-snug line-clamp-2">
                          {item.menuItem.name}
                        </h4>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[12px] font-mono font-bold text-orange-650">
                            {formatPrice(item.menuItem.price)}
                          </span>
                          {item.spiceLevel !== undefined && (
                            <span className="bg-red-50 border border-red-100 font-mono text-[9px] font-semibold text-red-600 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              🌶️ Cấp {item.spiceLevel}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity tools and Trash action */}
                      <div className="flex flex-col items-end justify-between space-y-2 h-full">
                        <button 
                          onClick={() => handleRemoveItem(idx)}
                          className="text-neutral-300 hover:text-red-500 p-1"
                          title="Xóa khỏi giỏ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="bg-white border border-neutral-200 rounded-lg flex items-center font-mono">
                          <button 
                            onClick={() => handleUpdateQty(idx, -1)}
                            className="px-2 py-0.5 text-neutral-400 hover:text-neutral-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-neutral-800 px-1.5 min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleUpdateQty(idx, 1)}
                            className="px-2 py-0.5 text-neutral-400 hover:text-orange-500"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </>
              ) : (
                
                // Checkout Delivery Form content
                <form onSubmit={handlePlaceOrder} className="space-y-4 text-left">
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-500 font-sans text-xs uppercase font-bold tracking-wider">Thông tin nhận hàng nhạy bén</span>
                    <button 
                      type="button"
                      onClick={() => setIsCheckoutStep(false)}
                      className="text-orange-600 hover:text-neutral-900 text-xs font-sans font-semibold"
                    >
                      Quay lại giỏ hàng
                    </button>
                  </div>

                  <div className="space-y-3 p-1">
                    
                    {/* Customer Fullname */}
                    <div className="flex flex-col space-y-1">
                      <label className="font-sans font-bold text-xs text-neutral-700">Họ và tên người nhận *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ví dụ: Nguyễn Văn A"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-orange-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-sm"
                      />
                    </div>

                    {/* Customer Phone */}
                    <div className="flex flex-col space-y-1">
                      <label className="font-sans font-bold text-xs text-neutral-700">Số điện thoại liên hệ *</label>
                      <input
                        required
                        type="tel"
                        placeholder="Ví dụ: 0912345678"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-orange-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-sm"
                      />
                    </div>

                    {/* Customer Address */}
                    <div className="flex flex-col space-y-1">
                      <label className="font-sans font-bold text-xs text-neutral-700">Địa chỉ giao hàng tận nơi *</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-orange-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-sm"
                      />
                    </div>

                    {/* Extra Notes */}
                    <div className="flex flex-col space-y-1">
                      <label className="font-sans text-xs text-neutral-500">Ghi chú cho shipper / bếp nấu</label>
                      <input
                        type="text"
                        placeholder="Lưu ý thêm tỏi phi, ăn kèm đũa, v.v."
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-orange-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-sm"
                      />
                    </div>

                    {/* Form errors alerting */}
                    {formError && (
                      <p className="text-red-500 text-xs font-semibold pt-1">{formError}</p>
                    )}

                  </div>

                </form>
              )}

            </div>

            {/* Sticky summary subtotal calculations */}
            <div className="border-t border-neutral-100 p-6 sm:p-8 bg-neutral-50 text-left space-y-4">
              
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Món ăn tạm tính:</span>
                  <span className="font-mono text-neutral-900 font-bold">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1">
                    <span>Phí giao hàng:</span>
                    {subtotal > 150000 && (
                      <span className="bg-green-50 text-green-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        Freeship {`>150k`}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-neutral-900">
                    {deliveryFee === 0 ? 'Miễn phí' : formatPrice(deliveryFee)}
                  </span>
                </div>

                <div className="border-t border-neutral-200 pt-3 flex justify-between text-neutral-900 font-display font-black text-[16px]">
                  <span>Tổng thanh toán (COD):</span>
                  <span className="text-orange-500 font-mono text-lg">{formatPrice(totalBill)}</span>
                </div>
              </div>

              {/* Action trigger steps */}
              {!isCheckoutStep ? (
                <button
                  onClick={() => setIsCheckoutStep(true)}
                  className="w-full bg-gradient-to-tr from-orange-600 to-red-500 hover:from-neutral-900 hover:to-neutral-800 text-white font-sans font-bold text-center py-4 rounded-2xl shadow-lg shadow-orange-500/15 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all block text-sm"
                >
                  Xác nhận đặt hàng giao tận nơi
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSendingOrder}
                  onClick={handlePlaceOrder}
                  className="w-full bg-neutral-900 hover:bg-orange-650 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-sans font-bold text-center py-4 rounded-2xl shadow-lg transition-all cursor-pointer block text-sm flex items-center justify-center gap-2"
                  id="checkout-confirm-btn"
                >
                  {isSendingOrder ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Đang gửi đơn hàng...
                    </>
                  ) : (
                    `Xác nhận đặt món ngay lập tức (${formatPrice(totalBill)})`
                  )}
                </button>
              )}

            </div>

          </div>

        ) : (
          
          // Empty Cart State
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center text-neutral-400">
            <span className="text-4xl mb-3">🍜</span>
            <h4 className="font-display font-semibold text-neutral-700 text-sm">Chưa có món nào đâu bạn ơi!</h4>
            <p className="font-sans text-neutral-400 text-xs mt-1">
              Duyệt ngay mì cay 7 cấp độ và topping thêm phía cột trái để lắp đầy bữa ăn sảng khoái thôi nào!
            </p>
            <button
              onClick={() => { setIsCartOpen(false); scrollSection('thuc-don'); }}
              className="mt-4 px-5 py-2 bg-neutral-900 text-white font-sans font-bold text-xs rounded-full hover:bg-orange-500 cursor-pointer transition-colors"
            >
              Xem thực đơn luôn
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
