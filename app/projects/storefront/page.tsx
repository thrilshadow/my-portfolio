"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

// Product Type Definition
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  stock: number;
};

type Toast = {
  id: number;
  message: string;
  type: 'purchase' | 'low-stock';
};

type CartItem = Product & { quantity: number };

// Mock Products Data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    description: "High-fidelity audio with active noise cancellation and 30-hour battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500",
    stock: 12,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    originalPrice: 399.99,
    description: "Advanced health tracking, GPS navigation, and seamless smartphone integration.",
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500",
    stock: 8,
  },
  {
    id: 3,
    name: "4K Webcam",
    price: 199.99,
    originalPrice: 249.99,
    description: "Crystal-clear 4K video with auto-focus and built-in studio microphone.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=500",
    stock: 15,
  },
  {
    id: 4,
    name: "Portable SSD 2TB",
    price: 179.99,
    originalPrice: 249.99,
    description: "Ultra-fast data transfer speeds and rugged design for on-the-go professionals.",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=500",
    stock: 20,
  },
  {
    id: 5,
    name: "USB-C Hub Pro",
    price: 69.99,
    originalPrice: 89.99,
    description: "7-in-1 multiport hub with HDMI, USB 3.0, and SD card reader.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&q=80&w=500",
    stock: 28,
  },
  {
    id: 6,
    name: "Mechanical Keyboard RGB",
    price: 119.99,
    originalPrice: 149.99,
    description: "Premium mechanical switches with customizable RGB lighting and wireless connectivity.",
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1587829191301-2a01e5f060b6?auto=format&fit=crop&q=80&w=500",
    stock: 18,
  },
];

