import React from 'react'
import PostList from '../components/Post/PostList'
import CategoryList from '../components/category/CategoryList'
import TopPostList from '../components/Post/TopPostList'


const Home = () => {
    return (
    <div>
        <main className="w-full mx-auto mt-5 flex flex-col md:flex-row md:justify-between gap-5 px-4 sm:px-6 lg:px-8 xl:px-10 py-4">
            <div className="w-full md:w-[70%] flex flex-col gap-5">
                {/* All Posts  */}
                <PostList />
            </div>

            <div className="w-full md:w-[30%] flex flex-col gap-5">
                <div>
                    <h1 className="text-2xl font-bold ">Categories</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <CategoryList />
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl font-bold ">Top Posts</h1>
                    <div className="flex flex-col gap-3 mt-2">
                        {/* Top Post Card */}
                        <TopPostList />
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Home
