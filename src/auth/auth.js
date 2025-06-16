export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    return token && user_id ? true : false;
};


export const removeAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    return token && user_id ?  false: true; 
}


export const setAuth = (token, user_id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user_id);

    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user_id");
    return storedToken && storedUserId ? true : false;
}


export const getAuthUser = () => {
    const user_id = localStorage.getItem("user_id");
    return user_id ? user_id : null;
}
