import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../SharedPages/Loading/Loading';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(imageHostKey);
    const date = format(new Date(), "PPpp");
    // console.log(date);

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories')
            const data = await res.json();
            return data;
        }
    })

    const handleAddProduct = (data, event) => {
        const form = event.target;
        const image = data.productPicture[0];
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
                    const product = {
                        sellerName: user.displayName,
                        sellerEmail: user.email,
                        publishedTime: date,
                        productName: data.productName,
                        productCondition: data.productCondition,
                        sellerLocation: data.sellerLocation,
                        sellerPhoneNumber: data.sellerPhoneNumber,
                        useOfYears: data.useOfYears,
                        purchaseYear: data.purchaseYear,
                        originalPrice: data.originalPrice,
                        resalePrice: data.resalePrice,
                        categoryId: form.categoryId.value,
                        productDescription: data.productDescription,
                        productPicture: imgData.data.url,
                        
                    }
                    console.log(product);
                    // Save product information to the database
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.productName} is added successfully`);
                            navigate('/dashboard/myProducts')
                        })
                }
                // console.log(imgData);
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='px-5 rounded-lg shadow-lg shadow-neutral py-7 w-[385px] mx-auto my-5 lg:w-[800px]'>
            <h2 className='text-4xl text-center text-primary'>Add A Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)} className=''>
                {/* <Header /> */}
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4'>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input {...register("productName", {
                            required: "product name is required"
                        })} type="text" placeholder="enter your product name" className="w-full input input-bordered" />
                        {errors.productName && <p className='ml-4 text-red-500'>{errors.productName.message}</p>}
                    </div>
                    <div className="w-full mt-2 form-control">
                        <label className="label">
                            <span className="label-text">Seller Location</span>
                        </label>
                        <select {...register("sellerLocation", {
                            required: "seller location is required"
                        })} className="w-full select input-bordered">

                            <option className='py-2 text-3xl' defaultValue='Dhaka'>Dhaka</option>
                            <option className='py-2 text-3xl' defaultValue='Chittagong'>Chittagong</option>
                        </select>
                        {errors.sellerLocation && <p className='ml-4 text-red-500'>{errors.sellerLocation.message}</p>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Seller Phone Number</span>
                        </label>
                        <input {...register("sellerPhoneNumber", {
                            required: "seller phone number is required"
                        })} type="text" placeholder="enter your seller phone number" className="w-full input input-bordered" />
                        {errors.sellerPhoneNumber && <p className='ml-4 text-red-500'>{errors.sellerPhoneNumber.message}</p>}
                    </div>
                    <div className="w-full mt-2 form-control">
                        <label className="label">
                            <span className="label-text">Product Condition</span>
                        </label>
                        <select {...register("productCondition", {
                            required: "product condition is required"
                        })} className="w-full select input-bordered">
                            <option selected className='py-2 text-3xl' defaultValue='Excellent'>Excellent</option>
                            <option className='py-2 text-3xl' defaultValue='Good'>Good</option>
                            <option className='py-2 text-3xl' defaultValue='Fair'>Fair</option>
                        </select>
                        {errors.productCondition && <p className='ml-4 text-red-500'>{errors.productCondition.message}</p>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Use of Years</span>
                        </label>
                        <input {...register("useOfYears", {
                            required: "use of years is required"
                        })} type="number" placeholder="enter use of years" className="w-full input input-bordered" />
                        {errors.useOfYears && <p className='ml-4 text-red-500'>{errors.useOfYears.message}</p>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Purchase Year</span>
                        </label>
                        <input {...register("purchaseYear", {
                            required: "purchase year is required"
                        })} type="number" placeholder="enter purchase year" className="w-full input input-bordered" />
                        {errors.purchaseYear && <p className='ml-4 text-red-500'>{errors.purchaseYear.message}</p>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Original Price</span>
                        </label>
                        <input {...register("originalPrice", {
                            required: "original price is required"
                        })} type="number" placeholder="enter original price" className="w-full input input-bordered" />
                        {errors.originalPrice && <p className='ml-4 text-red-500'>{errors.originalPrice.message}</p>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Resale Price</span>
                        </label>
                        <input {...register("resalePrice", {
                            required: "resale price is required"
                        })} type="number" placeholder="enter resale price" className="w-full input input-bordered" />
                        {errors.resalePrice && <p className='ml-4 text-red-500'>{errors.resalePrice.message}</p>}
                    </div>
                    <div className="w-full mt-2 form-control">
                        <label className="label">
                            <span className="label-text">Product Category</span>
                        </label>
                        <select name='categoryId' className="w-full select input-bordered">
                            {
                                categories.map((category) => <option
                                    key={category._id}
                                    value={category._id}
                                    className='py-2 text-3xl'
                                >{category.categoryName}</option>)
                            }
                        </select>
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Product Picture</span>
                        </label>
                        <input {...register("productPicture", {
                            required: "product picture is required"
                        })} type="file" placeholder="Upload Your product picture" className="w-full file-input file-input-bordered" />
                        {errors.productPicture && <p className='ml-4 text-red-500'>{errors.productPicture.message}</p>}
                    </div>                    
                </div>
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">Product Description</span>
                    </label>
                    <textarea  {...register("productDescription", {
                        required: "product description is required"
                    })} type="text" placeholder="product description" className="w-full h-20 input input-bordered" />
                    {errors.productDescription && <p role="alert" className='ml-4 text-red-600'>{errors.productDescription?.message}</p>}
                </div>
                <input type="submit" className='w-full pb-0 mt-5 mb-0 btn bg-gradient-to-r from-secondary to-primary text-white' value='Add Product' />
            </form>
        </div>
    );
};

export default AddProduct;