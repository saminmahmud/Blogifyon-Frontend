import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Categorybtn from "../category/Categorybtn";
import { convert } from "html-to-text";
import { AuthContext } from "../../context/AuthContext";
import SavePostBtn from "../SavePostBtn/SavePostBtn";
import LikePostBtn from "../LikePostBtn/LikePostBtn";

const PostCard = ({ postData, postRefetch }) => {
	const [savedData, setSavedData] = useState(null);
	const [likeData, setLikeData] = useState(null);
	const { isLoggedIn, setIsLoggedIn, userId, setUserId } = useContext(AuthContext);

	useEffect(() => {
		if(postData){
            const saved = postData.total_saved.find(
				saved => saved.user_id == parseInt(userId)
			);
			setSavedData(saved || null);
			
			const userLike = postData.total_likes.find(
				like => like.user_id == parseInt(userId)
			);
			setLikeData(userLike || null);
		}
	}, [postData, userId]);

	return (
		<div className="relative">
			{
				isLoggedIn && (
					<SavePostBtn post={postData} savedData={savedData} userId={userId} postRefetch={postRefetch} />
				)
			}
			
			<div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center bg-gray-100 rounded-lg gap-5 p-4">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-3 mt-4">
						<Link to={`/profile/${postData.user.id}`}>
							<img
								src={postData.user.profile_picture}
								alt="Author"
								className="w-10 h-10 rounded-full"
							/>
						</Link>
						<div>
							<Link
								to={`/profile/${postData.user.id}`}
								className="hover:underline"
							>
								<p className="font-semibold">
									{postData.user.username}
								</p>
							</Link>
							<p className="text-sm text-gray-500">
								Published on{" "}
								{new Date(postData.created_at).toLocaleDateString()}
							</p>
						</div>
					</div>
					<div>
						<Link
							to={`/post/${postData.id}`}
							className="hover:underline"
						>
							<h1 className="text-2xl font-bold ">
								{postData.title}
							</h1>
						</Link>
						<p>
							{convert(postData.body, { wordwrap: false }).slice(
								0,
								80
							)}
							...
						</p>
					</div>
					<div className="flex flex-wrap gap-2 mt-2">
						{/* postCategory */}
						{postData.categories.map((category) => (
							<Categorybtn key={category.id} category={category} />
						))}
					</div>
					<div className="flex items-center gap-5">
						<LikePostBtn post={postData} likeData={likeData} userId={userId} postRefetch={postRefetch} />

						<Link
							to={`/post/${postData.id}`}
							className="flex justify-center items-center text-md"
						>
							<span className="font-bold">💬 </span>{" "}
							<p className="text-lg">{postData.total_comments}</p>
						</Link>
					</div>
				</div>
				<Link to={`/post/${postData.id}`}>
					<img
						src={postData.post_image_url}
						className="w-full md:w-[180px] md:h-[180px] min-w-[180px] min-h-[180px] rounded-lg object-cover"
						alt="post-image"
					/>
				</Link>
			</div>
		</div>
	);
};

export default PostCard;
