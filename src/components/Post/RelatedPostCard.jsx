import React from "react";
import { Link } from "react-router";

const RelatedPostCard = ({ post }) => {

	return (
		<div className="flex flex-col sm:flex-row gap-4 bg-gray-100 p-4 rounded-lg">
			<Link to={`/posts/${post.id}`}>
                <img
                    src={post.post_image_url}
                    alt="Related"
                    className="w-full sm:w-28 h-24 object-cover rounded-md"
                />
            </Link>
            
			<div>
				<Link to={`/post/${post.id}`} className="hover:underline">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                </Link>
				<p className="text-sm text-gray-600">
					By <Link to={`/profile/${post.user.id}`} className="hover:underline">{post.user.username}</Link> •{" "}
					{new Date(post.created_at).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
};

export default RelatedPostCard;
