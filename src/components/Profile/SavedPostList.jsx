import React, { useState } from "react";
import { useGetSavedPostsByUserQuery } from "../../features/post/postSlice";
import ProfilePostCard from "./ProfilePostCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";

const SavedPostList = ({ userId }) => {
	const [pageUrl, setPageUrl] = useState();

	const { data, isLoading, isError, error } = useGetSavedPostsByUserQuery({userId,pageUrl});

	if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ErrorPage />;
	}

    
	return (
		<>
			{/* Saved Post Card   */}
			{data.results.map((res) => {
                const post = {
                    ...res.post,
                    created_at: res.created_at,
                };

                return <ProfilePostCard key={res.id} post={post} />;
            })}


			{/* <!-- Pagination --> */}
			<div className="flex justify-center items-center gap-4 mt-4">
				<button
					onClick={() => setPageUrl(data.previous)}
					disabled={!data.previous}
					className={`border px-4 py-2 rounded-full ${
						data.previous
							? "bg-gray-300  cursor-pointer"
							: "bg-white cursor-not-allowed"
					}`}
				>
					Previous
				</button>
				<button
					onClick={() => setPageUrl(data.next)}
					disabled={!data.next}
					className={`border px-4 py-2 rounded-full ${
						data.next
							? "bg-gray-300  cursor-pointer"
							: "bg-white cursor-not-allowed"
					}`}
				>
					Next
				</button>
			</div>
		</>
	);
};

export default SavedPostList;
