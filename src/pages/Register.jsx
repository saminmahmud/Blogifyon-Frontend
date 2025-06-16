import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useLocation, useNavigate } from "react-router";
import { useRegisterMutation } from "../features/User/userSlice";

const Register = () => {
    const location = useLocation();
    const [emailValidationFailed, setEmailValidationFailed] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        recaptcha: "" 
    });
    const [error, setError] = useState(null);
    const [emailValidation, setEmailValidation] = useState(false);

    const [register, { isLoading }] = useRegisterMutation();

    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const statusParam = queryParams.get("status");
        if (statusParam === "failed") {
            setEmailValidationFailed(true);
        }
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRecaptchaChange = (token) => {
        setFormData((prev) => ({ ...prev, recaptcha: token }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirmPassword,
                recaptcha_token: formData.recaptcha
            }).unwrap();

            // console.log("Registration successful:", formData);
            setEmailValidation(true)
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                recaptcha: ""
            });

        } catch (err) {
            setError("Registration failed. Please try again.");
            console.log("Registration error:", err);
        }
    };

    return (
        <div className="flex justify-center items-center px-4 mt-5">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {
                        emailValidation && (
                            <div className="text-green-600 text-md mb-2">
                                {/* varity email  */}
                                Succesfully registered!
                                Please check your email and click the link to verify your email.
                            </div>
                        )
                    }

                    {
                        emailValidationFailed && (
                            <div className="text-green-600 text-md mb-2">
                                {/* varity email  */}
                                Email validation failed!
                                Please try registering again with a different email or contact support.
                            </div>
                        )
                    }
                    <div>
                        <label htmlFor="username" className="block text-md font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 h-10 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-md font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 h-10 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-md font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 h-10 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-md font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 h-10 px-3 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/*reCAPTCHA */}
                    <div className="mb-4">
                        <ReCAPTCHA onChange={handleRecaptchaChange} sitekey={import.meta.env.VITE_SITE_KEY} />
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
                        disabled={isLoading}
                    >
                        Register
                    </button>
        
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
