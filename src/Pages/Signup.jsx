import React from 'react';
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../store/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signup, { isLoading, error }] = useSignupMutation();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const result = await signup(data).unwrap();
            dispatch(addUser(result?.data));
            navigate("/profile");
        } catch (err) {
            console.error("Signup failed:", err);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card w-96 bg-base-300 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-4">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <input
                                type="text"
                                {...register("firstName", { required: "First Name is required" })}
                                className="input input-bordered w-full max-w-xs"
                            />
                            {errors.firstName && <span className="text-error text-sm mt-1">{errors.firstName.message}</span>}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <input
                                type="text"
                                {...register("lastName")}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email ID</span>
                            </div>
                            <input
                                type="email"
                                {...register("emailId", {
                                    required: "Email ID is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address"
                                    }
                                })}
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
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                                className="input input-bordered w-full max-w-xs"
                            />
                            {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Age</span>
                            </div>
                            <input
                                type="number"
                                {...register("age", { min: { value: 18, message: "Must be 18+" } })}
                                className="input input-bordered w-full max-w-xs"
                            />
                            {errors.age && <span className="text-error text-sm mt-1">{errors.age.message}</span>}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <select {...register("gender")} className="select select-bordered w-full max-w-xs">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>

                        {error && <p className="text-error text-sm text-center mt-2">{error?.data?.message || "Signup failed"}</p>}

                        <div className="card-actions justify-center mt-6 flex-col items-center">
                            <button
                                type="submit"
                                className={`btn btn-primary w-full max-w-xs ${isLoading ? 'loading' : ''}`}
                            >
                                Sign Up
                            </button>
                            <p className="mt-4 text-center">Already have an account? <Link to="/login" className="link link-primary">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
