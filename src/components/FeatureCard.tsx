import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-start p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 group-hover:bg-blue-100 transition-colors duration-500"></div>
      
      <div className="relative z-10 w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-500/30">
        <Icon size={32} />
      </div>
      <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{title}</h3>
      <p className="relative z-10 text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors">
        {description}
      </p>
    </div>
  );
}
