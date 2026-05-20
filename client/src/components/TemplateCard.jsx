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

const TemplateCard = ({ template, onFavorite, onRemove }) => {
  const badgeClass =
    categoryColors[template.category] || "bg-slate-100 text-slate-700";

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-xl">
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
            onClick={() => onFavorite(template._id)}
            className="btn-primary mt-5 w-full"
          >
            Save to favorites
          </button>
        )}
      </div>
    </article>
  );
};

export default TemplateCard;
