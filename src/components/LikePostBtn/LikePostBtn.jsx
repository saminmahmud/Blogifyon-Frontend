import React, {useContext} from "react";
import { AiFillLike } from "react-icons/ai";
import { useCreatePostLikeMutation, useDeletePostLikeMutation } from "../../features/post/postSlice";
import { toast } from "react-toastify";
import { AuthContext } from '../../context/AuthContext';

const LikePostBtn = ({post, likeData, userId, postRefetch, fromDetailsPage=false}) => {
    const { isLoggedIn } = useContext(AuthContext);
    const [createPostLike] = useCreatePostLikeMutation();
    const [deletePostLike] = useDeletePostLikeMutation();

    const handleLike = async () => {
        if (!isLoggedIn) {
            toast.warning("Please login first.", {
                position: "top-right",
            });
            return;
        }

        try {
            if(likeData){
                await deletePostLike({ id: likeData.id }).unwrap();
            }else{
                await createPostLike({ post: post.id, user: userId }).unwrap();
            }
            postRefetch();
        } catch (error) {
            // console.error('Error liking post:', error);
        }
    }

    return fromDetailsPage ?(
        <button onClick={()=> handleLike()} className={`${likeData ? 'bg-blue-500 text-white' : ''} flex justify-center items-center font-bold px-3 py-1 rounded-full border cursor-pointer`}>
            <AiFillLike className={`text-lg`} /> <p>{post.total_likes.length} Likes</p>
        </button>
    )
    : (
		<button onClick={()=> handleLike()} className="flex justify-center items-center text-lg  cursor-pointer">
			<span className="font-bold">
				<AiFillLike className={`text-lg ${likeData ? 'text-blue-500' : ''}`} />
			</span>{" "}
			{post.total_likes.length}
		</button>
	);
};

export default LikePostBtn;
