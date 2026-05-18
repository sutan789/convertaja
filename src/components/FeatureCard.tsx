import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-start p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 shadow-sm">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
