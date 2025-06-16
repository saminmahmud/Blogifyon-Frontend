import React, { useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../features/User/userSlice";
import { AuthContext } from "../context/AuthContext";
import { getAuthUser, isAuthenticated, setAuth } from "../auth/auth";


const Login = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({ email: "", password: "", recaptcha_token: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserId } = useContext(AuthContext);
    const [login, { isLoading, isError }] = useLoginMutation();
    const [emailValidationSuccess, setEmailValidationSuccess] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const statusParam = queryParams.get("status");
        if (statusParam === "success") {
            setEmailValidationSuccess(true);
        }
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRecaptchaChange = (token) => {
        setFormData((prev) => ({ ...prev, recaptcha_token: token }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
            const result = await login(formData);
    
            if (result.error) {
                // console.error("Login error:", result.error);
                setError("Invalid email or password");
                return;
            }
    
            const { token, user_id } = result.data;
    
            const isSetAuth = setAuth(token, user_id);
    
            if (!isSetAuth) {
                setError("Authentication failed. Please try again.");
                return;
            }
    
            setIsLoggedIn(isAuthenticated());
            setUserId(getAuthUser());
            navigate("/");
    
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        }
    };
    
    return (
        <div className="flex justify-center items-center px-4 mt-5">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {
                        emailValidationSuccess && (
                            <div className="text-green-600 text-md mb-2">
                                {/* varity email */}
                                Email validation successful!
                                Please log in to continue.
                            </div>
                        )
                    }
                    
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
                        Log In
                    </button>
                    <div className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
