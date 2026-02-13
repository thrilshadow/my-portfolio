"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Product Type Definition
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type CartItem = Product & { quantity: number };

// Mock Products Data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    description: "High-fidelity audio with active noise cancellation and 30-hour battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 399.99,
    description: "Advanced health tracking, GPS navigation, and seamless smartphone integration.",
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 3,
    name: "4K Webcam",
    price: 199.99,
    description: "Crystal-clear 4K video with auto-focus and built-in studio microphone.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 4,
    name: "Portable SSD 2TB",
    price: 249.99,
    description: "Ultra-fast data transfer speeds and rugged design for on-the-go professionals.",
    category: "Storage",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 5,
    name: "USB-C Hub Pro",
    price: 89.99,
    description: "7-in-1 multiport hub with HDMI, USB 3.0, and SD card reader.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 6,
    name: "Mechanical Keyboard RGB",
    price: 149.99,
    description: "Premium mechanical switches with customizable RGB lighting and wireless connectivity.",
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1587829191301-2a01e5f060b6?auto=format&fit=crop&q=80&w=500",
  },
];

export default function StorefrontDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Add to cart function
  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove from cart function
  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Update quantity function
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products based on search
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Back Button & Header */}
      <header className="pt-20 px-6 max-w-7xl mx-auto mb-12">
        <Link href="/scalable-storefront-api" className="text-yellow-500 hover:text-yellow-400 transition font-semibold flex items-center gap-2 mb-8">
          <span>←</span> Back to API Overview
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Storefront Demo
            </h1>
            <p className="text-neutral-400">Browse products and experience the API in action</p>
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

      {/* Search Bar */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500 transition"
        />
      </section>

      {/* Products Grid */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition group flex flex-col h-full cursor-pointer">
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

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-500">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition active:scale-95"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">No products found matching "{searchTerm}"</p>
          </div>
        )}
      </section>

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
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-400 transition text-sm font-bold"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-base transition"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
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
