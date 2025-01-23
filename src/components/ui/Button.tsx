import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium focus:outline-none transition-colors";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  const disabledStyles = "opacity-50 cursor-not-allowed";


  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        disabled && disabledStyles,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

