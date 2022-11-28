import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../SharedPages/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import ProductsCard from '../ProductsCard/ProductsCard';

const CategoryProducts = () => {
    const category = useLoaderData()[0];
    const [booking, setBooking] = useState(null);

    useTitle('Products');

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products', category?._id],
        queryFn: async () => {
            const res = await fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/products/${category?._id}`)
            const data = await res.json();
            return data;
        }
    })
    // console.log(products);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section>
            <h2 className='mb-3 text-4xl font-bold text-center text-primary'>Second Hand {category.categoryName} Products</h2>
            <div className='grid grid-cols-1 gap-4 mx-2 mt-6 mb-20 lg:grid-cols-3 md:grid-cols-2 lg:gap-8 md:gap-6 lg:mx-4 md:mx-2'>
                {
                    products.map(product => <ProductsCard
                        key={product._id}
                        product={product}
                        setBooking={setBooking}
                    ></ProductsCard>)
                }
            </div>
            {
                booking &&
                <BookingModal
                    booking={booking}
                    setBooking={setBooking}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default CategoryProducts;