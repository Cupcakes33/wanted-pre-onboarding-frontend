import { useLocation, useNavigate } from "react-router-dom";

export default function SignNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPathnameColor = (pathname: string): string => {
    const defaultStyle = "transition-all hover:scale-90";
    const isPathname =
      pathname === location.pathname ? "text-neutral-700" : "text-gray-400";
    return `${defaultStyle} ${isPathname}`;
  };

  return (
    <nav className="mb-2">
      <ul className="w-[450px] flex flex-row justify-center gap-3">
        <li>
          <button
            onClick={() => navigate("/signin")}
            className={getPathnameColor("/signin")}
          >
            Sign In
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/signup")}
            className={getPathnameColor("/signup")}
          >
            Sign Up
          </button>
        </li>
      </ul>
    </nav>
  );
}
