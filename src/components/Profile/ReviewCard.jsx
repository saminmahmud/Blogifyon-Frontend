import React from "react";
import { Link } from "react-router";

const ReviewCard = ({review}) => {

	return (
		<div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
			<div className="flex items-start gap-4">
				<Link to={`/profile/${review.reviewer.id}`}>
					<img
						src={review.reviewer.profile_picture_url}
						alt="Commenter"
						className="w-10 h-10 rounded-full"
					/>
				</Link>
				<div className="flex-1">
					<Link to={`/profile/${review.reviewer.id}`} className="hover:underline">
						<p className="font-semibold">{review.reviewer.username}</p>
					</Link>
                    <p className="text-sm text-gray-600">{new Date(review.created_at).toLocaleDateString()}</p>
					<p className="text-md">{review.rating}</p>
					<p className="text-md text-gray-600">{review.body}</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
