import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, prepareHeaders } from "../../baseUrl/baseUrl";


export const userSlice = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseUrl,
        prepareHeaders: prepareHeaders
    }),

    tagTypes: ['users', 'user', 'reviews'],
    endpoints: (builder) => ({  
        getUser: builder.query({
            query: (id) => `/user/${id}/`,
            providesTags: ['user']
        }),

        editUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/user/${id}/`,
                method: 'PATCH',
                body,
                formData: true,
            }),
            invalidatesTags: ['user'],
        }),

        getSearchUser: builder.query({
            query: (searchTerm) => `/user/?search=${searchTerm}`,
        }),

        getReviewAndRatings: builder.query({
            query: (id) =>  `/user/review/?search=${id}`,
            providesTags: ['reviews']
        }),

        register: builder.mutation({
            query: (userData) => ({
                url: "/user/register/",
                method: "POST",
                body: userData,
            }),
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: "/user/login/",
                method: "POST",
                body: credentials,
            }),
        }),
        
        logout: builder.mutation({
            query: () => ({
                url: "/user/logout/",
                method: "POST",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`, 
                },
            }),
        }),

        getUserNotifications: builder.query({
            query: (id) => `/notification/?search=${id}`,
        }),

        getUserReview: builder.query({
            query: (id) => `/user/review/?search=${id}`,
            providesTags: ['reviews']
        }), 

        createUserReviewandRating: builder.mutation({
            query: (reviewData) => ({
                url: "/user/review/",
                method: "POST",
                body: reviewData,
            }),
            invalidatesTags: ['reviews'],
        }),

        sendMail: builder.mutation({
            query: (mailData) => ({
                url: "/send_email/",
                method: "POST",
                body: mailData,
            }),
        }),
        
    }),
})

export const { useGetUserQuery, useEditUserMutation, useGetSearchUserQuery, useGetReviewAndRatingsQuery, useRegisterMutation, useLoginMutation, useLogoutMutation, useGetUserNotificationsQuery, useCreateUserReviewandRatingMutation, useSendMailMutation } = userSlice;

