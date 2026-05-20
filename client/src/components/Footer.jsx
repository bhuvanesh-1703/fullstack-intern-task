import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                TS
              </span>
              <span className="text-lg font-bold text-slate-900">Template Store</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
              A curated marketplace of modern website templates for portfolios,
              dashboards, ecommerce, and SaaS products.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Quick links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>
                <Link
                  to="/templates"
                  className="transition-all duration-300 hover:text-slate-900"
                >
                  Browse templates
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="transition-all duration-300 hover:text-slate-900"
                >
                  My favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="transition-all duration-300 hover:text-slate-900"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="transition-all duration-300 hover:text-slate-900"
                >
                  Create account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>
                <a
                  href="mailto:templatestore@gmail.com"
                  className="transition-all duration-300 hover:text-slate-900"
                >
                  templatestore@gmail.com
                </a>
              </li>
              <li>Chennai, Tamil Nadu</li>
              <li>Mon – Fri, 9:00 – 18:00 IST</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 sm:text-sm">
          © {year} Template Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
