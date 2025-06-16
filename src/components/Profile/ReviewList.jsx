import React, { useContext, useState } from "react";
import { useCreateUserReviewandRatingMutation, useGetReviewAndRatingsQuery } from "../../features/User/userSlice";
import ReviewCard from "./ReviewCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import { AuthContext } from "../../context/AuthContext";

const ReviewList = ({ userId, profileDataRefetch }) => {
	const [ratingCount, setRatingCount] = useState(1);
	const [formError, setFormError] = useState("");
	const [reviewText, setReviewText] = useState("");
	const { data, isLoading, isError, error, refetch } = useGetReviewAndRatingsQuery(userId);
	const [createReviewandRating] = useCreateUserReviewandRatingMutation();
    const { isLoggedIn, setIsLoggedIn, userId:reviewer_id, setUserId } = useContext(AuthContext);


    if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const reviewText = e.target.review.value;

		if (!reviewText) {
			setFormError("Please write a review.");
			return;
		}
		
		try {
			await createReviewandRating({
				user_id: parseInt(userId),
				reviewer_id: parseInt(reviewer_id),
				rating: "⭐".repeat(ratingCount),
				body: reviewText,
			}).unwrap();
			setFormError("");
			setReviewText("");
			setRatingCount(1);

			profileDataRefetch();
			refetch();
		} catch (error) {
			// console.error("Error submitting review:", error);
		}
	}

    
	return (
		<>
			<div className="flex flex-col gap-4 max-h-92 max-w-full overflow-x-auto overflow-y-auto">
				{data.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
			</div>

			{/* Form  */}
			{
				isLoggedIn && userId != reviewer_id && (
					<div className="mt-4">
						<form onSubmit={handleSubmit} >
							<div className="flex items-center gap-2 mb-2">
								<label htmlFor="rating" className="text-lg font-semibold">
									Rate this user:
								</label>
								<div className="flex gap-1 ">
									{
										[1,2,3,4,5].map((rating) => (
											<button
												type="button"
												key={rating}
												onClick={() => {
													setRatingCount(rating);
												}}
												className={`text-2xl cursor-pointer ${ rating <= ratingCount ? 'text-yellow-500' : "" } `}
											>
												★
											</button>
										))
									}
								</div>
								<span
									id="rating-value"
									className="text-gray-600 text-sm"
								>
									({ratingCount}/5)
								</span>
							</div>
							<textarea
								name="review"
								value={reviewText}
								onChange={(e) => setReviewText(e.target.value)}
								required
								className="w-full h-24 p-2 border rounded-lg"
								placeholder="Write here..."
							></textarea>
							{formError && (
								<p className="text-red-500 text-sm mt-2">{formError}</p>
							)}
							<button type="submit" className=" px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">
								Submit
							</button>
						</form>
					</div>
				)
			}
		</>
	);
};

export default ReviewList;
