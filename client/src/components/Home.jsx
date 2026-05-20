import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <section className="bg-slate-100">
      <div className="page-container">
        <div className="card-surface overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="p-8 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Premium template marketplace
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Ship faster with production-ready templates
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                Browse a curated library of modern layouts for SaaS, portfolios,
                dashboards, and ecommerce. Save favorites and build with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/templates" className="btn-primary">
                  Explore templates
                </Link>
                {!token && (
                  <Link to="/register" className="btn-secondary">
                    Create free account
                  </Link>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200 bg-slate-50 p-8 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Templates", value: "50+" },
                  { label: "Categories", value: "8" },
                  { label: "Responsive", value: "100%" },
                  { label: "Updates", value: "Weekly" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
