import React from 'react';
import useTitle from '../../hooks/useTitle';

const PageNotFound = () => {
    useTitle('404 Page Not Found');
    return (
        <div className='flex justify-center '>
            <img src='404_error.png' className='w-1/2 lg:w-2/3' alt=''></img>
        </div>
    );
};

export default PageNotFound;