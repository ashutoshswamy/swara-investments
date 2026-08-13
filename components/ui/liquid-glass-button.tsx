"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const liquidbuttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-[20px] font-light active:scale-95 transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "liquid-glass bg-white/10 text-foreground",
        destructive:
          "liquid-glass bg-destructive/25 text-destructive-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "liquid-glass bg-transparent text-foreground",
        secondary: "liquid-glass bg-secondary/30 text-secondary-foreground",
        ghost: "border-transparent shadow-none backdrop-blur-none bg-transparent",
        link: "border-transparent shadow-none backdrop-blur-none bg-transparent text-primary underline-offset-4 hover:underline",
        // tinted glass: same liquid-glass frost, colored with primary so it
        // still reads on light/cream backgrounds instead of washing out white-on-white.
        solid: "liquid-glass-tint text-primary-foreground",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-4 has-[>svg]:px-4",
        lg: "h-10 px-6 has-[>svg]:px-4",
        xl: "h-12 px-8 has-[>svg]:px-6",
        xxl: "h-14 px-10 has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xxl",
    },
  }
)

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(liquidbuttonVariants({ variant, size, className }))}
      {...props}
      style={{ fontFamily: "var(--font-sansation)", ...props.style }}
    >
      {children}
    </Comp>
  )
}

export { LiquidButton, liquidbuttonVariants }
