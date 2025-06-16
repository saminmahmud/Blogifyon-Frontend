import React from "react";
import { useNavigate } from "react-router";

const Categorybtn = ({category}) => {
	const navigate = useNavigate();

	return (
		<span className="text-gray-500 px-3 py-1 rounded-full bg-white border cursor-pointer hover:bg-gray-100" onClick={()=> navigate(`/search?q=${encodeURIComponent(category.name)}`)}>
			{category.name}
		</span>
	);
};

export default Categorybtn;
