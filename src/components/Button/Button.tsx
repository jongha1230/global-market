import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";

const buttonVariant = cva(
  "border font-semibold transition-all duration-300 rounded-lg",
  {
    variants: {
      intent: {
        primary: "bg-accent-100 ",
        secondary: "bg-secondary-100",
        danger: "bg-danger-100",
      },
      size: {
        sm: "px-3 py-2 text-[13px]",
        md: "px-4 py-3 text-[15px]",
        lg: "px-5 py-4 text-[17px]",
      },
      variant: {
        outline: "bg-white-100",
        contained: "text-white-100",
      },
      width: {
        w200: "w-[200px]",
        w300: "w-[300px]",
        full: "w-full",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        variant: "contained",
        className: "bg-accent-100 text-white-100 hover:bg-accent-70",
      },
      {
        intent: "primary",
        variant: "outline",
        className:
          "text-accent-100 border-accent-100 hover:text-white-100 hover:bg-accent-100",
      },
      {
        intent: "secondary",
        variant: "contained",
        className: "bg-secondary-100 text-white-100 hover:bg-secondary-70",
      },
      {
        intent: "secondary",
        variant: "outline",
        className:
          "text-secondary-100 border-secondary-100 hover:text-white-100 hover:bg-secondary-100",
      },
      {
        intent: "danger",
        variant: "contained",
        className: "bg-danger-100 text-white-100 hover:bg-danger-70",
      },
      {
        intent: "danger",
        variant: "outline",
        className:
          "text-danger-100 border-danger-100 hover:text-white-100 hover:bg-danger-100",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
      variant: "contained",
      width: "w200", // 기본 width 설정
    },
  }
);

type ButtonVariant = VariantProps<typeof buttonVariant>;

type ButtonProps = ButtonVariant &
  (
    | ({} & ComponentProps<"button">)
    | ({ href: string } & ComponentProps<typeof Link>)
  );

function Button({
  children,
  intent,
  size,
  variant,
  width,
  ...props
}: PropsWithChildren<ButtonProps>) {
  if ("href" in props) {
    return (
      <Link
        className={buttonVariant({ intent, size, variant, width })}
        {...props}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={buttonVariant({ intent, size, variant, width })}
        {...props}
      >
        {children}
      </button>
    );
  }
}

export default Button;
