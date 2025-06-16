import React from "react";
import { useGetCategoriesQuery } from "../../features/category/categorySlice";
import Categorybtn from "./Categorybtn";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import FullPageLoader from "../LoadingSpinner/FullPageLoader";

const CategoryList = () => {
	const { data, isLoading, isError, error } = useGetCategoriesQuery();

	if (isLoading) {
		return <FullPageLoader />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	return (
		<>
			{data.map((category) => (
				<Categorybtn key={category.id} category={category} />
			))}
		</>
	);
};

export default CategoryList;