export default function StorefrontDemo() {
  const { cart, addToCart, removeFromCart, updateQuantity, cartItemCount } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = React.useRef(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

  // Flash sale countdown timer
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 45, seconds: 30 }; // Reset
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Live inventory simulator - randomly decreases stock every 30 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prevProducts) => {
        const randomIndex = Math.floor(Math.random() * prevProducts.length);
        const randomProduct = prevProducts[randomIndex];
        
        // Only decrease stock if it's > 0
        if (randomProduct.stock > 0) {
          const newProducts = [...prevProducts];
          newProducts[randomIndex] = {
            ...randomProduct,
            stock: Math.max(0, randomProduct.stock - Math.floor(Math.random() * 3) + 1), // Decrease 1-2 items
          };

          // Show purchase toast
          addToast(`Someone just purchased ${randomProduct.name} 🎉`, 'purchase');

          // Show low stock warning if needed
          if (newProducts[randomIndex].stock < 5 && newProducts[randomIndex].stock > 0) {
            addToast(`⚠️ Low Stock: Only ${newProducts[randomIndex].stock} left of ${randomProduct.name}`, 'low-stock');
          }

          return newProducts;
        }
        return prevProducts;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Toast management
  const addToast = (message: string, type: 'purchase' | 'low-stock') => {
    const id = toastIdRef.current;
    toastIdRef.current += 1;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  // Add to cart function
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // Remove from cart function
  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  // Update quantity function
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Toast Notifications */}
      <div className="fixed top-20 right-6 z-40 space-y-3 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-6 py-4 rounded-lg border backdrop-blur-sm animation-fade-in ${
              toast.type === 'purchase'
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-100'
                : 'bg-red-500/20 border-red-500/50 text-red-100'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Back Button & Header */}
      <header className="pt-20 px-6 max-w-7xl mx-auto mb-0">
        <Link href="/scalable-storefront-api" className="text-yellow-500 hover:text-yellow-400 transition font-semibold flex items-center gap-2 mb-8">
          <span>←</span> Back to API Overview
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              TechHub Store
            </h1>
            <p className="text-neutral-400">Premium tech products for creators and professionals</p>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative px-6 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            <span className="flex items-center gap-2">
              🛒 Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </span>
          </button>
        </div>
      </header>

      {/* Featured Hero Section */}
      <section className="relative px-6 max-w-7xl mx-auto mb-20 overflow-hidden">
        <div className="relative bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-50" />
          
          {/* Content */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-12 md:p-16">
            <div>
              <span className="text-yellow-500 font-semibold text-sm uppercase tracking-widest">New Arrival</span>
              <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6 leading-tight">
                Premium Wireless <span className="text-yellow-500">Headphones</span>
              </h2>
              <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
                Experience studio-quality audio with industry-leading noise cancellation. 30-hour battery life meets premium comfort.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products/1" className="px-8 py-4 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400 transition text-center">
                  Shop the Drop
                </Link>
                <button className="px-8 py-4 border border-yellow-500 text-yellow-500 rounded-xl font-bold hover:bg-yellow-500/10 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="h-96 overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600"
                alt="Featured Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center backdrop-blur-md">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
            <p className="text-neutral-400 text-sm">Free shipping on orders over $50. Express delivery available.</p>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center backdrop-blur-md">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
            <p className="text-neutral-400 text-sm">256-bit SSL encryption with certified security.</p>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center backdrop-blur-md">
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
            <p className="text-neutral-400 text-sm">Live chat, email, and phone support always available.</p>
          </div>
        </div>
      </section>

      {/* Flash Sale Timer Banner */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="relative bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 border border-yellow-500/50 rounded-2xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5" />
          <div className="relative text-center">
            <span className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm mb-4">
              ⏰ Limited Time Offer
            </span>
            <h3 className="text-3xl md:text-4xl font-black mb-6 text-white">
              Up to <span className="text-yellow-400">40% OFF</span> Selected Items
            </h3>
            <div className="flex justify-center gap-4 md:gap-8">
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-black text-yellow-500">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs text-neutral-400 uppercase tracking-widest mt-2">Hours</div>
              </div>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-black text-yellow-500">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs text-neutral-400 uppercase tracking-widest mt-2">Minutes</div>
              </div>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-black text-yellow-500">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs text-neutral-400 uppercase tracking-widest mt-2">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-4">Featured Products</h2>
          <p className="text-neutral-400 text-lg">Curated selection of premium tech gear</p>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500 transition mb-8"
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const discountPercent = product.originalPrice 
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : 0;
            return (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition group flex flex-col h-full cursor-pointer relative">
                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 right-4 z-10 bg-orange-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                    -{discountPercent}% OFF
                  </div>
                )}

                {/* Product Image */}
                <div className="h-48 overflow-hidden bg-neutral-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-yellow-500 mb-2 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-500 transition">
                    {product.name}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 flex-1 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Low Stock Badge */}
                  {product.stock < 5 && (
                    <div className="mb-3 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-lg w-fit">
                      <span className="text-red-500 text-xs font-bold">⚠️ Low Stock: {product.stock} left</span>
                    </div>
                  )}

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-sm text-neutral-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className={`text-2xl font-bold ${product.originalPrice ? 'text-yellow-500' : 'text-yellow-500'}`}>
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      disabled={product.stock === 0}
                      className={`px-4 py-2 rounded-lg font-semibold transition active:scale-95 ${
                        product.stock === 0
                          ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                          : 'bg-yellow-500 text-black hover:bg-yellow-400'
                      }`}
                    >
                      {product.stock === 0 ? 'Out' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">No products found matching "{searchTerm}"</p>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black mb-4">What Our Customers Say</h2>
          <p className="text-neutral-400 text-lg">Join thousands of satisfied customers worldwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: "Alex Johnson", role: "Content Creator", rating: 5, text: "Best headphones I've ever owned! The audio quality is unmatched." },
            { name: "Sarah Chen", role: "Designer", rating: 5, text: "Amazing products and incredible customer service. Highly recommend!" },
            { name: "Mike Davis", role: "Developer", rating: 5, text: "Fast shipping and premium quality. Will definitely order again!" },
            { name: "Emma Wilson", role: "Photographer", rating: 5, text: "The webcam is perfect for streaming. Crystal clear quality." },
            { name: "James Brown", role: "Musician", rating: 5, text: "Professional-grade equipment at great prices. Love it!" },
          ].map((testimonial, index) => (
            <div key={index} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md hover:border-yellow-500/30 transition">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-neutral-300 mb-4 text-sm leading-relaxed">{testimonial.text}</p>
              <div>
                <p className="font-bold text-white text-sm">{testimonial.name}</p>
                <p className="text-neutral-500 text-xs">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-900/50 py-16 px-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                TechHub
              </h3>
              <p className="text-neutral-400 text-sm">Premium tech products for creators and professionals.</p>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-bold text-white mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-yellow-500 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Shipping Info</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Returns</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">FAQ</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-yellow-500 transition">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Blog</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Careers</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition">Press</a></li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="font-bold text-white mb-4">Payment Methods</h4>
              <div className="flex gap-3 mb-4">
                <span className="bg-neutral-800 px-3 py-2 rounded text-sm">💳 Visa</span>
                <span className="bg-neutral-800 px-3 py-2 rounded text-sm">💳 Mastercard</span>
              </div>
              <div className="flex gap-3">
                <span className="bg-neutral-800 px-3 py-2 rounded text-sm">🏦 PayPal</span>
                <span className="bg-neutral-800 px-3 py-2 rounded text-sm">🍎 Apple Pay</span>
              </div>
            </div>
          </div>

          {/* Social Media & Copyright */}
          <div className="border-t border-neutral-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <p className="text-neutral-500 text-sm">© 2026 TechHub. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-neutral-400 hover:text-yellow-500 transition text-lg">𝕏</a>
                <a href="#" className="text-neutral-400 hover:text-yellow-500 transition text-lg">f</a>
                <a href="#" className="text-neutral-400 hover:text-yellow-500 transition text-lg">📷</a>
                <a href="#" className="text-neutral-400 hover:text-yellow-500 transition text-lg">▶️</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer/Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
          <div className="bg-neutral-900 border border-neutral-800 w-full md:w-[500px] h-screen md:h-[80vh] md:rounded-2xl flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-800">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-neutral-400 hover:text-white text-2xl transition"
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <p className="text-lg">Your cart is empty</p>
                  <p className="text-sm mt-2">Add some products to get started!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-neutral-800 p-6 rounded-xl border border-neutral-700"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-base">{item.name}</h4>
                        <p className="text-yellow-500 font-semibold text-base mt-2">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500 hover:text-red-400 transition text-sm font-bold"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-base transition"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-14 px-3 py-2 bg-neutral-700 rounded text-center text-base"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-base transition"
                      >
                        +
                      </button>
                      <span className="ml-auto text-yellow-500 font-bold text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="border-t border-neutral-800 p-6 space-y-3">
                <div className="flex justify-between text-neutral-400 text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400 text-sm">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-neutral-800 pt-3">
                  <span>Total:</span>
                  <span className="text-yellow-500">${total.toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 px-6 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400 transition active:scale-95">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
