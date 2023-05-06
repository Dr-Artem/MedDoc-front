import { UilPen } from '@iconscout/react-unicons';
import { Button, IconButton } from '@mui/material';
import { Badge } from 'components/Badge/Badge';
import Card from 'components/Card/Card';
import ModalEditPatientProfile from 'components/ModalEditPatientProfile/ModalEditPatientProfile';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import moment from 'moment';
import { cloneElement, useState } from 'react';
import { useLocation } from 'react-router';
import { ModalMakeAppointment } from '../ModalMakeAppointment/ModalMakeAppointment';
import css from './ProfileBlockPatient.module.css';

export const ProfileBlockPatient = ({ children, userInfo }) => {
    const [modalAppointment, setModalAppointment] = useState(false);
    const [mmodalProfile, setMmodalProfile] = useState(false);

    const personalLoc = useLocation().pathname.startsWith('/patient/');
    return (
        <>
            {
                <Card>
                    <Badge>{userInfo.role}</Badge>
                    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <ProfileImage personalLoc={personalLoc} />
                        <div>
                            <ul className={css.list}>
                                <li className={css.item}>
                                    Name:<p className={css.data}>{userInfo.name}</p>
                                </li>
                                {userInfo.gender && (
                                    <li className={css.item}>
                                        Gender:<p className={css.data}>{userInfo.gender}</p>
                                    </li>
                                )}

                                {userInfo.birthday && (
                                    <li className={css.item}>
                                        Date of birth:
                                        <p className={css.data}>{moment(userInfo.birthday).format('DD MMMM YYYY')}</p>
                                    </li>
                                )}

                                <li className={css.item}>
                                    Phone number:<p className={css.data}>{userInfo.number}</p>
                                </li>
                            </ul>
                            {personalLoc && (
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="submit"
                                        onClick={() => setModalAppointment(!modalAppointment)}
                                    >
                                        make an appointment
                                    </Button>
                                    {mmodalProfile && (
                                        <ModalEditPatientProfile open={mmodalProfile} setApp={setMmodalProfile} />
                                    )}
                                    {modalAppointment && (
                                        <ModalMakeAppointment open={modalAppointment} setApp={setModalAppointment} />
                                    )}
                                </>
                            )}
                            {children && cloneElement(children, { id: userInfo._id })}
                        </div>
                    </div>

                    {personalLoc && (
                        <IconButton
                            color="primary"
                            sx={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={() => setMmodalProfile(!mmodalProfile)}
                        >
                            <UilPen style={{ width: '20px', height: '20px' }} />
                        </IconButton>
                    )}
                </Card>
            }
        </>
    );
};
