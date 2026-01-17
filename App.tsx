/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowDown, Heart, Activity, Users, Layers, BookOpen, MapPin, ArrowRight } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import { Pillar, Stat } from './types';

// Data Configuration
const PILLARS: Pillar[] = [
  {
    id: 'story',
    title: 'Dance as Story',
    subtitle: 'Narrative & Emotion',
    description: 'We do not just move; we speak. Every gesture is a word, every sequence a sentence. We teach students to articulate their inner narratives through the vocabulary of the body.',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'learning',
    title: 'Learning Through Movement',
    subtitle: 'Skill & Coordination',
    description: 'Developing fine motor skills, rhythm, and spatial awareness. The discipline of dance translates into cognitive discipline and focus in other areas of life.',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1518834107812-bf56c3e06a6e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'reality',
    title: 'Ground Reality',
    subtitle: 'NGO Sessions',
    description: 'Taking the studio to the streets. We partner with NGOs to provide safe spaces where marginalized youth can explore emotion without judgment.',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'journey',
    title: 'Project Journey',
    subtitle: 'Leadership & Collaboration',
    description: 'A shared path where facilitators and students grow together. Building leadership through the vulnerability of performance.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1545959955-4632837320b9?q=80&w=1000&auto=format&fit=crop'
  }
];

const STATS: Stat[] = [
  { id: '1', label: 'Sessions Conducted', value: 150, suffix: '+' },
  { id: '2', label: 'Students Impacted', value: 450, suffix: '' },
  { id: '3', label: 'Emotions Explored', value: 12, suffix: ' Core Themes' },
];

const CountUp: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-heading font-bold text-5xl md:text-7xl text-[#C4161C]">
      {count}{suffix}
    </span>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-white bg-black selection:bg-[#C4161C] selection:text-white cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-8 mix-blend-difference">
        <div className="font-heading text-2xl md:text-3xl font-bold tracking-wider text-white z-50">ANGIKA</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 text-sm font-medium tracking-widest uppercase text-white/80">
          {['Mission', 'Pillars', 'Impact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#C4161C] transition-colors relative group"
              data-hover="true"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#C4161C] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
        
        <button className="hidden md:block border border-white/20 hover:border-[#C4161C] px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-[#C4161C] hover:text-white transition-all duration-500 rounded-full" data-hover="true">
          Contact
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Mission', 'Pillars', 'Impact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#C4161C] transition-colors"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0 opacity-40">
           {/* Placeholder for video or cinematic image */}
           <img 
             src="https://images.unsplash.com/photo-1518834107812-bf56c3e06a6e?q=80&w=2000&auto=format&fit=crop" 
             
             className="w-full h-full object-cover grayscale"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 text-center flex flex-col items-center max-w-5xl"
        >
          <div className="mb-6 flex items-center gap-4">
             <div className="h-px w-12 bg-[#C4161C]" />
             <span className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-gray-300">A Social Impact Initiative</span>
             <div className="h-px w-12 bg-[#C4161C]" />
          </div>

          <h1 className="text-6xl md:text-9xl font-heading leading-[0.9] font-medium tracking-tight mb-8">
            Where <br/>
            <span className="italic text-[#C4161C] font-light">Movement</span> Speaks
          </h1>

          <p className="text-lg md:text-xl font-light text-gray-300 max-w-xl mx-auto leading-relaxed mb-12">
            Expression Beyond Words. We use the language of the body to tell stories, regulate mental health, and bridge communities.
          </p>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] tracking-widest uppercase">Explore</span>
          <ArrowDown className="w-5 h-5 text-[#C4161C]" />
        </motion.div>
      </header>

      {/* MISSION / ABOUT SECTION */}
      <section id="mission" className="relative py-24 md:py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-heading mb-8 leading-tight">
              The <span className="text-[#C4161C]">Sanskrit</span> <br/> Intellectual
            </h2>
            <p className="text-gray-300 leading-loose text-lg mb-8 font-light">
              "Angika" refers to the body as a medium of expression. In a world obsessed with verbal articulation, we turn to the primitive, honest language of movement.
            </p>
            <p className="text-gray-300 leading-loose text-lg font-light">
              Our methodology is not about perfect choreography; it is about emotional release. We follow a rigorous psychological flow:
            </p>
            
            <ul className="mt-8 space-y-4 font-mono text-sm tracking-wide text-[#C4161C]">
              {['01. Emotional Check-in', '02. Somatic Warm-up', '03. Theme Expression', '04. Reflective Circle'].map((step, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  {step}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
             <div className="aspect-[3/4] rounded-full overflow-hidden border border-white/10 relative z-10">
               <img 
                 src="https://images.unsplash.com/photo-1535525153412-5a091c570148?q=80&w=1000&auto=format&fit=crop" 
                 alt="Expression" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-[#C4161C]/20 mix-blend-overlay" />
             </div>
             {/* Decorative Circle */}
             <div className="absolute top-10 -right-10 w-full h-full border border-[#C4161C]/30 rounded-full -z-0" />
          </motion.div>
        </div>
      </section>

      {/* PILLARS SECTION (Grid) */}
      <section id="pillars" className="py-24 md:py-32 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading mb-4">Core Pillars</h2>
            <div className="w-24 h-1 bg-[#C4161C] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-black border border-white/10 p-8 md:p-12 min-h-[400px] flex flex-col justify-end overflow-hidden"
              >
                {/* Background Image on Hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                  <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover grayscale" />
                </div>
                
                <div className="relative z-10 pointer-events-none">
                  <div className="mb-6 p-4 border border-[#C4161C] rounded-full w-fit bg-black text-[#C4161C]">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-heading mb-2">{pillar.title}</h3>
                  <p className="text-[#C4161C] text-sm font-mono uppercase tracking-widest mb-6">{pillar.subtitle}</p>
                  
                  <p className="text-gray-400 font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT / REPORTING */}
      <section id="impact" className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-heading mb-8">Measurable <br/> Impact</h2>
            <p className="text-gray-300 font-light text-lg mb-12">
              While art is subjective, our impact is tangible. We track student engagement, emotional breakthroughs, and community reach to ensure our methodology creates real-world change.
            </p>
            
            <div className="p-8 border-l-2 border-[#C4161C] bg-white/5 italic font-heading text-xl md:text-2xl text-gray-200">
              "Today my body said what my voice was too afraid to whisper."
              <br/>
              <span className="text-sm font-mono text-[#C4161C] not-italic mt-4 block uppercase tracking-widest">- Student, Grade 9</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-8">
            {STATS.map((stat, i) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col md:flex-row items-baseline md:items-center gap-4 md:gap-8 pb-8 border-b border-white/10"
              >
                <div className="w-full md:w-auto">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xl md:text-2xl font-light text-white">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="font-heading text-4xl mb-6">ANGIKA</div>
            <p className="text-gray-400 max-w-sm font-light">
              Where movement speaks. A social impact initiative redefining expression.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-mono uppercase text-[#C4161C] tracking-widest text-sm mb-2">Connect</h4>
            <a href="#" className="text-white hover:text-[#C4161C] transition-colors flex items-center gap-2 group">
              Instagram <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
            </a>
            <a href="#" className="text-white hover:text-[#C4161C] transition-colors flex items-center gap-2 group">
              Email Us <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
            </a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center md:text-left text-xs text-gray-600 font-mono">
          © 2025 PROJECT ANGIKA. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default App;