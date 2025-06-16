import React, { useContext, useState } from "react";
import { useCreateCommentMutation, useCreateCommentReplyMutation, useSearchCommentReplyQuery } from "../../features/post/postSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import CommentReplyCard from "./CommentReplyCard";
import { AuthContext } from '../../context/AuthContext';

const CommentReplyList = ({ postId }) => {
	const { data, isLoading, isError, error, refetch } = useSearchCommentReplyQuery(postId);
	const { isLoggedIn, setIsLoggedIn, userId, setUserId } = useContext(AuthContext);
	const [postData, setPostData] = useState({
		user_id:parseInt(userId),
		post:parseInt(postId),
		body: "",
		comment: null,
		parent: null,
	});
	const [createComment, { isLoading: isCommentCreating, error: isCommentError }] = useCreateCommentMutation();
	const [createCommentReply, { isLoading: isCommentReplyCreating, error: isCommentReplyError }] = useCreateCommentReplyMutation();

	const [isReply, setIsReply] = useState(false);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	const handleSubmit = async(e) => {
		e.preventDefault();

		// comment 
		if(postData.comment === null && postData.parent === null) {
			// console.log("Comment submitted:", postData);
			await createComment({post: postData.post, body: postData.body, user_id: postData.user_id}).unwrap();
			// console.log(isCommentError);
		}

		// reply to comment
		else if(postData.comment !== null && postData.parent === null) {
			// console.log("reply submitted:", postData);
			await createCommentReply({
				post: postData.post,
				body: postData.body,
				user_id: postData.user_id,
				comment: postData.comment,
			});
		}

		// reply to relply
		else if(postData.comment === null && postData.parent !== null) {
			// console.log("reply to reply submitted:", postData);
			await createCommentReply({
				post: postData.post,
				body: postData.body,
				user_id: postData.user_id,
				parent: postData.parent,
			});
		}


		setPostData({
			user_id: parseInt(userId),
			post: parseInt(postId),
			body: "",
			comment: null,
			parent: null,
		});

		setIsReply(false);
	}

	return (
		<div className="mt-12 h-full">
			<h2 className="text-2xl font-bold mb-4">Comments</h2>

			<div className="flex flex-col gap-4 max-h-92 max-w-full overflow-x-auto overflow-y-auto">
				{data.map((comment) => (
					<div key={comment.id}  className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
						<div className="flex items-start gap-4">
							{/* <!-- Comment --> */}
							<CommentReplyCard
								id={comment.id}
								user={comment.user}
								body={comment.body}
								children={comment.replies}
								postData={postData}
								setPostData={setPostData}
								setIsReply={setIsReply}
								isComment={true}
							/>
						</div>
					</div>
				))}
			</div>

			{/* <!-- Add New Comment --> */}
			{ isLoggedIn && (
				<form onSubmit={handleSubmit} className="mt-4.5">
					<div className="relative">
						<textarea
							className="w-full h-24 p-2 border rounded-lg"
							placeholder="Leave a comment..."
							required={true}
							value={postData.body}
							onChange={(e) => setPostData({ ...postData, body: e.target.value })}
						></textarea>
						{
							isReply && (
								<div className="absolute top-0 left-0 flex items-center gap-2">
									<span className="absolute -top-4 left-2 bg-green-500 font-semibold  px-1 rounded-lg">
										reply
									</span>
									<span onClick={()=> setIsReply(!isReply)} className="absolute -top-6 left-12 text-red-500 font-bold  cursor-pointer">
										x
									</span>
								</div>
							)
						}
					</div>
					<button type="submit" className=" px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">
						Submit
					</button>
				</form>
			)}
		</div>
	);
};

export default CommentReplyList;
