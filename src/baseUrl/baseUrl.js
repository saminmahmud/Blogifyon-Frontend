// For local development
// export const baseUrl = "http://127.0.0.1:8000/";

// For production
export const baseUrl = "https://blogifyon-backend-fghv.onrender.com";


export const prepareHeaders = (headers) => {
	const token = localStorage.getItem("token");
	if (token) {
		return headers.set("Authorization", `Token ${token}`);
	}

	return headers;
};


export const SOCKET_URL = () => {
	const token = localStorage.getItem("token");

	if (token) {
    // For local development (ws://)
		// return `ws://127.0.0.1:8000/ws/notifications?token=${token}`;
		
    // For production (wss://)
    return `wss://blogifyon-backend-fghv.onrender.com/ws/notifications?token=${token}`;
	}
	// console.error("No token found in localStorage");
	return null;
};
