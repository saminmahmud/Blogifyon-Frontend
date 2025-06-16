import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useGetUserQuery, useLogoutMutation } from "../../features/User/userSlice";
import { MdArrowDropDown } from "react-icons/md";
import NotificationList from "../Notification/NotificationList";
import ErrorPage from "../../pages/ErrorPage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import FullPageLoader from "../LoadingSpinner/FullPageLoader";
import { skipToken } from "@reduxjs/toolkit/query";
import { removeAuth } from '../../auth/auth';


const Navbar = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [previousPath, setPreviousPath] = useState(null);
    const { isLoggedIn, setIsLoggedIn, userId, setUserId } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useGetUserQuery(userId ?? skipToken);

    const [logout, { isLoading: isLogoutLoading, isError: isLogoutError, isSuccess:isLogoutSuccess }] = useLogoutMutation();

    useEffect(() => {
        if (searchText.trim() !== "") {
            if (!previousPath && location.pathname !== "/search") {
                setPreviousPath(location.pathname); 
            }
            navigate(`/search?q=${encodeURIComponent(searchText)}`);
        } else if (searchText.trim() === "" && previousPath) {
            setPreviousPath(null); 
            navigate(previousPath);
        }
    }, [searchText]);

    if (isLoading) {
		return <FullPageLoader />;
	}
	if (isError) {
		return <ErrorPage />;
	}

    const toggleSearch = () => {
        setIsSearchActive((prev) => !prev);
        setSearchText("");
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap(); 

            const isRemove = removeAuth();
            if (isRemove) {
                setIsLoggedIn(false);
                setUserId(null);
                setProfileDropdownOpen(false);
                navigate("/");
            } else {
                // console.error("Failed to remove authentication data");
            }
        } catch (err) {
            // console.error("Logout failed", err);
        }
    };

	return (
        <header className="border-b border-gray-300">
            <nav className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 px-4 py-3 md:px-8">
                {/* <!-- Left Side --> */}
                <div className="flex items-center gap-2 sm:gap-4 flex-grow">
                    <Link to="/">
                        <img
                            className="w-8 h-8 sm:w-10 sm:h-10"
                            src="../images/leaf.png"
                            alt="Logo"
                        />
                    </Link>
                    
                    {/* Mobile Search Toggle */}
                    {!isSearchActive ? (
                        <button
                            className="border rounded-full w-8 h-8 text-sm cursor-pointer sm:hidden"
                            onClick={toggleSearch}
                        >
                            🔍
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 flex-grow sm:hidden">
                            <input
                                className="flex-grow border h-10 rounded-lg px-3 w-full"
                                type="search"
                                placeholder="🔍 Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button
                                className="border rounded-full p-[0.5] cursor-pointer"
                                onClick={toggleSearch}
                            >
                                <RxCross2  className=" w-4 h-4 "/>
                            </button>
                        </div>
                    )}

                    {/* Desktop Search (Always visible on sm and up) */}
                    <input
                        className={`flex-grow border h-10 rounded-lg px-3 w-full md:w-auto hidden sm:block`}
                        type="search"
                        placeholder="🔍 Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                {/* <!-- Right Side --> */}
                {
                    isSearchActive == false &&(
                        <div>
                            <ul className="flex gap-2 sm:gap-3 text-sm font-medium items-center flex-wrap justify-end ">
                                {
                                    isLoggedIn ? (
                                       <>
                                            <li>
                                                <Link to="/add-post" className="px-2 py-1 sm:px-3 sm:py-2">
                                                    📝 Write
                                                </Link>
                                            </li>
                                            <li>
                                               <NotificationList notificationDropdownOpen={notificationDropdownOpen} setNotificationDropdownOpen={setNotificationDropdownOpen} userId={userId} isLoggedIn={isLoggedIn} />
                                            </li>
                                            <li>
                                                <div>
                                                    <div className="relative cursor-pointer" onClick={() => setProfileDropdownOpen(prev => !prev)}>
                                                        <img
                                                            className="w-7 h-7 rounded-full mx-auto"
                                                            src={data.profile_picture}
                                                            alt="User Profile Picture"
                                                        />
                                                        <MdArrowDropDown className={`absolute text-lg left-5 top-4 ${ profileDropdownOpen ? "rotate-180 transition-all duration-75" : "" }`}/>
                                                    </div>

                                                    {profileDropdownOpen && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                                            <ul className="py-2">
                                                                <li>
                                                                    <Link
                                                                        to={`/profile/${userId}`}
                                                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                                    >
                                                                        Profile
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        onClick={() => {
                                                                            handleLogout();
                                                                        }}
                                                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                                                    >
                                                                        Logout
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                       </>
                                    ):(
                                        <>
                                            <li>
                                                <Link
                                                    to="register"
                                                    className="border px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-black text-white hover:bg-white hover:text-black"
                                                >
                                                    Register
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/login"
                                                    className="border px-2 py-1 sm:px-3 sm:py-2 rounded-full hover:bg-black hover:text-white"
                                                >
                                                    Login
                                                </Link>
                                            </li>
                                        </>
                                    )
                                }
                                
                            </ul>
                        </div>
                    )
                }
            </nav>
        </header>
	);
};

export default Navbar;
