import React, { useContext, useEffect, useState } from "react";
import Categorybtn from "../category/Categorybtn";
import { Link } from "react-router";
import { convert } from "html-to-text";
import { AiFillLike } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import SavePostBtn from "../SavePostBtn/SavePostBtn";
import LikePostBtn from "../LikePostBtn/LikePostBtn";
import { CiEdit } from "react-icons/ci";

const ProfilePostCard = ({ post, postRefetch }) => {
	const [savedData, setSavedData] = useState(null);
	const [likeData, setLikeData] = useState(null);
	const { isLoggedIn, setIsLoggedIn, userId, setUserId } =
		useContext(AuthContext);

	useEffect(() => {
		if (post) {
			const saved = post.total_saved.find(
				saved => saved.user_id == parseInt(userId)
			);
			setSavedData(saved || null);
			
			const userLike = post.total_likes.find(
				like => like.user_id === parseInt(userId)
			);
			setLikeData(userLike || null);
		}
	}, [post, userId]);

	return (
		<div className="relative">
			{isLoggedIn && (
				<div className="flex gap-2">
					<SavePostBtn post={post} savedData={savedData} userId={userId} postRefetch={postRefetch} />
					{
						userId == post?.user?.id && (
							<Link to={`/edit-post/${post.id}`} className={`absolute top-2 right-12 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors cursor-pointer text-black `} >
								<CiEdit />
							</Link>
						)
					}
				</div>
			)}
			<div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center bg-gray-100 rounded-lg gap-5 p-4">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-3 mt-4">
						<Link to={`/profile/${post.user.id}`}>
							<img
								src={post.user.profile_picture}
								alt="Author"
								className="w-10 h-10 rounded-full"
							/>
						</Link>
						<div>
							<Link
								to={`/profile/${post.user.id}`}
								className="hover:underline"
							>
								<p className="font-semibold">
									{post.user.username}
								</p>
							</Link>
							<p className="text-sm text-gray-500">
								Published on{" "}
								{new Date(post.created_at).toLocaleDateString()}
							</p>
						</div>
					</div>
					<div>
						<Link
							to={`/post/${post.id}`}
							className="hover:underline"
						>
							<h1 className="text-2xl font-bold">{post.title}</h1>
						</Link>
						<p>
							{convert(post.body, { wordwrap: false }).slice(
								0,
								80
							)}
							...
						</p>
					</div>
					<div className="flex flex-wrap gap-2 mt-2">
						{post.categories.map((category) => (
							<Categorybtn
								key={category.id}
								category={category}
							/>
						))}
					</div>
					<div className="flex items-center gap-5">
						<LikePostBtn post={post} likeData={likeData} userId={userId} postRefetch={postRefetch} />

						<Link
							to={`/post/${post.id}`}
							className="flex justify-center items-center text-md"
						>
							<span className="font-bold">💬 </span>{" "}
							<p className="text-lg">{post.total_comments}</p>
						</Link>
					</div>
				</div>
				<Link to={`/post/${post.id}`}>
					<img
						className="w-full md:w-[180px] md:h-[180px] min-w-[180px] min-h-[180px] rounded-lg object-cover"
						src={post.post_image_url}
						alt="post image"
					/>
				</Link>
			</div>
		</div>
	);
};

export default ProfilePostCard;
