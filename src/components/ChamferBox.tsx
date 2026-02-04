import React from "react";
import type { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

interface ChamferBoxBaseProps {
  as?: ElementType;
  children: ReactNode;
  orientation?: "tl-br" | "tr-bl";
  hasShadow?: boolean;
  hasDecoration?: boolean;
  shadowPosition?: "left" | "right";
  variant?: "dark" | "light";
  className?: string;
}

type ChamferBoxProps<T extends ElementType> = ChamferBoxBaseProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ChamferBoxBaseProps>;

export const ChamferBox = <T extends ElementType = "div">({
  as,
  children,
  orientation = "tl-br",
  hasShadow = false,
  hasDecoration = false,
  shadowPosition = "left",
  variant = "dark",
  className = "",
  ...props
}: ChamferBoxProps<T>) => {
  const Component = as || "div";
  const orientationClass = orientation;
  const shadowClass = hasShadow ? "has-shadow" : "";
  const shadowPosClass = shadowPosition === "right" ? "shadow-right" : "";
  const decorationClass = hasDecoration ? "has-decoration" : "";

  const variantStyles =
    variant === "light"
      ? {
          "--box-bg": "#d1d1d1",
          "--border-color": "rgba(0, 0, 0, 0.1)",
          "--shadow-color": "rgba(0, 0, 0, 0.4)",
          color: "#1a1a1a",
        }
      : ({} as React.CSSProperties);

  return (
    <Component
      className={`chamfer-box ${orientationClass} ${shadowClass} ${shadowPosClass} ${decorationClass} ${className}`}
      style={variantStyles}
      {...props}
    >
      {children}
    </Component>
  );
};
