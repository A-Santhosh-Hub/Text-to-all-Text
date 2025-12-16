import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: React.ReactNode;
  label: string;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  variant = 'primary', 
  icon, 
  label, 
  className = '',
  disabled,
  ...props 
}) => {
  
  let baseStyles = "relative px-6 py-2 uppercase font-bold tracking-widest text-sm transition-all duration-200 clip-path-polygon group flex items-center justify-center gap-2 border hover:shadow-[0_0_15px_rgba(0,0,0,0.5)]";
  
  // Variants
  const variants = {
    primary: "border-green-500 text-green-500 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]",
    secondary: "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]",
    danger: "border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]",
    success: "bg-green-600 border-green-400 text-white hover:bg-green-500 shadow-[0_0_15px_rgba(0,255,0,0.5)]",
  };

  if (disabled) {
    baseStyles += " opacity-50 cursor-not-allowed grayscale";
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {/* Decorative corners */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-70"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-70"></span>
      
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span className="font-tech">{label}</span>
    </button>
  );
};
