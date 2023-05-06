import { UilFileAlt } from '@iconscout/react-unicons';
import { Icon, IconButton } from '@mui/material';
import { ModalEditPatientResult } from 'components/ModalEditPatientResult/ModalEditPatientResult';
import { PatientMedcart } from 'components/PatientMedcart/PatientMedcart';
import { PatientMedcartEdit } from 'components/PatientMedcartEdit/PatientMedcartEdit';
import { ProfileBlockPatient } from 'components/ProfileBlockPatient/ProfileBlockPatient';
import { useEffect, useState } from 'react';
import { RxPencil1 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserInfoById } from 'redux/info/operation';
import style from './ListOfPatientsProfile.module.css';

export const ListOfPatientsProfile = () => {
    const [editMedcart, setEditMedcart] = useState(true);
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const dispatch = useDispatch();

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        dispatch(getUserInfoById(id)).then(({ payload }) => {
            setUserInfo(payload);
        });
        // eslint-disable-next-line
    }, [dispatch]);

    const analysis = [
        {
            name: 'Urine analysis is general',
        },
        {
            name: 'Clinical blood analysis',
        },
        {
            name: 'Biochemical research',
        },
        {
            name: 'Hematological studies',
        },
    ];

    const currentMedcart = editMedcart ? (
        <PatientMedcart setEditMedcart={setEditMedcart} />
    ) : (
        <PatientMedcartEdit setEditMedcart={setEditMedcart} />
    );
    // const modal = editAnalysis && <ResultsEditModal setEditAnalysis={setEditAnalysis} />;

    return (
        <>
            <div className={style.PatientInformation}>
                {userInfo && <ProfileBlockPatient userInfo={userInfo} />}
                <div className={style.PatientResults}>
                    <ul className={style.PatientResults_VisitRecord}>
                        <li>
                            Doctor:<span>Shumeiko Timur</span>
                        </li>
                        <li>
                            Date:<span>16/12/2021</span>
                        </li>
                    </ul>
                    <ul className={style.PatientResults_Details}>
                        {analysis.map(({ name }) => {
                            return (
                                <li>
                                    <Icon color="primary">
                                        <UilFileAlt style={{ width: '20px', height: '20px' }} />
                                    </Icon>
                                    {name}
                                </li>
                            );
                        })}
                    </ul>
                    <IconButton
                        color="primary"
                        sx={{ position: 'absolute', top: '16px', right: '16px' }}
                        onClick={() => setOpen(true)}
                    >
                        <RxPencil1 style={{ width: '20px', height: '20px' }} />
                    </IconButton>
                </div>
            </div>

            {currentMedcart}
            <ModalEditPatientResult open={open} setOpen={setOpen} />
        </>
    );
};
