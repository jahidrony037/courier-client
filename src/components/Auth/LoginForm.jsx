// src/components/auth/LoginForm.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthService } from "../../services/useAuthService";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useAuthService();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      login(res.user, res.token);
      navigate("/");
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-primary">
        Welcome Back
      </h2>

      {/* Email */}
      <div>
        <label className="label font-semibold">Email Address</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          className="input input-bordered w-full"
          placeholder="Your email"
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
          placeholder="Your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full text-lg tracking-wide"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
