import React from "react";
import { Link } from "react-router";

const TopPostCard = ({idx, post}) => {

	return (
		<div className="flex gap-3 justify-start items-start">
			<h1 className="text-2xl font-bold bg-gray-200 rounded-full px-2 border border-green-500">
				{idx}.
			</h1>
			<div className="w-full flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-2 bg-gray-100 rounded-lg p-2">
				<div className="w-full space-y-2">
					<div className="flex items-center gap-3">
						<Link to={`/profile/${post.user.id}`}>
							<img
								src={post.user.profile_picture}
								alt="Author"
								className="w-8 h-8 rounded-full"
							/>
						</Link>
						<div>
							<Link to={`/profile/${post.user.id}`} className="hover:underline">
								<p className="text-sm font-semibold">{post.user.username}</p>
							</Link>
							<p className="text-sm text-gray-500">
								Published on {new Date(post.created_at).toLocaleDateString()}
							</p>
						</div>
					</div>
					<Link to={`/post/${post.id}`} className="hover:underline">
						<h1 className="text-lg font-bold ">
							{post.title}
						</h1>
					</Link>
				</div>

				<Link to={`/post/${post.id}`} className="">
					<img
						className="w-full lg:w-24 h-24 rounded-lg object-cover"
						src={post.post_image_url}
						alt="post image"
					/>
				</Link>
			</div>
		</div>
	);
};

export default TopPostCard;
