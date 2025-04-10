import React from 'react';
import { cn } from '../utils';

const GhibliInput = React.forwardRef(({
  className,
  type = "text",
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-ghibli border border-ghibli-cream/70 bg-white px-3 py-2 text-sm",
        "shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-ghibli-brown/40 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ghibli-teal focus-visible:border-ghibli-teal",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

GhibliInput.displayName = "GhibliInput";

export { GhibliInput }; 