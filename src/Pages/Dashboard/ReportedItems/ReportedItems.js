import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import DeleteConfirmationModal from '../../SharedPages/DeleteConfirmationModal/DeleteConfirmationModal';
import Loading from '../../SharedPages/Loading/Loading';

const ReportedItems = () => {
    const [deleteReport, setDeleteReport] = useState(null);
    const closeModal = () => {
        setDeleteReport(null);
    }
    useTitle('Reported Items');
    const url = `https://b612-used-products-resale-server-side-shourovhasan.vercel.app/reports`;
    const { data: reports = [], isLoading, refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            })
            const data = await res.json();
            return data;
        }
    })
    const handleDeleteBuyer = (report) => {
        fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/reports/${report?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success(`Report is deleted successfully`)
                    refetch();
                }
            })
    }

    // console.log(buyers);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className="mb-4 text-3xl text-center">
                All Reports
            </h3>
            <div className="mx-2 overflow-x-auto">
                {
                    reports.length > 0 ?
                        <table className="table w-full">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th className='bg-primary text-base-100'></th>
                                    <th className='bg-primary text-base-100'>Image</th>
                                    <th className='bg-primary text-base-100'>Name</th>
                                    <th className='bg-primary text-base-100'>Reporter Email</th>
                                    <th className='bg-primary text-base-100'>Seller Email</th>
                                    <th className='bg-primary text-base-100'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reports.map((report, indx) =>
                                        <tr key={report._id}>
                                            <th>{indx + 1}</th>
                                            <td>
                                                <img className='w-12 rounded' src={report.productPicture} alt="" />
                                            </td>
                                            <td>{report.productName}</td>
                                            <td>{report.reporterEmail}</td>
                                            <td>{report.sellerEmail}</td>
                                            <td>
                                                <label onClick={() => setDeleteReport(report)} htmlFor="confirmation_modal" className='text-white btn btn-error btn-xs'>Delete</label>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div className='w-full h-96'>
                            <h2 className='text-3xl text-center text-primary '>Here have no Reports.</h2>
                        </div>
                }
            </div>
            {
                deleteReport && <DeleteConfirmationModal
                    deleteTitle={`Are you sure? you want to delete?`}
                    message={`If you delete. It cannot get the Buyer back.`}
                    successAction={handleDeleteBuyer}
                    modalData={deleteReport}
                    closeModal={closeModal}
                    successButtonName='Delete'
                ></DeleteConfirmationModal>
            }
        </div>
    );
};

export default ReportedItems;