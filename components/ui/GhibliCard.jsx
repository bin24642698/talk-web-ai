import React from 'react';
import { cn } from '../utils';

const GhibliCard = React.forwardRef(({
  className,
  variant = "default",
  children,
  ...props
}, ref) => {
  const variants = {
    default: "bg-ghibli-card border border-ghibli-cream/50",
    flat: "bg-white border border-ghibli-cream/30",
    transparent: "bg-white/40 backdrop-blur-sm border border-white/50",
  };

  return (
    <div
      className={cn(
        "rounded-ghibli shadow-ghibli p-4 transition-all duration-300 hover:shadow-ghibli-hover",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

GhibliCard.displayName = "GhibliCard";

export { GhibliCard }; 