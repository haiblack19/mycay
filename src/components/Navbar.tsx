import React, { useState } from 'react';
import { Flame, Menu as MenuIcon, X, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollTo: (id: string) => void;
}

export default function Navbar({ cartCount, onOpenCart, onScrollTo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Trang chủ', id: 'trang-chu' },
    { label: 'Thực đơn', id: 'thuc-don' },
    { label: 'Mì cay', id: 'mi-cay' },
    { label: 'Topping', id: 'topping' },
    { label: 'Combo', id: 'combo' },
    { label: 'Khuyến mãi', id: 'khuyen-mai' },
    { label: 'Liên hệ', id: 'lien-he' },
  ];

  const handleItemClick = (id: string) => {
    onScrollTo(id);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleItemClick('trang-chu')} 
            className="flex items-center space-x-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="bg-gradient-to-tr from-orange-600 to-red-500 p-2 rounded-full text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-neutral-900 group-hover:text-amber-600 transition-colors">
                MỲ CAY <span className="text-orange-500">HÀ MY</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollTo(item.id)}
                className="font-sans font-medium text-neutral-600 hover:text-orange-500 text-[15px] transition-colors relative py-2 group cursor-pointer"
                id={`nav-${item.id}`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop CTA & Cart Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Shopping Cart button with badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-neutral-700 hover:text-orange-500 hover:bg-neutral-50 rounded-full transition-all cursor-pointer"
              aria-label="Giỏ hàng"
              id="nav-cart-btn"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Black CTA Button */}
            <button
              onClick={() => onScrollTo('thuc-don')}
              className="bg-neutral-900 hover:bg-orange-600 hover:scale-[1.02] text-white font-sans font-semibold text-[14px] px-6 py-3 rounded-full shadow-lg shadow-neutral-950/10 hover:shadow-orange-600/10 transition-all cursor-pointer"
              id="nav-cta-btn"
            >
              Đặt món ngay
            </button>
          </div>

          {/* Mobile Right Container */}
          <div className="flex items-center space-x-3 lg:hidden">
            {/* Mobile Shopping Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-neutral-700 rounded-full hover:bg-neutral-100"
              aria-label="Giỏ hàng"
              id="nav-cart-mobile-btn"
            >
              <ShoppingCart className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-800 hover:bg-neutral-50 rounded-lg focus:outline-none transition-colors"
              aria-label="Toggle Menu"
              id="nav-hamburger-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-4 top-22 z-50 lg:hidden">
          <div 
            className="w-64 bg-white border border-neutral-200/80 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.08)] p-5 animate-in fade-in duration-200"
            id="mobile-dropdown-menu"
          >
            <div className="flex flex-col space-y-3.5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="w-full text-left font-sans font-medium text-neutral-700 hover:text-orange-500 py-1 transition-colors border-b border-neutral-50 pb-2 last:border-b-0 last:pb-0"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Drodown bottom CTA */}
              <button
                onClick={() => handleItemClick('thuc-don')}
                className="w-full bg-neutral-900 hover:bg-orange-600 text-white text-center font-sans font-semibold text-[14px] py-3 rounded-xl transition-all shadow-md mt-2"
              >
                Đặt món ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
