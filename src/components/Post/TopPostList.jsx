import React from "react";
import TopPostCard from "./TopPostCard";
import { useGetTopPostsQuery } from "../../features/post/postSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import FullPageLoader from "../LoadingSpinner/FullPageLoader";

const TopPostList = () => {
	const { data, isLoading, isError, error } = useGetTopPostsQuery();

	if (isLoading) {
		return <FullPageLoader />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	return (
		<>
			{data.map((post, idx) => (
				<TopPostCard key={post.id} idx={idx+1} post={post} />
			))}
		</>
	);
};

export default TopPostList;
