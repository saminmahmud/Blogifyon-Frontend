import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "../features/post/postSlice";
import { categorySlice } from "../features/category/categorySlice";
import { userSlice } from "../features/User/userSlice";

export const store = configureStore({
    reducer: {
        [postSlice.reducerPath]: postSlice.reducer,
        [categorySlice.reducerPath]: categorySlice.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(postSlice.middleware)
            .concat(categorySlice.middleware)
            .concat(userSlice.middleware)
})