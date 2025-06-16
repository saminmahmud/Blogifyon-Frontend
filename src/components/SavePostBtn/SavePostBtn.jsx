import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useCreateSavedPostMutation, useDeleteSavedPostMutation } from "../../features/post/postSlice";
import { useGetUserQuery } from "../../features/User/userSlice";


const SavePostBtn = ({ post, savedData, userId, postRefetch, fromDetailsPage = false }) => {

	const [createSavePost] = useCreateSavedPostMutation();
	const [deleteSavePost] = useDeleteSavedPostMutation();
	const { data, isLoading, isError, error, refetch } = useGetUserQuery(userId);

	const handleSave = async () => {
		try {
			if (savedData) {
				await deleteSavePost({ id:savedData.id}).unwrap();
			} else {
				await createSavePost({ post_id: post.id }).unwrap();
			}
			postRefetch();
			refetch();
		} catch (error) {
			console.error("Error saving post:", error);
		}
	};

	return fromDetailsPage ? (
		<button onClick={handleSave}
			className={`px-3 py-1 cursor-pointer text-lg ${
				savedData ? "text-blue-500" : ""
			}`}
		>
			<FaBookmark />
		</button>
	) : (
		<div onClick={handleSave}
			className={`absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors cursor-pointer ${
				savedData ? "text-blue-500" : ""
			}`}
		>
			<FaBookmark />
		</div>
	);
};

export default SavePostBtn;
