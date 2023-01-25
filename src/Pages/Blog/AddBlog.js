import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Lottie from "lottie-react";
import postImg from '../../asssets/blog-post.json';

const AddBlog = ({refetch}) => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    let navigate = useNavigate();
    const date = format(new Date(), "PPpp");
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    

    const handleBlog = data => {
        if (!user?.email) {
            toast.error("Please login first to add blog");
            return navigate('/login');
        }
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const blog = {
                        userName: user?.displayName,
                        userEmail: user?.email,
                        blogTime: date,
                        blogDescription: data.blog,
                        blogTitle: data.title,
                        blogPicture: imgData?.data?.url,
                    }
                    // console.log(blog);
                    fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/blog', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(blog)
                    })
                        .then(res => res.json())
                        .then(result => {
                            // console.log(result);
                            reset();
                            refetch();
                            toast.success(`Blog is added successfully`);
                            // navigate('/dashboard')
                        })
                }
            })
    }

    return (
        <div className='mb-3'>
            <div className="mx-auto hero ">
                <div className="flex-col gap-20 mx-auto hero-content lg:flex-row md:flex-row">
                    <div className="w-11/12 text-center lg:w-1/3 lg:text-left md:w-1/3">
                        <Lottie loop={true} animationData={postImg} />
                    </div>
                    <div className="px-5 rounded-lg  shadow-neutral neumorphism_Banner_Card py-7 lg:w-[385px] md:w-[315px] w-full">
                        <form onSubmit={handleSubmit(handleBlog)} className=''>
                            {/* <Header /> */}
                            <div className="w-full mb-2 form-control">
                                <input {...register("title", {
                                    required: "blog title is required"
                                })} type="text" placeholder="write the blog title" className="w-full input input-bordered border-primary"></input>
                                {errors.title && <p role="alert" className='ml-4 text-red-500'>{errors.title?.message}</p>}
                            </div>
                            <div className="w-full form-control">
                                <textarea {...register("blog", {
                                    required: "blog content is required"
                                })} type="text" placeholder="write your valuable blog here" className="w-full textarea textarea-bordered border-primary"></textarea>
                                {errors.blog && <p role="alert" className='ml-4 text-red-500'>{errors.blog?.message}</p>}
                            </div>
                            <div className="w-full mt-2 form-control">
                                <input  {...register("img", {
                                    required: "Photo is required"
                                })} type="file" placeholder="Upload Your Photo" className="w-full file-input file-input-bordered" />
                                {errors.img && <p role="alert" className='ml-4 text-red-600'>{errors.img?.message}</p>}
                            </div>
                            <input type="submit" className='w-full pb-0 mt-5 mb-0 text-white btn bg-gradient-to-r from-secondary to-primary' value='Feedback' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;