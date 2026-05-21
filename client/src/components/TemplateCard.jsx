import { useState, useContext } from "react";
import API from "../services/api";
import Swal from "sweetalert2";
import { SWAL_CONFIRM } from "../utils/swal";
import { FavoriteContext } from "../context/FavoriteContext";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f1f5f9' width='400' height='300'/%3E%3Ctext fill='%2394a3b8' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ETemplate%3C/text%3E%3C/svg%3E";

const categoryColors = {
  Portfolio: "bg-slate-100 text-slate-700",
  Dashboard: "bg-slate-100 text-slate-700",
  Ecommerce: "bg-slate-100 text-slate-700",
  SaaS: "bg-slate-900 text-white",
  Landing: "bg-slate-100 text-slate-700",
  Blog: "bg-slate-100 text-slate-700",
};

const TemplateCard = ({ template, onFavorite, onRemove, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(template?.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);
  const { incrementFavoriteCount, decrementFavoriteCount } =
    useContext(FavoriteContext);

  const badgeClass =
    categoryColors[template.category] || "bg-slate-100 text-slate-700";

  const handleFavoriteClick = async () => {
    setIsLoading(true);

    try {
      const response = await API.put(`/templates/${template._id}/favorite`);

      if (response.data.success) {
        const newFavoriteStatus = response.data.data.isFavorite;
        setIsFavorite(newFavoriteStatus);

      
        if (newFavoriteStatus) {
          incrementFavoriteCount();
        } else {
          decrementFavoriteCount();
        }

      
        if (onFavoriteToggle) {
          onFavoriteToggle(template._id, newFavoriteStatus);
        }

        Swal.fire({
          title: newFavoriteStatus
            ? "Added to favorites"
            : "Removed from favorites",
          icon: "success",
          confirmButtonColor: SWAL_CONFIRM,
          timer: 1600,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to toggle favorite status.";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: SWAL_CONFIRM,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article
      className={`card-surface group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isFavorite ? "border-2 border-red-500" : ""}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={template.thumbnail_url}
          alt={template.name}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-[1.02]"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER;
          }}
        />

        {/* Category Badge */}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {template.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="line-clamp-2 text-lg font-semibold tracking-tight text-slate-900">
          {template.name}
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
          {template.description}
        </p>

        {onRemove ? (
          <button
            type="button"
            onClick={() => onRemove(template._id, template.name)}
            className="btn-secondary mt-5 w-full !text-slate-700"
          >
            Remove from favorites
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className="btn-primary mt-5 w-full disabled:opacity-50"
          >
            {isFavorite ? "✓ Saved to favorites" : "Save to favorites"}
          </button>
        )}
      </div>
    </article>
  );
};

export default TemplateCard;
