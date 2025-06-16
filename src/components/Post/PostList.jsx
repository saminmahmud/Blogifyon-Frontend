import React, { useState } from "react";
import { useGetPostsQuery } from "../../features/post/postSlice";
import PostCard from "./PostCard";
import { Link } from 'react-router'
import Pagination from "./Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import FullPageLoader from "../LoadingSpinner/FullPageLoader";


const PostList = () => {
    const [pageUrl, setPageUrl] = useState();
	const { data, isLoading, isError, error, refetch } = useGetPostsQuery(pageUrl);
    
	if (isLoading) {
		return <FullPageLoader />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	return (
		<>
            {/* Post Card  */}
            {data.results.map((post) => (
                <PostCard key={post.id} postData={post} postRefetch={refetch} />
            ))}

			{/* <!-- Pagination --> */}
			<Pagination data={data} setPageUrl={setPageUrl} />
		</>
	);
};

export default PostList;
