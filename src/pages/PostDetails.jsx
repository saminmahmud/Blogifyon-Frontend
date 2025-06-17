import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useGetPostByIdQuery } from "../features/post/postSlice";
import Categorybtn from "../components/category/Categorybtn";
import RelatedPostCard from "../components/Post/RelatedPostCard";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import { AuthContext } from '../context/AuthContext';
import SavePostBtn from "../components/SavePostBtn/SavePostBtn";
import LikePostBtn from "../components/LikePostBtn/LikePostBtn";
import CommentReplyList from "../components/Comment-Reply/CommentReplyList";
import '../index.css';
import { baseUrl } from "../baseUrl/baseUrl";


const PostDetails = () => {
	const { id } = useParams();
	const { data, isLoading, isError, error, refetch } = useGetPostByIdQuery(id);
	const [savedData, setSavedData] = useState(null);
	const [likeData, setLikeData] = useState(null);
	const [commentOpen, setCommentOpen] = useState(false);
	const { isLoggedIn, setIsLoggedIn, userId, setUserId } = useContext(AuthContext);

	useEffect(() => {
		if(data){
			const saved = data.total_saved.find(
				saved => saved.user_id == parseInt(userId)
			);
			setSavedData(saved || null);
			
			const userLike = data.total_likes.find(
				like => like.user_id === parseInt(userId)
			);
			setLikeData(userLike || null);
		}
	}, [data, userId]);

    if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	const productionBody = data.body.replaceAll('http://127.0.0.1:8000', baseUrl);

    

	return (
    <div>
		<main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* <!-- Hero Image --> */}
			<div className="w-full h-56 sm:h-80 md:h-96 overflow-hidden rounded-xl mb-6">
				<img src={data.post_image_url} alt="Post Image" className="w-full h-full object-cover" />
			</div>

			{/* <!-- Article Header --> */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
				<div className="flex items-center gap-3">
                    <Link to={`/profile/${data.user.id}`}>
                        <img
                            src={data.user.profile_picture}
                            alt="Author"
                            className="w-10 h-10 rounded-full"
                        />
                    </Link>
					<div>
						<Link to={`/profile/${data.user.id}`} className="text-lg font-semibold hover:underline">
                            <p className="font-semibold">{data.user.username}</p>
                        </Link>
						<p className="text-sm text-gray-500">Published on {new Date(data.created_at).toLocaleDateString()}</p>
					</div>
				</div>
				{/* <!-- save post --> */}
				{
					isLoggedIn && (
						<div className="flex items-center gap-4">
							<SavePostBtn post={data} savedData={savedData} userId={userId} postRefetch={refetch} fromDetailsPage={true} />
						</div>
					)
				}
			</div>

			{/* <!-- Post Content --> */}
			<h1 className="text-3xl sm:text-4xl font-bold mb-4">
				{data.title}
			</h1>
			{/* <article dangerouslySetInnerHTML={{ __html: data.body}} className="ckeditor-body text-gray-800 text-lg leading-7 space-y-6">
				
			</article> */}

			<article dangerouslySetInnerHTML={{ __html: data.productionBody}} className="ckeditor-body text-gray-800 text-lg leading-7 space-y-6">	
			</article>

			{/* <!-- Tags --> */}
			<div className="flex flex-wrap gap-2 mt-8">
                {data.categories.map(category =>(
                    <Categorybtn key={category.id} category={category} />
                ))}
			</div>

			{/* <!-- likes comment --> */}
			<div className="flex flex-wrap gap-4 mt-8">
				<LikePostBtn post={data}  likeData={likeData} userId={userId} postRefetch={refetch} fromDetailsPage={true} />
				<button onClick={()=> setCommentOpen(!commentOpen)} className="hover:bg-black hover:text-white font-bold px-3 py-1 rounded-full border cursor-pointer">
					💬 {data.total_comments} Comments
				</button>
			</div>

			{/* <!-- Comments Section sidebar modal --> */}
			{
				commentOpen && (
					<CommentReplyList postId={id} />
				)
			}
            
			{/* <!-- Related Posts --> */}
			<section className="mt-12">
				<h2 className="text-2xl font-bold mb-4">Related Posts</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{
                        data.related_posts.map((post) => (
                            <RelatedPostCard key={post.id} post={post} />
                        ))
                    }
				</div>
			</section>
		</main>
    </div>
	);
};

export default PostDetails;
