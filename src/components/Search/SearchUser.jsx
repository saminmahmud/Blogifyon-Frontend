import React from "react";
import { Link } from "react-router";

const SearchUser = ({userData}) => {

	return (
		<div className="flex items-center gap-3 bg-gray-100 rounded-lg p-4 max-w-xs">
			<Link to={`/profile/${userData.id}`}>
                <img
                    src={userData.profile_picture}
                    alt="Author"
                    className="w-12 h-12 rounded-full"
                />
            </Link>
			<div>
				<Link to={`/profile/${userData.id}`} className="hover:underline">
					<p className="font-semibold text-lg">{userData.username}</p>
				</Link>
			</div>
		</div>
	);
};

export default SearchUser;
