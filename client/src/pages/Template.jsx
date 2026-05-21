import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../services/api";
import TemplateCard from "../components/TemplateCard";
import { SWAL_CONFIRM } from "../utils/swal";

const Template = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await API.get("/templates");
      if (response.data.success) {
        setTemplates(response.data.data);
      }
    } catch {
      Swal.fire({
        title: "Could not load templates",
        text: "Please check that the backend is running.",
        icon: "error",
        confirmButtonColor: SWAL_CONFIRM,
      });
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (templateId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "Sign in required",
        text: "Log in to save templates to your favorites.",
        icon: "warning",
        confirmButtonColor: SWAL_CONFIRM,
      }).then(() => navigate("/login"));
      return;
    }

    try {
      const response = await API.post(`/favorites/${templateId}`);

      if (response.data.success) {
        Swal.fire({
          title: "Saved to favorites",
          icon: "success",
          confirmButtonColor: SWAL_CONFIRM,
          timer: 1600,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add favorite.";
      Swal.fire({
        title: "Could not save",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: SWAL_CONFIRM,
      });
    }
  };

  const handleFavoriteToggle = (templateId, isFavorite) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) =>
        template._id === templateId ? { ...template, isFavorite } : template,
      ),
    );
  };

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-100">
      <div className="page-container">
        <header className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Marketplace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore templates
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Discover modern, responsive layouts for your next product launch.
          </p>
        </header>

        <div className="card-surface mb-8 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field !pl-11"
                aria-label="Search templates"
              />
            </div>
            <p className="text-sm text-slate-500 lg:whitespace-nowrap">
              {loading
                ? "Loading..."
                : `${filteredTemplates.length} result${filteredTemplates.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {loading ? (
          <p className="py-20 text-center text-sm font-medium text-slate-500">
            Loading templates...
          </p>
        ) : filteredTemplates.length === 0 ? (
          <div className="card-surface mx-auto max-w-lg p-10 text-center sm:p-12">
            <h3 className="text-xl font-semibold text-slate-900">
              No templates found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try a different search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
              }}
              className="btn-primary mt-8"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template._id}
                template={template}
                onFavorite={addFavorite}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
