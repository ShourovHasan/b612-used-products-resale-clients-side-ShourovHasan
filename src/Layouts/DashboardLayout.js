import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';
import Header from '../Pages/SharedPages/Header/Header';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);

    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile ">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="w-48 drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="p-4 menu w-80 text-base-content ">
                        {/* <!-- Sidebar content here --> */}
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/allBuyers'>All Buyers</Link></li>
                                <li><Link to='/dashboard/allSellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/allAdmins'>All Admins</Link></li>
                                <li><Link to='/dashboard/reportedItems'>Reported Items</Link></li>
                                <li><Link to='/dashboard/allCategories'>All Categories</Link></li>
                            </>
                        }
                        {
                            isSeller && <>
                                <li><Link to='/dashboard/myProducts'>My Products</Link></li>
                                <li><Link to='/dashboard/addProduct'>Add Product</Link></li>                                
                                <li><Link to='/dashboard/myBuyers'>My Buyers</Link></li>                                
                                <li><Link to='/dashboard/addCategory'>Add Category</Link></li>                                
                            </>
                        }
                        {
                            isBuyer && <>
                                <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                                {/* <li><Link to='/dashboard/myWishlist'>My Wishlist</Link></li>                                 */}
                            </>
                        }
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;