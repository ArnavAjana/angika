/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#000000]">
      
      {/* Blob 1: Angika Red - The Dancer's Heart */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-[#C4161C] rounded-full mix-blend-screen filter blur-[80px] opacity-20 will-change-transform"
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -25, 25, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 2: Deep Crimson - Depth */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[#5a0a0d] rounded-full mix-blend-screen filter blur-[60px] opacity-30 will-change-transform"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 3: Gold - The Spark/Impact (Subtle) */}
      <motion.div
        className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-[#C9A24D] rounded-full mix-blend-screen filter blur-[100px] opacity-10 will-change-transform"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Static Grain Overlay for Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Vignette for Cinematic feel */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/90 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;