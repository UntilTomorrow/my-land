import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
        <ChatWidget />
      </main>
      <Footer />
    </div>
  );
}
