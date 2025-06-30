// src/components/auth/RegisterForm.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useAuthService } from "../../services/useAuthService";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuthService();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      if (res.token) {
        toast.success("Registration successful! Please login.");
      }
      login(res.user, res.token);
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-primary">
        Create Account
      </h2>

      {/* Name */}
      <div>
        <label className="label font-semibold">Full Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full"
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="label font-semibold">Email Address</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className="input input-bordered w-full"
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="label font-semibold">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          className="input input-bordered w-full"
          placeholder="Create a password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="label font-semibold">Choose Role</label>
        <select
          {...register("role", { required: "Please select a role" })}
          className="select select-bordered w-full"
        >
          <option value="">Select a role</option>
          <option value="customer">Customer</option>
          <option value="agent">Agent</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full text-lg tracking-wide"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
