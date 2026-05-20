import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../services/api";
import { SWAL_CONFIRM } from "../utils/swal";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        Swal.fire({
          title: "Missing fields",
          text: "Please fill in all fields.",
          icon: "error",
          confirmButtonColor: SWAL_CONFIRM,
        });
        return;
      }

      const response = await API.post("/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        await Swal.fire({
          title: "Welcome back",
          text: `Signed in as ${response.data.data.user.name}.`,
          icon: "success",
          confirmButtonColor: SWAL_CONFIRM,
        });

        const redirectTo = location.state?.from?.pathname || "/templates";
        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      const errorMessage = !error.response
        ? "Cannot reach the server. Check that the API is running."
        : error.response.data?.message || "Login failed. Please try again.";
      Swal.fire({
        title: "Login failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: SWAL_CONFIRM,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Access templates and manage your favorites
          </p>
        </div>

        {location.state?.loginRequired && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-md"
          >
            Please sign in to access that page.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="card-surface p-6 sm:p-8 hover:shadow-xl"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-slate-900 transition-all duration-300 hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
