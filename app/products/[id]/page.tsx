"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Product Type Definition
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

// Mock Products Data (Same as Storefront)
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

// Additional product details
const productDetails: Record<number, { specs: string[]; inStock: boolean; rating: number; reviews: number }> = {
  1: {
    specs: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Hi-Res Audio certified",
      "Multipoint Bluetooth 5.3",
      "Premium build with premium materials",
      "Foldable design for portability",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 324,
  },
  2: {
    specs: [
      "Heart rate and SpO2 monitoring",
      "GPS + GLONASS navigation",
      "Water resistant up to 100m",
      "7-day battery life",
      "Sleep tracking and stress monitoring",
      "Customizable watch faces",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 256,
  },
  3: {
    specs: [
      "4K resolution at 60fps",
      "Auto-focus with face detection",
      "Built-in stereo microphone",
      "110° ultra-wide field of view",
      "USB 3.0 for seamless streaming",
      "Compatible with all major platforms",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 189,
  },
  4: {
    specs: [
      "2TB storage capacity",
      "Up to 1050MB/s read speed",
      "Shock-resistant design",
      "Compact and lightweight",
      "USB 3.2 Gen 2 connection",
      "5-year warranty included",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 412,
  },
  5: {
    specs: [
      "7 ports (USB-A x2, USB-C x2, HDMI, SD, microSD)",
      "4K HDMI output",
      "100W power delivery",
      "Aluminum construction",
      "Plug and play - no drivers needed",
      "Works with Mac, Windows, and Linux",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 178,
  },
  6: {
    specs: [
      "Cherry MX mechanical switches",
      "Customizable RGB backlight",
      "Wireless + wired connection modes",
      "Aluminum case construction",
      "Programmable macro keys",
      "2000mAh rechargeable battery",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 567,
  },
};

// Review Type
type Review = {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
};

// Mock Reviews Data
const mockReviews: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      author: "Alex Johnson",
      rating: 5,
      date: "2 weeks ago",
      title: "Best headphones I've owned!",
      text: "The sound quality is incredible and the noise cancellation actually works. Battery lasts forever. Highly recommend!",
    },
    {
      id: 2,
      author: "Sarah Chen",
      rating: 4,
      date: "1 month ago",
      title: "Great but a bit pricey",
      text: "Excellent audio quality and very comfortable. Would be 5 stars but the price is on the higher side.",
    },
    {
      id: 3,
      author: "Mike Davis",
      rating: 5,
      date: "1 month ago",
      title: "Perfect for travel",
      text: "Lightweight, durable, and the ANC is phenomenal. Great for flights and commuting.",
    },
  ],
  2: [
    {
      id: 1,
      author: "Emma Wilson",
      rating: 5,
      date: "3 days ago",
      title: "Life-changing health tracker",
      text: "The health tracking features are incredibly accurate. Love the GPS and all the metrics it provides.",
    },
    {
      id: 2,
      author: "James Brown",
      rating: 4,
      date: "2 weeks ago",
      title: "Good but battery could be better",
      text: "Great smartwatch with tons of features. Battery lasts about 7 days which is decent.",
    },
  ],
  3: [
    {
      id: 1,
      author: "Lisa Park",
      rating: 5,
      date: "1 week ago",
      title: "Crystal clear video quality",
      text: "Perfect for streaming and content creation. The 4K quality is sharp and the auto-focus works flawlessly.",
    },
  ],
  4: [
    {
      id: 1,
      author: "Tom Harris",
      rating: 5,
      date: "5 days ago",
      title: "Fast and reliable storage",
      text: "Transfer speeds are incredibly fast. Great for video editing and content creators.",
    },
    {
      id: 2,
      author: "Rachel Green",
      rating: 5,
      date: "2 weeks ago",
      title: "Worth every penny",
      text: "Extremely reliable SSD. No issues whatsoever. Highly durable construction.",
    },
  ],
  5: [
    {
      id: 1,
      author: "Chris Lee",
      rating: 4,
      date: "1 week ago",
      title: "Handy multiport hub",
      text: "Solves all my connectivity issues. Great build quality though it can get a bit warm under heavy use.",
    },
  ],
  6: [
    {
      id: 1,
      author: "Nina Patel",
      rating: 5,
      date: "3 days ago",
      title: "Mechanical perfection",
      text: "Amazing mechanical keyboard. RGB lighting is customizable, switches are responsive, and wireless mode works great.",
    },
    {
      id: 2,
      author: "Kevin White",
      rating: 5,
      date: "1 week ago",
      title: "Gamers dream keyboard",
      text: "Perfect for gaming and typing. Build quality is premium and the typing feel is exceptional.",
    },
  ],
};

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = mockProducts.find((p) => p.id === productId);
  const details = product ? productDetails[product.id] : null;

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const reviews = mockReviews[productId] || [];

  if (!product || !details) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <Link href="/projects/storefront" className="text-yellow-500 hover:text-yellow-400 transition">
            Return to Storefront
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewerName.trim() && reviewText.trim()) {
      setReviewSubmitted(true);
      setReviewerName("");
      setReviewText("");
      setReviewRating(5);
      setTimeout(() => setReviewSubmitted(false), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Back Button */}
      <header className="pt-20 px-6 max-w-7xl mx-auto mb-12">
        <Link href="/projects/storefront" className="text-yellow-500 hover:text-yellow-400 transition font-semibold flex items-center gap-2 mb-8">
          <span>←</span> Back to Storefront
        </Link>
      </header>

      {/* Product Detail Section */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center">
            <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            {/* Header Info */}
            <div>
              <span className="text-xs font-semibold text-yellow-500 mb-4 uppercase tracking-widest inline-block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(details.rating) ? "text-yellow-500" : "text-neutral-600"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-neutral-400">
                  {details.rating} ({details.reviews} reviews)
                </span>
              </div>

              <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Price and Stock */}
              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl mb-8">
                <p className="text-neutral-400 text-sm mb-2">Price</p>
                <h2 className="text-5xl font-black text-yellow-500 mb-4">
                  ${product.price.toFixed(2)}
                </h2>
                <p className={`font-semibold ${details.inStock ? "text-emerald-500" : "text-red-500"}`}>
                  {details.inStock ? "✓ In Stock" : "Out of Stock"}
                </p>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-neutral-800 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-neutral-800 transition text-xl"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2 py-3 bg-transparent text-center text-lg"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-neutral-800 transition text-xl"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold text-lg transition ${
                    addedToCart
                      ? "bg-emerald-500 text-white"
                      : "bg-yellow-500 text-black hover:bg-yellow-400"
                  }`}
                >
                  {addedToCart ? "✓ Added to Cart!" : "🛒 Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <section className="mt-20 pt-20 border-t border-neutral-800">
          <h2 className="text-3xl font-bold mb-8">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {details.specs.map((spec, index) => (
              <div key={index} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <span className="text-yellow-500 text-2xl mt-1">✓</span>
                  <p className="text-neutral-300">{spec}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-20 pt-20 border-t border-neutral-800">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews ({details.reviews})</h2>
          
          {/* Review Form */}
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl mb-12">
            <h3 className="text-xl font-bold mb-6">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`text-4xl transition ${
                        star <= reviewRating ? "text-yellow-500" : "text-neutral-700"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500 transition resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full px-6 py-3 rounded-lg font-bold transition ${
                  reviewSubmitted
                    ? "bg-emerald-500 text-white"
                    : "bg-yellow-500 text-black hover:bg-yellow-400"
                }`}
              >
                {reviewSubmitted ? "✓ Review Submitted!" : "Submit Review"}
              </button>
            </form>
          </div>

          {/* Existing Reviews */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                  {/* Review Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{review.title}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < review.rating ? "text-yellow-500" : "text-neutral-600"}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-neutral-400 text-sm">{review.rating}.0/5.0</span>
                      </div>
                    </div>
                    <span className="text-neutral-500 text-sm">{review.date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-neutral-300 mb-4 leading-relaxed">{review.text}</p>

                  {/* Reviewer Info */}
                  <p className="text-neutral-500 text-sm">— {review.author}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-20 pt-20 border-t border-neutral-800">
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition group cursor-pointer">
                    <div className="h-40 overflow-hidden bg-neutral-800">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold mb-2 group-hover:text-yellow-500 transition">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-yellow-500 font-bold text-lg">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </section>
    </main>
  );
}
