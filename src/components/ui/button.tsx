
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-mindful text-white hover:bg-mindful/90 shadow-sm apple-button-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 apple-button-primary",
        outline:
          "border border-mindful/30 bg-white/10 hover:bg-mindful/5 text-mindful apple-button-secondary",
        secondary:
          "bg-mindful-lighter text-mindful-dark hover:bg-mindful-lighter/80 shadow-sm apple-button-primary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-mindful underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-3",
        sm: "h-9 rounded-full px-4",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "font-raleway")}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
