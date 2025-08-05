import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SpecialTitleProps {
  children: ReactNode;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  className?: string;
  lineHeight?: "sm" | "md" | "lg";
}

export const SpecialTitle = ({
  children,
  level = "h2",
  align = "left",
  className = "",
  lineHeight = "md",
}: SpecialTitleProps) => {
  const Tag = level;

  const baseClasses = "relative font-bold text-gray-900 leading-tight";

  const alignClasses = {
    left: "text-left after:left-0",
    center: "text-center after:left-1/2 after:-translate-x-1/2",
    right: "text-right after:right-0",
  };

  const sizeClasses = {
    h1: "text-4xl md:text-5xl lg:text-6xl",
    h2: "text-3xl md:text-4xl lg:text-5xl",
    h3: "text-2xl md:text-3xl lg:text-4xl",
    h4: "text-xl md:text-2xl lg:text-3xl",
    h5: "text-lg md:text-xl lg:text-2xl",
    h6: "text-base md:text-lg lg:text-xl",
  };

  const lineHeightClasses = {
    sm: "after:h-20",
    md: "after:h-24",
    lg: "after:h-36",
  };

  return (
    <Tag
      className={cn(
        baseClasses,
        alignClasses[align],
        sizeClasses[level],
        lineHeightClasses[lineHeight],
        'after:content-[""] after:absolute after:top-full after:w-px after:bg-brand after:mt-1',
        className
      )}
    >
      {children}
    </Tag>
  );
};
