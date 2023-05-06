import { Box, Tab, Tabs } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const patientRoutes = [
    { path: '/patient/history', label: 'Medical history' },
    { path: '/patient/doctors', label: 'Doctors' },
    { path: '/patient/visits-history', label: 'Visits to the doctor' },
];

const doctorRoutes = [
    { path: '/doctor/personal/64528ae541702d26c9b22991', label: 'Personal page' },
    { path: '/doctor/visits-history', label: 'Visit history' },
    { path: '/doctor/patients-list', label: 'List of patients' },
    { path: '/doctor/colleuges', label: 'Сolleagues' },
];

const indicatorStyles = {
    style: {
        background:
            'linear-gradient(237.38deg, #6ED599 -5.69%, rgba(63, 76, 153, 0) 121.24%), linear-gradient(161.43deg, rgba(35, 35, 35, 0.8) 12.58%, rgba(35, 35, 35, 0) 110.88%), linear-gradient(0deg, rgba(31, 42, 106, 0.2), rgba(31, 42, 106, 0.2)), linear-gradient(208.79deg, #6ED599 3.46%, #1F2A6A 51.48%), #D9D9D9',
        backgroundBlendMode: 'normal, normal, multiply, normal, normal',
        borderRadius: '7px',
        height: '4px',
    },
};

export const Navigation = () => {
    const { pathname } = useLocation();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (pathname.startsWith('/patient')) {
            const routeIndex = patientRoutes.findIndex(route => pathname.startsWith(route.path));
            setValue(routeIndex);
        } else if (pathname.startsWith('/doctor')) {
            const routeIndex = doctorRoutes.findIndex(route => pathname.startsWith(route.path));
            setValue(routeIndex);
        }
    }, [pathname]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', pt: { xs: '40px', md: '64px ' } }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    TabIndicatorProps={indicatorStyles}
                    sx={{ marginLeft: '26px' }}
                >
                    {pathname.startsWith('/patient') &&
                        patientRoutes.map((route, index) => (
                            <Tab
                                key={index}
                                component={Link}
                                to={route.path}
                                label={route.label}
                                sx={{
                                    fontSize: { md: '18px' },
                                    lineHeight: { md: '1.22' },
                                    mb: { md: '24px', lg: '32px' },
                                    mr: { md: '40px' },
                                }}
                                value={index}
                            />
                        ))}
                    {pathname.startsWith('/doctor') &&
                        doctorRoutes.map((route, index) => (
                            <Tab
                                key={index}
                                component={Link}
                                to={route.path}
                                label={route.label}
                                sx={{
                                    fontSize: { md: '18px' },
                                    lineHeight: { md: '1.22' },
                                    mb: { md: '24px', lg: '32px' },
                                    mr: { md: '40px' },
                                }}
                                value={index}
                            />
                        ))}
                </Tabs>
                <Divider
                    sx={{
                        borderBottom: '1.5px solid rgba(209, 213, 219, 0.5)',
                        width: '100%',
                    }}
                />
            </Box>
        </>
    );
};
