import React from "react";

const CommentReplyCard = ({id, user, body, children = [], postData, setPostData, setIsReply, isComment}) => {
	

	return (
		<>
			<img
				src={user.profile_picture}
				alt="Commenter"
				className="w-10 h-10 rounded-full"
			/>
			<div className="flex-1">
				<p className="font-semibold">{user.username}</p>
				<p className="text-sm text-gray-600">
					{body}
				</p>
				<button 
				onClick={() => {
					setIsReply(true);

					setPostData({
						...postData,
						parent: isComment ? null : id,
						comment: isComment ? id : null,
					});
				}}
				className="text-blue-500 text-sm mt-2 hover:underline cursor-pointer">
					Reply
				</button>

				{children && children.length > 0 && (
					<div className="mt-4 flex flex-col gap-4 border-l-2 border-gray-300">
						{
							children.map((child) => (
								<div key={child.id} className="ml-5  rounded-lg">
									<CommentReplyCard
										id={child.id}
										user={child.user}
										body={child.body}
										children={child.children}
										postData={postData}
										setPostData={setPostData}
										setIsReply={setIsReply}
										isComment={false}
									/>
								</div>
							))
						}
					</div>
				)}

			</div>

		</>
	);
};

export default CommentReplyCard;
