'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Confetti() {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];
    const newParticles = [];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 4,
        rotation: Math.random() * 360,
      });
    }
    
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size * 1.5,
          }}
          initial={{ 
            y: -20,
            opacity: 1,
            rotate: particle.rotation,
            scale: 0
          }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: particle.rotation + 180,
            scale: [0, 1, 1, 1, 0.8],
            x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}