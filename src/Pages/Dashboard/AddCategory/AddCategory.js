import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddCategory = () => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey);
    const navigate = useNavigate();

    const handleAddCategory = data => {
        const image = data.categoryPicture[0];
        // console.log(image);
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
                    console.log(imgData.data.url);
                    const category = {                        
                        categoryName: data.categoryName,
                        categoryDescription: data.categoryDescription,
                        categoryPicture: imgData.data.url,
                        userName: user.displayName,
                        userEmail: user.email,
                    }
                    // Save doctor information to the database
                    fetch('http://localhost:5000/categories', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(category)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            if (result.message) {
                                return toast.error(result.message);
                            }
                            toast.success(`${data.categoryName} is added successfully`);
                            navigate('/')
                        })
                }
                // console.log(imgData);
            })
    }
    return (
        <div className='px-5 rounded-lg shadow-lg py-7 w-[385px] mx-auto my-5 shadow-neutral'>
            <h2 className='mb-3 text-4xl text-center text-primary'>Add A Category</h2>
            <form onSubmit={handleSubmit(handleAddCategory)} className=''>
                {/* <Header /> */}
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Category Name</span>
                    </label>
                    <input {...register("categoryName", {
                        required: "category name is required"
                    })} type="text" placeholder="enter category name" className="w-full input input-bordered" />
                    {errors.categoryName && <p className='ml-4 text-red-500'>{errors.categoryName.message}</p>}
                </div>
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Category Description</span>
                    </label>
                    <textarea  {...register("categoryDescription", {
                        required: "category description is required"
                    })} type="text" placeholder="category Description" className="w-full h-20 input input-bordered" />
                    {errors.categoryDescription && <p role="alert" className='ml-4 text-red-600'>{errors.categoryDescription?.message}</p>}
                </div>
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Category Picture</span>
                    </label>
                    <input {...register("categoryPicture", {
                        required: "category picture is required"
                    })} type="file" placeholder="Upload Category Picture" className="w-full file-input file-input-bordered" />
                    {errors.categoryPicture && <p className='ml-4 text-red-500'>{errors.categoryPicture.message}</p>}
                </div>
                <input type="submit" className='w-full pb-0 mt-5 mb-0 btn bg-gradient-to-r from-secondary to-primary text-white' value='Add Category' />
            </form>
        </div>
    );
};

export default AddCategory;