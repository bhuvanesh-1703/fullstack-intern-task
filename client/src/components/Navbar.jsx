import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { SWAL_CONFIRM } from "../utils/swal";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-all duration-300 ${
    isActive
      ? "text-slate-900"
      : "text-slate-500 hover:text-slate-900"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
    isActive
      ? "bg-slate-100 text-slate-900"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
  }`;

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Log out?",
      text: "You will need to sign in again to access favorites.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: SWAL_CONFIRM,
      cancelButtonColor: "#e2e8f0",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        closeMenu();

        Swal.fire({
          title: "Logged out successfully",
          text: "See you next time.",
          icon: "success",
          confirmButtonColor: SWAL_CONFIRM,
          timer: 1800,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="page-container !py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 transition-all duration-300 hover:text-slate-700 sm:text-xl"
            onClick={closeMenu}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              TS
            </span>
            <span className="hidden sm:inline">Template Store</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <NavLink to="/templates" className={linkClass}>
              Templates
            </NavLink>
            {token && (
              <NavLink to="/favorites" className={linkClass}>
                Favorites
              </NavLink>
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-500 transition-all duration-300 hover:text-slate-900"
                >
                  Log in
                </Link>
                <Link to="/register" className="btn-primary !py-2.5 !px-4">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                  {user?.name || "User"}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-secondary !py-2.5 !px-4"
                >
                  Log out
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-md md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="mt-4 space-y-1 border-t border-slate-200 pt-4 md:hidden">
            <NavLink to="/templates" className={mobileLinkClass} onClick={closeMenu}>
              Templates
            </NavLink>
            {token && (
              <NavLink to="/favorites" className={mobileLinkClass} onClick={closeMenu}>
                Favorites
              </NavLink>
            )}
            {!token ? (
              <>
                <NavLink to="/login" className={mobileLinkClass} onClick={closeMenu}>
                  Log in
                </NavLink>
                <Link
                  to="/register"
                  className="btn-primary mt-2 block w-full text-center"
                  onClick={closeMenu}
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Signed in as <span className="font-semibold text-slate-900">{user?.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-secondary mt-2 w-full"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
