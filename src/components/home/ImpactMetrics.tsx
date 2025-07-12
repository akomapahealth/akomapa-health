"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { id: 1, value: 250000, label: "People Reached", prefix: "", suffix: "+" },
  { id: 2, value: 75, label: "Community Clinics", prefix: "", suffix: "" },
  { id: 3, value: 1500, label: "Healthcare Professionals Trained", prefix: "", suffix: "+" },
  { id: 4, value: 45, label: "Research Publications", prefix: "", suffix: "" }
];

export default function ImpactMetrics() {
  const [counts, setCounts] = useState(metrics.map(() => 0));
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000; // Animation duration in milliseconds
    const frameRate = 30; // Updates per second
    const totalFrames = duration / (1000 / frameRate);
    
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      if (progress >= 1) {
        setCounts(metrics.map(metric => metric.value));
        clearInterval(counter);
        return;
      }
      
      // Easing function for smoother counting
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      setCounts(metrics.map(metric => 
        Math.floor(easedProgress * metric.value)
      ));
    }, 1000 / frameRate);
    
    return () => clearInterval(counter);
  }, [isInView]);
  
  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-teal-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact</h2>
          <p className="text-lg text-teal-100">
            Since our founding, we&apos;ve made significant strides in improving healthcare 
            access and outcomes across multiple regions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center bg-teal-800/50 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {metric.prefix}{counts[index].toLocaleString()}{metric.suffix}
              </div>
              <div className="text-lg text-teal-100">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}