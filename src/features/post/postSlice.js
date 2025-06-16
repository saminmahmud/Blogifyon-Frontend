import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, prepareHeaders } from "../../baseUrl/baseUrl";


export const postSlice = createApi({
    reducerPath: 'post',
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseUrl,
        prepareHeaders: prepareHeaders
    }),

    tagTypes: ['posts', 'post', 'saved_posts', 'post_likes'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (pageUrl) => {
                return pageUrl ? pageUrl : '/post/';
            },
            providesTags: ['posts'],
            invalidatesTags: ['saved_posts', 'post_likes']
        }),

        getSearchPost: builder.query({
            query: ({ pageUrl, searchTerm }) => {
                return pageUrl ? pageUrl : `/post/?search=${searchTerm}`;
            },
            invalidatesTags: ['saved_posts', 'post_likes']
        }),

        getPostById: builder.query({
            query: (id) => `/post/${id}/`,
            providesTags: ['post'],
            invalidatesTags: ['saved_posts', 'post_likes']
        }),

        getTopPosts: builder.query({
            query: () => '/top-post/',
        }),

        getPostByUserId: builder.query({
            query: ({userId, pageUrl}) => {
                return pageUrl ? pageUrl : `/user-post/${userId}/`;
            },
            invalidatesTags: ['saved_posts', 'post_likes']
        }),

        getSavedPostsByUser: builder.query({
            query: ({userId, pageUrl}) => {
                return pageUrl ? pageUrl : `/saved-post/?search=${userId}`;
            },
            providesTags: ['saved_posts'],
            invalidatesTags: ['post_likes']
        }),

        createPost: builder.mutation({
            query: (newPost) => ({
                url: '/post/',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: ['posts', 'post'],
        }),

        createPostLike: builder.mutation({
            query: (data) => ({
                url: `/like/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['posts', 'post'],
        }),

        deletePostLike: builder.mutation({
            query: (data) => ({
                url: `/like/${data.id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['posts', 'post',],
        }),

        createSavedPost: builder.mutation({
            query: (data) => ({
                url: `/saved-post/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['posts', 'post', 'saved_posts'],
        }),

        deleteSavedPost: builder.mutation({
            query: (data) => ({
                url: `/saved-post/${data.id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['posts', 'post', 'saved_posts'],
        }),

        searchCommentReply: builder.query({
            query: (id) => ({
                url: `/comment/?search=${id}`,
            }),
            providesTags: ['comment_reply'],
        }),

        createComment: builder.mutation({
            query: (data) => ({
                url: `/comment/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['comment_reply', 'posts', 'post', 'saved_posts'],
        }),

        createCommentReply: builder.mutation({
            query: (data) => ({
                url: `/comment-reply/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['comment_reply', 'posts', 'post', 'saved_posts'],
        }),

    }),
})

export const { useGetPostsQuery, useGetSearchPostQuery, useGetPostByIdQuery, useGetTopPostsQuery, useGetPostByUserIdQuery, useGetSavedPostsByUserQuery, useCreatePostMutation, useCreatePostLikeMutation, useDeletePostLikeMutation, useCreateSavedPostMutation, useDeleteSavedPostMutation, useSearchCommentReplyQuery, useCreateCommentMutation, useCreateCommentReplyMutation } = postSlice;
