import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useEditUserMutation, useGetUserQuery } from "../features/User/userSlice";
import ProfilePostList from "../components/Profile/ProfilePostList";
import SavedPostList from "../components/Profile/SavedPostList";
import ReviewList from "../components/Profile/ReviewList";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import FullPageLoader from "../components/LoadingSpinner/FullPageLoader";
import SendMailModal from "../components/Profile/SendMailModal";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
	const { id } = useParams();
	const [openTab, setOpenTab] = useState(1);
	const [localFollowers, setLocalFollowers] = useState([]);
	const { data, isLoading, isError, error, refetch } = useGetUserQuery(id);
	const [mailModalOpen, setMailModalOpen] = useState(false);
	const { isLoggedIn, setIsLoggedIn, userId, setUserId } = useContext(AuthContext);
	const [updateUser, {isLoading:editLoading, isError:editIsError, isSuccess}] = useEditUserMutation();

	useEffect(() => {
		setOpenTab(1);
	}, [id]);

	useEffect(() => {
		if (data) {
			setLocalFollowers(data.followers);
		}
	}, [data]);


    if (isLoading) {
		return <FullPageLoader />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	const handleFollow = async (followerId) => {
		try {
			const isFollowing = localFollowers.includes(followerId);
			const updatedFollowers = isFollowing
				? localFollowers.filter((id) => id !== followerId)
				: [...localFollowers, followerId];

			setLocalFollowers(updatedFollowers);

			await updateUser({
				id: data.id,
				body: { followers: updatedFollowers },
			}).unwrap();

			// Optionally re-sync with backend
			refetch();
		} catch (err) {
			// console.error("Follow toggle failed:", err);
		}
	};


	return (
		<div>
			<main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div>
					<div className="flex flex-col items-center gap-2">
						<div className="relative">
							<img
								className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto"
								src={data.profile_picture}
								alt="User Profile Picture"
							/>
							{/* <!-- edit --> */}
							{
								isLoggedIn && userId == data.id && (
									<Link
										to={`/edit-profile/${data.id}`}		
										className="absolute top-0 right-1 bg-transparent backdrop-blur-xl border border-gray-300 rounded-full p-1.5 text-xs"
									>
										🖍️
									</Link>
								)
							}
						</div>
						<h1 className="text-2xl font-bold">{data.username}</h1>
						{
                            data.bio && (
                                <p className="text-lg">
                                    <strong>Bio:</strong> {data.bio}
                                </p>
                            )
                        }
					</div>

					{/* <!-- follow button --> */}
					{
						isLoggedIn && userId != data.id ? (
							<div className="flex justify-center items-center gap-4 mt-4">
								<button onClick={()=> isLoggedIn ? handleFollow(parseInt(userId)) : 
									(toast.warning("Please login first.", {
										position: "top-right",
									}))
								} className="border px-4 py-2 rounded-full bg-black text-white hover:bg-white hover:text-black cursor-pointer">
									{localFollowers.includes(parseInt(userId)) ? "Unfollow" : "Follow"}
								</button>
								<button onClick={()=> isLoggedIn ? setMailModalOpen(true) : 
									(toast.warning("Please login first.", {
										position: "top-right",
									}))
								} className="border px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
									Send Mail
								</button>
							</div>
						):null
					}

					<div className="w-full bg-gray-50 shadow-md rounded-lg p-6 mt-6">
						<h2 className="text-2xl font-semibold mb-4">
							User Information
						</h2>
						<div className="text-xl pl-4">
							<p>
								<strong>Name:</strong> {data.username}
							</p>
							<p>
								<strong>Email:</strong> {data.email}
							</p>
                            <p>
								<strong>Address:</strong> {data.address || "N/A"}
							</p>
							<p>
								<strong>Twitter:</strong> {data.twitter || "N/A"}
							</p>
                            <p>
								<strong>Facebook:</strong> {data.facebook || "N/A"}
							</p>
                            <p>
								<strong>Linkedin:</strong> {data.linkedin || "N/A"}
							</p>
							<p>
								<strong>Joined:</strong> {new Date(data.join_date).toLocaleDateString()}
							</p>
							<p>
								<strong>Followers:</strong> {data.followers.length}
							</p>
							<p>
								<strong>Following:</strong> {data.following.length}
							</p>
						</div>
					</div>

					<div className="w-full p-6 mt-6">
						<div className="flex flex-col md:flex-row gap-2 justify-between items-center md:h-10">
							<div className="flex gap-6">
								<button
									onClick={() => setOpenTab(1)}
									className={`text-lg font-bold cursor-pointer ${openTab === 1 ? "text-blue-600 underline underline-offset-4 " : ""}`}
								>
									Posts ({data.total_posts})
								</button>

								{
									isLoggedIn && userId == data.id && (
										<button
											onClick={() => setOpenTab(2)}
											className={`text-lg font-bold cursor-pointer ${openTab === 2 ? "text-blue-600 underline underline-offset-4 " : ""}`}
										>
											Saved posts ({data.total_saved_posts})
										</button>				
									)
								}
								<button
									onClick={() => setOpenTab(3)}
									className={`text-lg font-bold cursor-pointer ${openTab === 3 ? "text-blue-600 underline underline-offset-4 " : ""}`}
								>
									Reviews & ratings ({data.total_review_and_rating})
								</button>
							</div>
						</div>
					</div>
					
					{/* <!--userpost || savepost --> */}
					{
						openTab == 1 || openTab == 2 ? (
							<div className="flex flex-col items-center gap-5">
								<div className="w-full flex flex-col gap-5">
								{
									openTab === 1 ? (
										<ProfilePostList userId={data.id} />
									) : openTab === 2 ? (
										<SavedPostList userId={data.id} />
									) : ""
								}
								</div>
							</div>
						) : ""
					}
					

				{/* <!--profile rating section --> */}
				{
					openTab == 3 && (
						<div className="h-full">
							<ReviewList userId={data.id} profileDataRefetch={refetch} /> 
						</div>
					)
				}


				</div>
			</main>
			{/* <!-- Mail Modal --> */}
			{mailModalOpen && (
				<SendMailModal setMailModalOpen={setMailModalOpen} user_id={data.id} sender_id={userId} />
			)}
		</div>
	);
};

export default Profile;
