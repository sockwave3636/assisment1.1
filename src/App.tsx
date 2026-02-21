/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Sparkles, 
  Activity, 
  Heart, 
  ArrowRight, 
  ChevronRight, 
  Download, 
  ShieldCheck, 
  Zap,
  Menu,
  X,
  Globe,
  CheckCircle2,
  Clock,
  Users,
  Smartphone
} from 'lucide-react';

// --- Scroll To Top Component ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Shared Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Download', path: '/download' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-primary/10' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg"
          >
            <Leaf className="text-white w-6 h-6" />
          </motion.div>
          <span className="text-2xl font-serif font-bold tracking-tight">EIRA</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 glass-card px-8 py-3">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`text-sm font-medium transition-colors relative group ${location.pathname === item.path ? 'text-primary' : 'hover:text-primary'}`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
        </div>

        <Link to="/download">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-primary/20 transition-all"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white p-6 border-b border-primary/10 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 border-b border-primary/5 ${location.pathname === item.path ? 'text-primary' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/download" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold mt-4">Get Started</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-primary/10 bg-primary/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-serif font-bold">EIRA</span>
        </div>
        <div className="flex gap-8 text-sm text-text/50">
          <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-primary transition-colors">Contact Us</Link>
        </div>
        <p className="text-sm text-text/40">© 2026 EIRA Ayurveda. All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- Page Components ---

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);

  const steps = [
    {
      title: "Assessment",
      description: "Comprehensive analysis of your unique constitution (Prakriti) and current imbalances (Vikriti).",
      icon: <Globe className="w-6 h-6" />,
      size: "lg:col-span-2 lg:row-span-2",
      img: "https://picsum.photos/seed/assess/600/400"
    },
    {
      title: "Personalisation",
      description: "Customised protocols tailored to your specific needs.",
      icon: <Sparkles className="w-6 h-6" />,
      size: "lg:col-span-1 lg:row-span-1",
      img: "https://picsum.photos/seed/personal/400/300"
    },
    {
      title: "Therapy",
      description: "Dosha-aligned treatments and lifestyle guidance.",
      icon: <Activity className="w-6 h-6" />,
      size: "lg:col-span-1 lg:row-span-2",
      img: "https://picsum.photos/seed/therapy/400/600"
    },
    {
      title: "Transformation",
      description: "Sustainable habits and measurable health outcomes.",
      icon: <Zap className="w-6 h-6" />,
      size: "lg:col-span-1 lg:row-span-1",
      img: "https://picsum.photos/seed/transform/400/300"
    }
  ];

  const features = [
    {
      title: "Ancient Wisdom",
      body: "Time-tested Ayurvedic principles applied to modern living.",
      icon: <Leaf className="w-8 h-8 text-primary" />
    },
    {
      title: "Modern Science",
      body: "Evidence-based approaches and continuous tracking.",
      icon: <Activity className="w-8 h-8 text-accent" />
    },
    {
      title: "Personalised Care",
      body: "Protocols designed specifically for your unique constitution.",
      icon: <Heart className="w-8 h-8 text-red-500" />
    }
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <motion.div 
            style={{ y: y1, rotate }}
            className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" 
          />
          <motion.div 
            style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
            className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Ayurveda Platform</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 hvt-title">
              Overall Wellness <br />
              <span className="text-primary italic">through Ayurveda</span>
            </h1>
            <p className="text-xl text-text/60 max-w-lg mb-10 leading-relaxed font-medium">
              Ancient Wisdom. Modern Science. Personalised Wellness. Customised consultations, dosha-aligned therapies, and continuous progress tracking.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/how-it-works">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center gap-2"
                >
                  Start Your Journey <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/packages">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2"
                >
                  View Packages
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative perspective-1000"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl neo-depth transform-gpu hover:rotate-y-12 transition-transform duration-700">
              <img 
                src="https://picsum.photos/seed/ayurveda/800/1000" 
                alt="Ayurveda Wellness" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <Activity className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Real-time Tracking</p>
                    <p className="text-white/70 text-sm">Continuous progress monitoring</p>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass-card p-4 shadow-xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                  <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-sm">Certified Protocols</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">Your Healing Journey</h2>
            <p className="text-text/60 max-w-2xl mx-auto">A structured, personalised path from assessment to transformation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${step.size} glass-card overflow-hidden group relative`}
              >
                <img 
                  src={step.img} 
                  className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-opacity duration-700" 
                  alt={step.title}
                  referrerPolicy="no-referrer"
                />
                <div className="relative p-8 h-full flex flex-col justify-between z-10">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-text/70 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="flex justify-end">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="w-10 h-10 rounded-full border border-text/10 flex items-center justify-center cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[32px] bg-primary/5 border border-primary/10 neo-depth"
              >
                <div className="mb-6">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-text/60 leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-card bg-white/40 p-12 md:p-20"
          >
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-5 h-5 text-accent fill-accent" />)}
            </div>
            <p className="text-3xl md:text-4xl font-serif italic mb-10 leading-tight">
              "EIRA has completely transformed my approach to health. The personalised protocols and tracking made all the difference."
            </p>
            <div className="flex items-center justify-center gap-4">
              <img src="https://picsum.photos/seed/priya/100/100" className="w-16 h-16 rounded-full border-4 border-primary/20" alt="Priya" referrerPolicy="no-referrer" />
              <div className="text-left">
                <p className="font-bold text-xl">Priya</p>
                <p className="text-text/50">Mumbai, India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[48px] overflow-hidden bg-white border border-primary/20 p-12 md:p-24 text-center text-text">
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
              <img src="https://picsum.photos/seed/nature/1920/1080" className="w-full h-full object-cover" alt="Nature" referrerPolicy="no-referrer" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8">Take Control of Your Wellness</h2>
              <p className="text-xl text-text/60 max-w-2xl mx-auto mb-12">
                Download the EIRA app and begin your journey to balanced, preventive health today.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 shadow-2xl shadow-primary/20"
                >
                  <Download className="w-6 h-6" /> App Store
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-text text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 shadow-2xl shadow-black/20"
                >
                  <Download className="w-6 h-6" /> Google Play
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

const Packages = () => {
  const packages = [
    {
      name: "Detox & Rejuvenation",
      duration: "7-14 Days",
      price: "Starting from $499",
      description: "A comprehensive cleanse to remove toxins and restore vitality through Panchakarma-inspired therapies.",
      features: ["Daily Consultations", "Dosha-aligned Diet", "Herbal Supplements", "Specialized Massages"],
      img: "https://picsum.photos/seed/detox/800/600"
    },
    {
      name: "Stress Management",
      duration: "5-10 Days",
      price: "Starting from $349",
      description: "Find your inner calm with therapies focused on mental clarity, deep relaxation, and nervous system support.",
      features: ["Shirodhara Sessions", "Guided Meditation", "Yoga Protocols", "Sleep Optimization"],
      img: "https://picsum.photos/seed/stress/800/600"
    },
    {
      name: "Immunity Booster",
      duration: "10-21 Days",
      price: "Starting from $599",
      description: "Strengthen your natural defenses with a focus on gut health, respiratory support, and vital energy.",
      features: ["Ojas-building Diet", "Immune-modulating Herbs", "Breathing Exercises", "Lifestyle Coaching"],
      img: "https://picsum.photos/seed/immune/800/600"
    }
  ];

  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            Wellness <span className="text-primary italic">Packages</span>
          </motion.h1>
          <p className="text-xl text-text/60 max-w-2xl mx-auto">
            Choose a path that resonates with your health goals. Each package is fully customized to your constitution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card overflow-hidden flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={pkg.img} className="w-full h-full object-cover" alt={pkg.name} referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {pkg.duration}
                </div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-primary font-bold mb-4">{pkg.price}</p>
                <p className="text-text/60 mb-6 text-sm leading-relaxed">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0">
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
                  Book Consultation
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Initial Consultation",
      body: "Connect with our expert Ayurvedic practitioners for a deep dive into your health history, lifestyle, and goals.",
      icon: <Users className="w-10 h-10 text-primary" />
    },
    {
      title: "Dosha Assessment",
      body: "Determine your unique Prakriti (birth constitution) and Vikriti (current state) through advanced diagnostic tools.",
      icon: <Activity className="w-10 h-10 text-accent" />
    },
    {
      title: "Customized Protocol",
      body: "Receive a personalized plan including diet, herbal support, therapies, and lifestyle modifications.",
      icon: <Sparkles className="w-10 h-10 text-primary" />
    },
    {
      title: "Ongoing Support",
      body: "Track your progress via the EIRA app with continuous adjustments to your protocol as you evolve.",
      icon: <Smartphone className="w-10 h-10 text-accent" />
    }
  ];

  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8">
              The Path to <span className="text-primary italic">Balance</span>
            </h1>
            <p className="text-xl text-text/60 mb-8 leading-relaxed">
              Ayurveda isn't a one-size-fits-all solution. It's a deeply personal journey of rediscovering your natural state of equilibrium. At EIRA, we bridge ancient wisdom with modern tracking to ensure your path is measurable and sustainable.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="w-12 h-12 rounded-full border-4 border-white" alt="User" referrerPolicy="no-referrer" />
                ))}
              </div>
              <p className="text-sm font-medium text-text/50">Joined by 10,000+ wellness seekers</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="rounded-[40px] overflow-hidden neo-depth">
              <img src="https://picsum.photos/seed/path/800/600" className="w-full h-auto" alt="Ayurveda Path" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-8 -left-8 glass-card p-8 max-w-xs">
              <p className="text-primary font-bold text-2xl mb-2">98%</p>
              <p className="text-text/60 text-sm">Reported improved energy levels within the first 30 days.</p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass-card border-primary/5 hover:border-primary/20 transition-all"
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-text/60 text-sm leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DownloadPage = () => {
  return (
    <section className="pt-32 pb-24 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-[0.9]">
            Wellness in your <span className="text-primary italic">Pocket</span>
          </h1>
          <p className="text-xl text-text/60 mb-10 leading-relaxed">
            The EIRA app is your daily companion for Ayurvedic living. Track your dosha balance, access personalized routines, and connect with experts anytime, anywhere.
          </p>
          
          <div className="space-y-6 mb-12">
            {[
              "Personalized Daily Routines (Dinacharya)",
              "Real-time Dosha Progress Tracking",
              "Direct Chat with Practitioners",
              "Curated Ayurvedic Library"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-primary/20"
            >
              <Download className="w-6 h-6" /> App Store
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-text text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-black/20"
            >
              <Download className="w-6 h-6" /> Google Play
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex justify-center"
        >
          <div className="relative w-[300px] md:w-[400px] aspect-[9/19] bg-text rounded-[60px] p-4 shadow-2xl neo-depth border-[8px] border-text/5 overflow-hidden">
            <img src="https://picsum.photos/seed/app/800/1600" className="w-full h-full object-cover rounded-[40px]" alt="App Interface" referrerPolicy="no-referrer" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-text rounded-b-3xl" />
          </div>
          
          {/* Floating Stats */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-20 -right-10 glass-card p-6 shadow-xl"
          >
            <p className="text-xs font-bold text-text/40 uppercase tracking-widest mb-2">Energy Level</p>
            <div className="flex items-end gap-1 h-12">
              {[40, 60, 45, 80, 55, 90].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="w-2 bg-primary rounded-full" />
              ))}
            </div>
            <p className="text-primary font-bold mt-4">+24% this week</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Main App Component ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-primary/30 selection:text-primary">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/download" element={<DownloadPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
