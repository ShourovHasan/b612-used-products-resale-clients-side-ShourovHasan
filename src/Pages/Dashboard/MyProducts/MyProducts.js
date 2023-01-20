import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import DeleteConfirmationModal from '../../SharedPages/DeleteConfirmationModal/DeleteConfirmationModal';
import Loading from '../../SharedPages/Loading/Loading';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const closeModal = () => {
        setDeleteProduct(null);
    }
    useTitle('My Products');

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/products?sellerEmail=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            });
            const data = await res.json();
            return data;
        }
    })
    const handleMakeAdvertise = (id) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/products/seller/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    toast.success('Make advertised successful.');
                    refetch();
                }
                console.log(data);
            })
            .catch(err => console.error(err.message))
    }
    const handleDeleteProduct = (product) => {
        // console.log(product);
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/products/${product?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`Product ${product.productName} is deleted successfully`)
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="mb-4 text-3xl text-center">My Products</h2>
            <div className="mx-2 overflow-x-auto">
                {
                    products.length > 0 ?
                        <table className="table w-full">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th className='bg-primary text-base-100'></th>
                                    <th className='bg-primary text-base-100'>Name</th>
                                    <th className='bg-primary text-base-100'>Price</th>
                                    <th className='bg-primary text-base-100'>Status</th>
                                    <th className='bg-primary text-base-100'>Advertise</th>
                                    <th className='bg-primary text-base-100'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product, indx) =>
                                        <tr key={product._id}>
                                            <th>{indx + 1}</th>
                                            <td>{product.productName}</td>
                                            <td>{product.resalePrice}</td>
                                            <td>
                                                {product?.soldStatus !== 'sold' ?
                                                    <p className='text-neutral'>Available</p>
                                                    :
                                                    <p className='text-neutral'>Sold</p>
                                                }
                                            </td>
                                            <td >
                                                {product?.advStatus !== 'advertised' ?
                                                    <>
                                                        {
                                                            product?.soldStatus !== 'sold' ?
                                                                <button onClick={() => handleMakeAdvertise(product?._id)} className='btn btn-xs btn-primary'>Make Advertise</button>
                                                                :
                                                                <button className='text-white btn btn-xs btn-error'>Can't Advertise</button>
                                                        }
                                                    </>
                                                    :
                                                    <p className='text-neutral'>
                                                        {product?.advStatus === 'advertised' && 'Advertising'}
                                                    </p>
                                                }
                                            </td>
                                            <td>
                                                <label onClick={() => setDeleteProduct(product)} htmlFor="confirmation_modal" className='text-white btn btn-error btn-xs'>Delete</label>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div>
                            <h2 className='text-2xl text-center'>You have no products. Please add a product to see your products.</h2>
                        </div>
                }
            </div>
            {
                deleteProduct && <DeleteConfirmationModal
                    deleteTitle={`Are you sure? you want to delete?`}
                    message={`If you delete ${deleteProduct.productName}. It cannot get the Product back.`}
                    successAction={handleDeleteProduct}
                    modalData={deleteProduct}
                    closeModal={closeModal}
                    successButtonName='Delete'
                ></DeleteConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;