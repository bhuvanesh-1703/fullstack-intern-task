import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../services/api";
import { SWAL_CONFIRM } from "../utils/swal";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        Swal.fire({
          title: "Missing fields",
          text: "Please fill in all fields.",
          icon: "error",
          confirmButtonColor: SWAL_CONFIRM,
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          title: "Passwords do not match",
          text: "Please confirm your password.",
          icon: "error",
          confirmButtonColor: SWAL_CONFIRM,
        });
        return;
      }

      if (formData.password.length < 6) {
        Swal.fire({
          title: "Weak password",
          text: "Password must be at least 6 characters.",
          icon: "error",
          confirmButtonColor: SWAL_CONFIRM,
        });
        return;
      }

      const response = await API.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (response.data.success) {
        await Swal.fire({
          title: "Account created",
          text: "You can now sign in with your credentials.",
          icon: "success",
          confirmButtonColor: SWAL_CONFIRM,
        });
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = !error.response
        ? "Cannot reach the server. Check that the API is running."
        : error.response.data?.message ||
          "Registration failed. Please try again.";
      Swal.fire({
        title: "Registration failed",
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
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Join Template Store and start saving favorites
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-surface p-6 sm:p-8 hover:shadow-xl"
        >
          <div className="space-y-5">
            {[
              { id: "name", label: "Full name", type: "text", name: "name", placeholder: "Jane Doe", autoComplete: "name" },
              { id: "email", label: "Email", type: "email", name: "email", placeholder: "you@company.com", autoComplete: "email" },
              { id: "password", label: "Password", type: "password", name: "password", placeholder: "Min. 6 characters", autoComplete: "new-password" },
              { id: "confirmPassword", label: "Confirm password", type: "password", name: "confirmPassword", placeholder: "Repeat password", autoComplete: "new-password" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="mb-2 block text-sm font-medium text-slate-700">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="input-field"
                  required
                  autoComplete={field.autoComplete}
                />
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-slate-900 transition-all duration-300 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
