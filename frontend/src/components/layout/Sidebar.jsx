import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard",  path: "/dashboard",  icon: "📊" },
  { label: "Expenses",   path: "/expenses",   icon: "💸" },
  { label: "Analytics",  path: "/analytics",  icon: "📈" },
  { label: "Profile",    path: "/profile",    icon: "👤" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 fixed top-16 left-0 bottom-0">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
              ${isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}