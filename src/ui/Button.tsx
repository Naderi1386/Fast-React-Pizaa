import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonPropType {
  children: ReactNode;
  isDisabled?: boolean;
  to?: string;
  type: string;
  onClick?: () => void;
}
interface StylesType {
  primary: string;
  small: string;
  secondary: string;
  rounded:string
}
const Button = ({
  children,
  isDisabled = false,
  to = "",
  type = "primary",
  onClick,
}: ButtonPropType) => {
  const base =
    "inline-block rounded-full bg-yellow-400   font-semibold uppercase tracking-widest text-stone-800 transition-colors duration-200 ease-in hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
  const styles: StylesType = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 text-xs md:px-5 md:py-2.5 ",
    secondary:
      "inline-block rounded-full border-2 border-stone-300   font-semibold uppercase tracking-widest text-stone-800 transition-colors duration-200 ease-in hover:bg-stone-300 hover:text-stone-900  focus:outline-none focus:ring-2 focus:ring-stone-300 focus:text-stone-900 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-3.5 ",
    rounded: base + " px-2.5 py-1 text-xs md:px-3.5 md:py-2 text-sm ",
  };
  if (to)
    return (
      <Link
        className={`${type == "small" && `${styles.small} `} ${type == "primary" && `${styles.primary}`} ${type == "secondary" && `${styles.secondary}`} `}
        to={to}
      >
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        onClick={(e)=>{
          e.preventDefault()
          onClick()
        }}
        disabled={isDisabled}
        className={`${type == "small" && `${styles.small} `} ${type == "primary" && `${styles.primary}`} ${type == "secondary" && `${styles.secondary}`} ${type=='rounded' && `${styles.rounded}`} `}
      >
        {children}
      </button>
    );

  return (
    <button
      disabled={isDisabled}
      className={`${type == "small" && `${styles.small} `} ${type == "primary" && `${styles.primary}`} ${type == "secondary" && `${styles.secondary}`} ${type == "rounded" && `${styles.rounded}`} `}
    >
      {children}
    </button>
  );
};

export default Button;
