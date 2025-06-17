export const baseUrl = import.meta.env.VITE_API_URL;


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
		// return `ws://${import.meta.env.VITE_SOCKET_URL}/ws/notifications?token=${token}`;
		
    // For production (wss://)
    return `wss://${import.meta.env.VITE_SOCKET_URL}/ws/notifications?token=${token}`;
	}
	// console.error("No token found in localStorage");
	return null;
};
