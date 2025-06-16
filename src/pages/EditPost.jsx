import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import {
	useEditPostMutation,
	useGetPostByIdQuery,
} from "../features/post/postSlice";
import FullPageLoader from "../components/LoadingSpinner/FullPageLoader";
import ErrorPage from "./ErrorPage";
import { useGetCategoriesQuery } from "../features/category/categorySlice";

const EditPost = () => {
	const { id } = useParams();
	const [postEditData, setPostEditData] = useState({
		title: "",
		body: "",
		category_ids: [],
		post_image_url: null,
	});
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const {
		data: postData,
		isLoading: postLoading,
		isError: postIsError,
		error: postError,
		refetch: postRefetch,
	} = useGetPostByIdQuery(id);

	const {
		data: categoryData,
		isLoading: categoryLoading,
		isError: categoryIsError,
	} = useGetCategoriesQuery();

	const [editPost, { isLoading: editPostLoading, error: editPostError }] =
		useEditPostMutation();

	useEffect(() => {
		if (
			postData?.title &&
			postData?.body &&
			postData?.categories &&
			categoryData?.length > 0
		) {
			setPostEditData({
				title: postData.title,
				body: postData.body,
				post_image_url: postData.post_image_url,
				category_ids: postData.categories.map((cat) => cat.id),
			});
		}
	}, [postData, categoryData]);

	if (categoryLoading || postLoading || !postEditData.title) {
		return <FullPageLoader />;
	}
	if (postIsError || categoryIsError) {
		return <ErrorPage />;
	}

	const customUploadAdapter = (loader) => {
		return {
			upload: () => {
				return new Promise((resolve, reject) => {
					const data = new FormData();
					loader.file.then((file) => {
						data.append("upload", file);

						const token = localStorage.getItem("token");

						// console.log("Using token:", token); // Debug log

						axios
							.post("http://127.0.0.1:8000/upload-image/", data, {
								headers: {
									"Content-Type": "multipart/form-data",
									Authorization: `Token ${token}`, // ✅ Correct header
								},
							})
							.then((res) => {
								resolve({
									default: res.data.url,
								});
							})
							.catch((err) => {
								// console.error("Upload error:", err.response); // Detailed error
								reject(err);
							});
					});
				});
			},
		};
	};

	function uploadPlugin(editor) {
		editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
			customUploadAdapter(loader);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		const formData = new FormData();
		if (postEditData.post_image_url instanceof File) {
			formData.append("post_image_url", postEditData.post_image_url);
		}
		formData.append("title", postEditData.title);
		formData.append("body", postEditData.body);
		postEditData.category_ids.forEach((id) =>
			formData.append("category_ids", id)
		);

		try {
			await editPost({ id, body: formData }).unwrap();

			postRefetch();
			navigate("/");
		} catch (err) {
			// console.log(err)
			// console.log(editPostError)
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 ">
			<div className="rounded-lg shadow-md max-w-lg mx-auto p-6 mt-6">
				<h1 className="text-2xl font-bold mb-4 underline underline-offset-2 text-center">
					Edit Post
				</h1>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor="title"
							className="block text-md font-medium text-gray-700"
						>
							Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={postEditData.title}
							onChange={(e) =>
								setPostEditData({
									...postEditData,
									title: e.target.value,
								})
							}
							className="mt-1 h-8 px-2 block w-full border-gray-300 rounded-md shadow-sm border focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="category_ids"
							className="block text-md font-medium text-gray-700"
						>
							Categories
						</label>
						<select
							id="category_ids"
							name="category_ids"
							multiple
							value={postEditData.category_ids}
							onChange={(e) =>
								setPostEditData({
									...postEditData,
									category_ids: Array.from(
										e.target.selectedOptions,
										(option) => option.value
									),
								})
							}
							className="mt-1 block w-full h-32 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
						>
							{categoryData.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div>
						{postEditData.post_image_url &&
							!(postEditData.post_image_url instanceof File) && (
								<img
									src={postEditData.post_image_url}
									alt="Preview"
									className="h-16 w-16 mt-2 rounded-full border-2 border-black"
								/>
							)}
						{postEditData.post_image_url instanceof File && (
							<img
								src={URL.createObjectURL(
									postEditData.post_image_url
								)}
								alt="Preview"
								className="h-16 w-16 mt-2 rounded-full border-2 border-black"
							/>
						)}

						<label
							htmlFor="post_image_url"
							className="block text-md font-medium text-gray-700"
						>
							Post Image URL
						</label>
						<input
							type="file"
							name=""
							id=""
							onChange={(e) => {
								const file = e.target.files[0];
								if (file) {
									// setPostEditData({ ...postEditData, post_image_url: file });
									setPostEditData((prevData) => ({
										...prevData,
										post_image_url: file,
									}));
								}
							}}
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm border focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="body"
							className="block text-md font-medium text-gray-700"
						>
							Body
						</label>
						<CKEditor
							editor={ClassicEditor}
							config={{
								extraPlugins: [uploadPlugin],
							}}
							data={postEditData.body}
							onChange={(event, editor) => {
								const data = editor.getData();
								setPostEditData({
									...postEditData,
									body: data,
								});
							}}
						/>
					</div>
					{error && (
						<div className="text-red-500 text-sm">{error}</div>
					)}

					<div className="flex justify-end">
						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
							disabled={editPostLoading}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditPost;
