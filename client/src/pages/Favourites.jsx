import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../services/api";
import TemplateCard from "../components/TemplateCard";
import { SWAL_CONFIRM } from "../utils/swal";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await API.get("/favorites");
      if (res.data.success) {
        setFavorites(res.data.data);
      }
    } catch {
      Swal.fire({
        title: "Could not load favorites",
        text: "Please try again later.",
        icon: "error",
        confirmButtonColor: SWAL_CONFIRM,
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (templateId, templateName) => {
    Swal.fire({
      title: "Remove from favorites?",
      text: templateName ? `"${templateName}" will be removed from your list.` : undefined,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: SWAL_CONFIRM,
      cancelButtonColor: "#e2e8f0",
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        setFavorites((prev) => prev.filter((item) => item._id !== templateId));
        Swal.fire({
          title: "Removed",
          text: "Template removed from favorites.",
          icon: "success",
          confirmButtonColor: SWAL_CONFIRM,
          timer: 1400,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-100">
      <div className="page-container">
        <header className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Your library
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Saved favorites
          </h1>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Templates you have saved for quick access.
          </p>
        </header>

        {loading ? (
          <p className="py-20 text-center text-sm font-medium text-slate-500">
            Loading favorites...
          </p>
        ) : favorites.length === 0 ? (
          <div className="card-surface mx-auto max-w-lg p-10 text-center sm:p-12">
            <h3 className="text-xl font-semibold text-slate-900">No favorites yet</h3>
            <p className="mt-2 text-sm text-slate-500">
              Browse the marketplace and save templates you want to revisit.
            </p>
            <button
              type="button"
              onClick={() => navigate("/templates")}
              className="btn-primary mt-8"
            >
              Browse templates
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {favorites.map((item) => (
                <TemplateCard
                  key={item._id}
                  template={item}
                  onRemove={removeFavorite}
                />
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-slate-500">
              {favorites.length} saved template{favorites.length !== 1 ? "s" : ""}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
