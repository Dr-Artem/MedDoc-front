import { useAuth } from 'hooks';
import { Route, Routes } from 'react-router';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';

import { AuthPage, ErrorPage, GridLayout, Layout, MainPage } from 'pages';
import {
    // Colleagues,
    DoctorMain,
    // ListOfPatients,
    ListOfPatientsProfile,
} from 'pages/DoctorMain';
import { PatientDoctors, PatientMain, PatientMedicalHistory, PatientVisitsToDoctor } from 'pages/PatientMain';

import { lazy } from 'react';

const Colleagues = lazy(() => import('../pages/DoctorMain/Colleagues/Colleagues'));
const ListOfPatients = lazy(() => import('../pages/DoctorMain/ListOfPatients/ListOfPatients'));
const Personal = lazy(() => import('../pages/DoctorMain/Personal/Personal'));
const VisitHistory = lazy(() => import('../pages/DoctorMain/VisitHistory/VisitHistory'));

export const App = () => {
    const { user } = useAuth();

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route
                        path="patient"
                        element={<PrivateRoute component={PatientMain} redirectTo="/auth/register" />}
                    >
                        <Route
                            path="history"
                            element={
                                <GridLayout>
                                    <PatientMedicalHistory />
                                </GridLayout>
                            }
                        />
                        <Route path="doctors" element={<PatientDoctors />} />
                        <Route path="visits-history" element={<PatientVisitsToDoctor />} />
                    </Route>
                    <Route path="doctor" element={<PrivateRoute component={DoctorMain} redirectTo="/auth/register" />}>
                        <Route
                            path="personal/:id"
                            element={
                                <GridLayout>
                                    <Personal />
                                </GridLayout>
                            }
                        />
                        <Route path="visits-history" element={<VisitHistory />} />
                        <Route path="patients-list" element={<ListOfPatients />} />
                        <Route
                            path="patients-list/:id"
                            element={
                                <GridLayout>
                                    <ListOfPatientsProfile />
                                </GridLayout>
                            }
                        />
                        <Route path="colleuges" element={<Colleagues />} />
                        <Route
                            path="colleuges/:id"
                            element={
                                <GridLayout>
                                    <Personal />
                                </GridLayout>
                            }
                        />
                    </Route>
                </Route>
                <Route
                    path="auth/:typeAuth"
                    element={
                        <RestrictedRoute
                            component={AuthPage}
                            redirectTo={user.role === 'Patient' ? '/patient/history' : `/doctor/personal/${user.id}`}
                        />
                    }
                />
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </>
    );
};
