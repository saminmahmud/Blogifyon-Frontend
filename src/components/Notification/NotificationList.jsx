import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useGetUserNotificationsQuery } from "../../features/User/userSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import { baseUrl, SOCKET_URL } from "../../baseUrl/baseUrl";
import { Link } from "react-router";

const WEBSOCKET_URL = SOCKET_URL();

const NotificationList = ({ notificationDropdownOpen, setNotificationDropdownOpen, userId, isLoggedIn }) => {
    const [not_read_notification, setNotReadNotification] = useState(0);
    const { data:notifications, isLoading, isError, error, refetch } = useGetUserNotificationsQuery(userId);
	const [socket, setSocket] = useState(null);
	const [localNotifications, setLocalNotifications] = useState(
        notifications || []
    );
	
	useEffect(() => {
        if (isLoggedIn) {
            const socket = new WebSocket(WEBSOCKET_URL);
            // console.log("Connecting to WebSocket:", socket);

            socket.onopen = () => {
                // console.log("WebSocket connected");
                setLocalNotifications(notifications);
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                // console.log("Received notification:", data);

                if (data && data.notification) {
                    const newNotification = data.notification;

                    if (newNotification && newNotification.message) {
                        // console.log("New Notification", newNotification);

                        setLocalNotifications((prevNotifications) => {
                            const updated = [newNotification, ...prevNotifications];
                            const notRead = updated.filter(n => !n.is_read).length;
                            setNotReadNotification(notRead);
                            return updated;
                        });
                    } else {
                        // console.error("Received invalid notification:", data);
                    }
                } else {
                    // console.error("Invalid WebSocket message received:", data);
                }
            };

            socket.onclose = (event) => {
                // console.log("WebSocket disconnected");
                if (event.code !== 1000) { 
                    // console.log("Reconnecting to WebSocket...");
                    setTimeout(() => {
                        setSocket(new WebSocket(WEBSOCKET_URL));
                    }, 1000); 
                }
            };

            setSocket(socket);

            return () => {
                socket.close();
            };
        }
    }, [isLoggedIn]);


    useEffect(() => {
        if (notificationDropdownOpen) {
            markUnreadAsRead();
        }
    }, [notificationDropdownOpen]);

    
    useEffect(() => {
        if (notifications && Array.isArray(notifications)) {
        setLocalNotifications(notifications);
        const unread = notifications.filter((n) => !n.is_read).length;
        setNotReadNotification(unread);
        }
    }, [notifications]);


    if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ErrorPage />;
	}


    const markUnreadAsRead = async () => {
        const unread = localNotifications.filter((n) => !n.is_read);

        if (unread.length === 0) return;

        try {
            await Promise.all(
                unread.map((notification) =>
                    fetch(`${baseUrl}/notification/${notification.id}/`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Token ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...notification,
                            is_read: true,
                        }),
                    })
                )
            );

            // After marking all as read, fetch fresh notifications
            const updated = await refetch();
            if (updated?.data) {
                setLocalNotifications(updated.data);
                const unreadCount = updated.data.filter(n => !n.is_read).length;
                setNotReadNotification(unreadCount);
            }
        } catch (err) {
            // console.error("Error marking notifications as read:", err);
        }
    };


    const handleToggleDropdown = async () => {
        if (!notificationDropdownOpen) {
            // Only refetch if opening modal
            await refetch();

            // Update unread count and local notifications
            const updatedNotifications = await refetch();
            if (updatedNotifications?.data) {
                setLocalNotifications(updatedNotifications.data);
                const unread = updatedNotifications.data.filter((n) => !n.is_read).length;
                setNotReadNotification(unread);
            }

            // Now mark notifications as read
            await markUnreadAsRead();
        }

        setNotificationDropdownOpen(prev => !prev);
    };

    
    return (
		<div>
			<div
				className="relative cursor-pointer"
				onClick={handleToggleDropdown}
			>
				<IoMdNotificationsOutline
					className={`text-2xl font-bold cursor-pointer ${
						notificationDropdownOpen ? "text-orange-500" : ""
					}`}
				/>
                {not_read_notification > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[13px] min-w-[16px] h-[16px] px-[4px] rounded-full flex items-center justify-center">
                        {not_read_notification}
                    </span>
                )}
			</div>

			
			{notificationDropdownOpen && (
				<div className="absolute right-0 mt-2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[25%] h-[40%] overflow-y-scroll bg-white border border-gray-300 rounded-lg shadow-lg z-50">
					<h1 className="text-center text-lg underline">
						Notifications
					</h1>

                    <ul className="pt-2 flex flex-col gap-2">
                        {localNotifications.filter(n => n.id).map((notification) => (
                            <li
                                key={notification.id}
                                className="px-4 py-2 text-sm bg-gray-100"
                            >
                                {/* <Link
                                    to={
                                        notification.post
                                            ? `/post/${notification.post}`
                                            : `/profile/${notification.user}`
                                    }
                                > */}
                                    <p>{notification.message}</p>
                                    <small className="flex justify-end">
                                        {new Date(notification.created_at).toLocaleDateString()}
                                    </small>
                                {/* </Link> */}
                            </li>
                        ))}
                    </ul>

				</div>
			)}
		</div>
	);
};

export default NotificationList;
