"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Next.js has revolutionized the way we build web applications. It's fast, efficient, and a joy to work with.",
    author: "Jane Doe",
    role: "CTO, Tech Innovators",
  },
  {
    quote:
      "The performance gains we've seen with Next.js are incredible. Our site loads in a blink!",
    author: "John Smith",
    role: "Lead Developer, FastSite",
  },
  {
    quote:
      "Next.js's built-in optimizations have significantly improved our SEO rankings.",
    author: "Emily Brown",
    role: "SEO Specialist, WebPros",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <p className="text-lg mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
