import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useGetSearchPostQuery } from "../features/post/postSlice";
import { useGetSearchUserQuery } from "../features/User/userSlice";
import SearchUser from "../components/Search/SearchUser";
import SearchPostCard from "../components/Search/SearchPostCard";
import Pagination from "../components/Post/Pagination";
import { FiSearch } from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "./ErrorPage";

const Search = () => {
    const [pageUrl, setPageUrl] = useState();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchQuery = queryParams.get("q");

    const { data, isLoading, isError, error, refetch } = useGetSearchPostQuery({ pageUrl, searchTerm: searchQuery });

    const { data:userData, isLoading:userLoading, isError:userisError, error:userError } = useGetSearchUserQuery(searchQuery);
    
    if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ErrorPage />;
	}


	return (
		<div>
			<main className="w-full mx-auto mt-5 flex flex-col gap-8 px-4 sm:px-6 lg:px-8 xl:px-10 py-4">
				{/* <!-- Search Results --> */}
				<h1 className="text-xl font-semibold ">
					Search Results: "{searchQuery}"{" "}
				</h1>

				{/* <!-- All Users --> */}
				{
					userData && userData.length > 0 && (
						<>
							<div className="">
								<h1 className="text-2xl font-bold underline underline-offset-3">
									Users:
								</h1>
								<div className="w-full flex flex-col gap-5 mt-4">
									{
										userData.map((user) => (
											<SearchUser key={user.id} userData={user} />
										))
									}
								</div>
							</div>
							<hr className="border-gray-300" />
						</>
					)
				}

				{/* <!-- All Posts --> */}
				{
					data && data.results.length > 0 && (
						<div>
							<h1 className="text-2xl font-bold underline underline-offset-3">
								Posts:
							</h1>
							<div className="w-full flex flex-col gap-5 mt-4">
								{data.results.map((post) => (
									<SearchPostCard key={post.id} post={post} postRefetch={refetch} />
								))}

								<Pagination data={data} setPageUrl={setPageUrl} />
							</div>
						</div>
					)
				}

				{
					(!data || data.results.length === 0) && (!userData || userData.length === 0) && (
						<div className="flex flex-col items-center justify-center mt-20">
							<FiSearch className="text-5xl text-gray-400 mb-4" />
							<p className="text-lg text-gray-600">
								No results found for "<span className="font-semibold">{searchQuery}</span>"
							</p>
							<p className="text-sm text-gray-500 mt-2">Try refining your search or check your spelling.</p>
						</div>
					)
				}

			</main>
		</div>
	);
};

export default Search;
