import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../SharedPages/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import ProductsCard from '../ProductsCard/ProductsCard';

const AdvertisedItems = () => {
    const [booking, setBooking] = useState(null);

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['advProducts'],
        queryFn: async () => {
            const res = await fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/advProducts`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            })
            const data = await res.json();
            return data;
        }
    })
    // console.log(products);
    if (isLoading) {
        return <Loading></Loading>
    }
    // console.log('products', products)
    return (
        <section className='my-12'>
            {
                products.length > 0 &&
                <>
                    <h2 className='mb-3 text-4xl font-bold text-center text-primary'>Advertised Products</h2>
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
                </>
            }
        </section>
    );
};

export default AdvertisedItems;