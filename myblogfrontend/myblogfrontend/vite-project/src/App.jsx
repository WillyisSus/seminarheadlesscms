// src/App.js

import React, { useEffect } from 'react';
import { useState } from 'react';
import axios, { Axios } from 'axios';
// A separate component for the blog card
function BlogCard(blog) {
  const [blogImg, setBlogImg] = useState("")
  const getBlogImage = (blog) => {
    if (blog.blog.gallery_images && blog.blog.gallery_images.length > 0){
        const apiSource = `http://localhost:8000${blog.blog.gallery_images[0].image.meta.download_url}`
        console.log(apiSource)
        return apiSource
    }
    return "";
  }
  useEffect(()=> {
    const newImg = getBlogImage(blog);
    setBlogImg(newImg)
  })
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Blog Image */}
      <img 
        className="w-full h-48 object-cover" 
        src={blogImg.length>0?blogImg:
          "https://picsum.photos/seed/react/600/400" }
        alt="A random blog post" 
      />
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{blog.blog.title?blog.blog.title:"Title"}</h3>
        <p className="text-gray-400 text-base">
          {blog.blog.intro?blog.blog.intro: "This is a blog intro"}
        </p>
      </div>
    </div>
  );
}

// The main App component
export default function App() {
  const [blogs, setBlogs] = useState([]);
  const getBlogs =  async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/v2/pages/?type=blog.BlogPage&fields=*,authors(name)")
      const data = res.data?.items
      console.log(data)
      setBlogs(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto">
        
        {/* === Get Blogs Button === */}
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 mb-8 focus:outline-none focus:ring-4 focus:ring-blue-400"
          onClick={getBlogs}
        >
          Get Blogs
        </button>

        {/* === Sample Blog Card === */}
        <div className='w-full grid grid-cols-2'>
          {
            (blogs.length > 0)?(
              <>
                {blogs.map((blog, index) => ( <BlogCard blog={blog} key={index}></BlogCard>)
)}
              </>
            )
            : <div>CLick <span className='font-bold'>Get blog</span> to get new blogs</div>  
          }
        </div>

      </div>
    </div>
  );
}