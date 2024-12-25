import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LinkButtonPropType {
  children: ReactNode;
  to: string;
}
const LinkButton = ({ children, to }: LinkButtonPropType) => {
  const navigate = useNavigate();
  const classes =
    "inline-block text-sm text-blue-500 hover:text-blue-700 hover:underline";
  if (to == "-1")
    return (
      <button className={classes} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link className={classes} to={to}>
      {children}
    </Link>
  );
};

export default LinkButton;
