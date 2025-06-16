import React, { useState } from "react";
import { useGetPostByUserIdQuery } from "../../features/post/postSlice";
import ProfilePostCard from "./ProfilePostCard";
import Pagination from "../Post/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";

const ProfilePostList = ({ userId }) => {
	const [pageUrl, setPageUrl] = useState();
	
	const { data, isLoading, isError, error, refetch } = useGetPostByUserIdQuery({userId, pageUrl});

	if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	return (
		<>
			{/* Post Card  */}
			{data.results.map((post) => (
				<ProfilePostCard key={post.id} post={post} postRefetch={refetch} />
			))}

			{/* <!-- Pagination --> */}
			<Pagination data={data} setPageUrl={setPageUrl} />
		</>
	);
};

export default ProfilePostList;
