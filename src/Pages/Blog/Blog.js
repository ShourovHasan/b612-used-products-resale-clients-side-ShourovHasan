import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useTitle from '../../hooks/useTitle';
import Loading from '../SharedPages/Loading/Loading';
import AddBlog from './AddBlog';
import './Blog.css';
import { FaArrowRight } from "react-icons/fa";
import { useState } from 'react';

const Blog = () => {
    useTitle('Blog');
    const [blogModal, setBlogModal] = useState(null);
    
    const { data: blogs, isLoading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/blogs')
            const data = await res.json();
            return data;
        }
    })
    
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="flex flex-col items-center">
        <h2 className='mb-10 text-2xl font-bold text-center lg:text-5xl md:text-4xl text-primary divider'>Add Blog</h2>
        <AddBlog
            refetch={refetch}
        ></AddBlog>
        <h2 className='mb-10 text-2xl font-bold text-center lg:text-5xl md:text-4xl text-primary divider'>Our Blogs</h2>
        <main className="w-full">
            <section className="p-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {
                        blogs.map(blog => 
                            <div key={blog._id} className="border-2 neumorphism-card">
                                <div className="flex items-center justify-start p-4">
                                    <div className="text-gray-700">
                                        <p className="text-xl font-medium">{blog?.userName}</p>
                                        <p className="text-xs">{blog?.blogTime}</p>
                                    </div>
                                </div>
                                <div className="w-full h-48 bg-gray-300">
                                    <img src={blog?.blogPicture} alt="Post" className="object-cover w-full h-full" />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-medium">{blog?.blogTitle}</h3>
                                    <p className="mt-5 text-justify text-neutral">
                                        {
                                            (blog?.blogDescription).length > 150 ?
                                                <>{(blog?.blogDescription).slice(0, 150) + '... see more'}</>
                                                :
                                                <>{(blog?.blogDescription)}</>
                                        }
                                    </p>
                                </div>
                                <label onClick={() => setBlogModal(blog)} htmlFor="modal" className="flex justify-end mt-0 mb-3 mr-8">
                                    <p className='text-xl text-orange-500 zoom_content'>
                                        <FaArrowRight></FaArrowRight>
                                    </p>
                                </label>                                    
                            </div>
                        )
                    }
                </div>
            <input type="checkbox" id="modal" className="modal-toggle" />
            <div className="modal">
                <div className="relative modal-box">
                    <label htmlFor="modal" className="absolute text-2xl text-orange-600 btn btn-sm btn-circle right-2 top-2">✕</label>
                    <div className="w-full border-2 rounded-lg">
                        <div className="flex items-center justify-start p-4">
                            <div className="text-gray-700">
                                <p className="text-xl font-medium">{blogModal?.userName}</p>
                                <p className="text-xs">{blogModal?.blogTime}</p>
                            </div>
                        </div>
                        <div className="w-full h-48 bg-gray-300">
                            <img src={blogModal?.blogPicture} alt="Post" className="object-cover w-full h-full" />
                        </div>
                        <div className="p-2 pt-4">
                            <h3 className="text-xl font-medium">{blogModal?.blogTitle}</h3>
                            <p className="mt-5 text-justify text-neutral">
                                {blogModal?.blogDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>
    </div >        
    );
};

export default Blog;