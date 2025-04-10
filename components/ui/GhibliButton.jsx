import React from 'react';
import { cn } from '../utils';

const GhibliButton = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-ghibli-teal hover:bg-ghibli-green text-white shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300",
    secondary: "bg-ghibli-cream hover:bg-white text-ghibli-brown shadow-ghibli hover:shadow-ghibli-hover transition-all duration-300",
    subtle: "bg-white/80 backdrop-blur-sm hover:bg-white text-ghibli-deepblue shadow-sm hover:shadow transition-all duration-300",
    ghost: "hover:bg-ghibli-cream/50 text-ghibli-brown transition-all duration-300",
    link: "text-ghibli-blue hover:text-ghibli-deepblue underline-offset-4 hover:underline transition-all duration-300",
  };

  const sizes = {
    default: "h-10 px-4 py-2 rounded-ghibli text-sm",
    sm: "h-8 px-3 py-1 rounded-md text-xs",
    lg: "h-12 px-6 py-3 rounded-ghibli text-base",
    icon: "h-10 w-10 rounded-full",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ghibli-brown focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <span className="absolute inset-0 rounded-ghibli overflow-hidden opacity-0 group-hover:opacity-10">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_70%)]"></span>
      </span>
    </button>
  );
});

GhibliButton.displayName = "GhibliButton";

export { GhibliButton }; 