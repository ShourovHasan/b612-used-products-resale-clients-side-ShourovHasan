import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../SharedPages/Loading/Loading';
import { FaAngleDoubleRight } from "react-icons/fa";

const CategoryWiseProducts = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/categories')
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='my-12'>
            <h2 className='mb-3 text-lg font-bold text-center lg:text-4xl md:text-xl text-primary'>Second Hand Products Categories</h2>
            <div className='flex justify-center gap-2 navbar'>
                <ul className="p-0 menu menu-horizontal">
                    {
                        categories.map(category =>
                            <li
                                // onClick={() => handleProducts(category)}
                                key={category._id}
                                className='mx-1 mb-3 border-2 rounded-lg'
                            >
                                <Link to={`/category/${category._id}`} className='h-10 p-0 m-0 '>
                                    <img src={category.categoryPicture} className='w-10 h-10' alt="" />
                                    <p className='mr-3 text-xl font-bold'><span className='flex items-center'>{category.categoryName} <FaAngleDoubleRight className='ml-2'></FaAngleDoubleRight></span></p>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>

        </div>
    );
};

export default CategoryWiseProducts;