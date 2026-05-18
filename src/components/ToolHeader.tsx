import React from 'react';

interface ToolHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export default function ToolHeader({ title, description, badge }: ToolHeaderProps) {
  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
      {badge && (
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-primary mb-4 ring-1 ring-inset ring-blue-700/10">
          {badge}
        </span>
      )}
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
        {title}
      </h1>
      <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500">
        {description}
      </p>
    </div>
  );
}
