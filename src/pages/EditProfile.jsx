import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { useEditUserMutation, useGetUserQuery } from "../features/User/userSlice";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "./ErrorPage";

const EditProfile = () => {
	const { id } = useParams();
  
	const [inputData, setInputData] = useState({
        profile_picture: null,
        bio: "",
        address: "",
        twitter: "",
        facebook: "",
        linkedin: ""
    });

	const navigate = useNavigate();
    
    const { data, isLoading, isError, error } = useGetUserQuery(id);
	const [updateUser, {isLoading:editLoading, isError:editIsError, isSuccess}] = useEditUserMutation();

    useEffect(() => {
        if (data) {
            setInputData({
                profile_picture: data.profile_picture || "",
                bio: data.bio || "",
                address: data.address || "",
                twitter: data.twitter || "",
                facebook: data.facebook || "",
                linkedin: data.linkedin || "",
            });
        }
    }, [data]);
    
    if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ErrorPage />;
	}

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setInputData((prev) => ({
				...prev,
				profile_picture: file, 
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		if (inputData.profile_picture instanceof File) {
			formData.append("profile_picture", inputData.profile_picture);
		}

		formData.append("bio", inputData.bio);
		formData.append("address", inputData.address);
		formData.append("twitter", inputData.twitter);
		formData.append("facebook", inputData.facebook);
		formData.append("linkedin", inputData.linkedin);

		try {
			await updateUser({ id, body: formData }).unwrap();
			if (isSuccess) {
				navigate(`/profile/${id}`);
			}
		} catch (err) {
			// console.error("Failed to update profile:", err);
		}
	};


   
	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 ">
			<div className="flex justify-between items-center">
				<button
					onClick={() => navigate(`/profile/${id}`)}
					className="flex justify-center items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
				>
					<IoMdArrowBack className="text-lg mr-1" /> <p>Back to Profile</p>
				</button>
			</div>

			<div className="rounded-lg shadow-md max-w-lg mx-auto p-6 mt-6">
				<h1 className="text-2xl font-bold mb-4 underline underline-offset-2 text-center">Edit Profile</h1>
				<form className="space-y-4 " onSubmit={handleSubmit} encType="multipart/form-data">
					<div>
						<label
							htmlFor="profile_picture"
							className="block text-md font-medium text-gray-700"
						>
							Profile Picture
						</label>
						{inputData.profile_picture && !(inputData.profile_picture instanceof File) && (
							<img src={inputData.profile_picture} alt="Preview" className="h-16 mt-2 rounded-full border-2 border-black" />
						)}

						{inputData.profile_picture instanceof File && (
							<img src={URL.createObjectURL(inputData.profile_picture)} alt="Preview" className="h-16 mt-2 rounded-full border-2 border-black" />
						)}

						<input
							type="file"
                            onChange={handleFileChange}
							id="profile_picture"
							name="profile_picture"
							placeholder="Upload a profile picture"
							className="mt-1 h-8 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="bio"
							className="block text-md font-medium text-gray-700"
						>
							Bio
						</label>
						<textarea
							id="bio"
                            value={inputData.bio}
                            onChange={handleInputChange}
							name="bio"
							rows="3"
							className="mt-1 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
						></textarea>
					</div>

					<div>
						<label
							htmlFor="address"
							className="block text-md font-medium text-gray-700"
						>
							Address
						</label>
						<input
							type="text"
                            value={inputData.address}
                            onChange={handleInputChange}
							id="address"
							name="address"
							className="mt-1 h-8 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="twitter"
							className="block text-md font-medium text-gray-700"
						>
							Twitter
						</label>
						<input
							type="text"
                            value={inputData.twitter}
                            onChange={handleInputChange}
							id="twitter"
							name="twitter"
							className="mt-1 h-8 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="facebook"
							className="block text-md font-medium text-gray-700"
						>
							Facebook
						</label>
						<input
							type="text"
                            value={inputData.facebook}
                            onChange={handleInputChange}
							id="facebook"
							name="facebook"
							className="mt-1 h-8 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="linkedin"
							className="block text-md font-medium text-gray-700"
						>
							Linkedin
						</label>
						<input
							type="text"
                            value={inputData.linkedin}
                            onChange={handleInputChange}
							id="linkedin"
							name="linkedin"
							className="mt-1 h-8 px-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					{editIsError && (
						<p className="text-red-500 text-sm mt-2">
							Failed to update profile. Please try again.
						</p>
					)}

					<button
						type="submit"
						disabled={editLoading}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
					>
						Save Changes
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
