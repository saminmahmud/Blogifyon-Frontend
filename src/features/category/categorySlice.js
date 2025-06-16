import { baseUrl, prepareHeaders } from "../../baseUrl/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categorySlice = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: prepareHeaders
    }),
    
    tagTypes: ['categories', 'category'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/category/',
            providesTags: ['categories'],
        }),
        getCategoryById: builder.query({
            query: (id) => `/category/${id}/`,
            providesTags: ['category'],
        }),
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/category/',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ['categories', 'category'],
        }),
    }),

})

export const { useGetCategoriesQuery, useGetCategoryByIdQuery, useCreateCategoryMutation } = categorySlice;