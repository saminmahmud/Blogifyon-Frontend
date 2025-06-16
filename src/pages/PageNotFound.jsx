import React from "react";
import { useNavigate } from "react-router";
import { MdOutlineErrorOutline } from "react-icons/md";

const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-center min-h-screen px-4">
			<div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
				<MdOutlineErrorOutline className="text-gray-500 text-7xl mx-auto mb-4" />
				<h1 className="text-4xl font-bold mb-2 text-gray-800">404</h1>
				<h2 className="text-xl font-semibold mb-2 text-gray-700">Page Not Found</h2>
				<p className="text-gray-600 mb-6">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<button
					onClick={() => navigate(-1)}
					className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition cursor-pointer"
				>
					Go Back
				</button>
			</div>
		</div>
	);
};

export default PageNotFound;
