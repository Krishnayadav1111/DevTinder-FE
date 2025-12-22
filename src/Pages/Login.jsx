import React from 'react'
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../store/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      emailId: "simran@gmail.com",
      password: "Elon@321"
    }
  });

  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(addUser(result?.data));
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                {...register("emailId", { required: "Email ID is required" })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.emailId && <span className="text-error text-sm mt-1">{errors.emailId.message}</span>}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
            </label>

            {error && <p className="text-error text-sm text-center mt-2">{error.data || "Login failed"}</p>}

            <div className="card-actions justify-center mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full max-w-xs ${isLoading ? 'loading' : ''}`}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
