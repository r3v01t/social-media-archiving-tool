import { useNavigate, useLocation } from "react-router-dom";

export default function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeTabStyle =
    "cursor-pointer rounded bg-[#111827] px-2 py-1 text-sm text-[#3B82F6]";
  const nonActiveTabStyle =
    "cursor-pointer text-sm text-[#6B7280] transition-all duration-300 ease-in-out hover:text-white";

  return (
    <div className="mx-auto">
      <div className="flex h-9 items-center justify-center gap-5 rounded-lg bg-gray-800 p-1">
        <div
          onClick={() => navigate("/")}
          className={`${
            isHome ? activeTabStyle : nonActiveTabStyle
          } w-24 h-7 flex items-center justify-center`}
        >
          Home
        </div>
        <div
          onClick={() => navigate("/dashboard")}
          className={`${
            !isHome ? activeTabStyle : nonActiveTabStyle
          } w-24 h-7 flex items-center justify-center`}
        >
          Dashboard
        </div>
      </div>
    </div>
  );
}
