import { Navigation } from 'components/Navigation/Navigation';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const DoctorMain = () => {
    return (
        <>
            <Navigation />
            <Suspense>
                <Outlet />
            </Suspense>

            {/* <Pagination/> */}
        </>
    );
};
