import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code2, Users, Bot, Globe, Zap } from 'lucide-react';

const TAGS_DATA = [
  { id: '1', label: 'Cloud Architecture', icon: <Globe size={18} />, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  { id: '2', label: 'Enterprise Security', icon: <Shield size={18} />, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  { id: '3', label: 'Custom APIs', icon: <Code2 size={18} />, color: 'text-accent-pink', bg: 'bg-accent-pink/10' },
  { id: '4', label: 'AI Automation', icon: <Bot size={18} />, color: 'text-accent-orange', bg: 'bg-accent-orange/10' },
  { id: '5', label: 'High Performance', icon: <Zap size={18} />, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  { id: '6', label: 'Team Augmentation', icon: <Users size={18} />, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
];

export default function InfiniteScrollTags() {
  // We duplicate the tags multiple times so it can scroll seamlessly before snapping back
  const infiniteTags = [...TAGS_DATA, ...TAGS_DATA, ...TAGS_DATA, ...TAGS_DATA, ...TAGS_DATA, ...TAGS_DATA];
  
  return (
    <div className="w-full overflow-hidden flex flex-col gap-6 py-10 relative">
      
      {/* Left and Right fade gradients for smooth edge clipping */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-brand-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-brand-50 to-transparent z-10 pointer-events-none" />

      {/* Row 1: Continuous scrolling left */}
      <div className="flex w-max">
        <div 
          className="flex gap-4 pr-4 animate-marquee-left"
        >
          {infiniteTags.map((tag, i) => (
            <div 
              key={`r1-${i}`}
              className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-darkbrand-100 rounded-2xl border border-brand-200 dark:border-darkbrand-200 shadow-sm shrink-0 hover:shadow-md hover:-translate-y-1 transition-all cursor-default"
            >
              <div className={`p-2 rounded-xl ${tag.bg} ${tag.color}`}>
                {tag.icon}
              </div>
              <span className="font-semibold text-brand-900 dark:text-white whitespace-nowrap">{tag.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Continuous scrolling right */}
      <div className="flex w-max">
        <div 
          className="flex gap-4 pr-4 animate-marquee-right"
        >
          {infiniteTags.reverse().map((tag, i) => (
            <div 
              key={`r2-${i}`}
              className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-darkbrand-100 rounded-2xl border border-brand-200 dark:border-darkbrand-200 shadow-sm shrink-0 hover:shadow-md hover:-translate-y-1 transition-all cursor-default"
            >
              <div className={`p-2 rounded-xl ${tag.bg} ${tag.color}`}>
                {tag.icon}
              </div>
              <span className="font-semibold text-brand-900 dark:text-white whitespace-nowrap">{tag.label}</span>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
