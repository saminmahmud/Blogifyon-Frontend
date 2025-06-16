import React from "react";
import { useNavigate } from "react-router";
import { BiError } from "react-icons/bi";

const ErrorPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
			<div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
				<BiError className="text-red-500 text-6xl mx-auto mb-4" />
				<h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
				<button
					onClick={() => navigate(-1)}
					className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition cursor-pointer"
				>
					Go Back
				</button>
			</div>
		</div>
	);
};

export default ErrorPage;
