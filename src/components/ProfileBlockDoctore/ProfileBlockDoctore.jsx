// import { selectUserId } from 'redux/auth/selectors';
import { UilPen } from '@iconscout/react-unicons';
import { Button, Typography } from '@mui/material';
import { Badge } from 'components/Badge/Badge';
import Card from 'components/Card/Card';
import EditDoctorProfileModal from 'components/EditDoctorProfileModal/EditDoctorProfileModal';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import StarRating from 'components/StarRating/StarRating';
import moment from 'moment';
import { useState } from 'react';
import { useLocation } from 'react-router';
import css from './ProfileBlockDoctore.module.css';

const ident = 1;

export const ProfileBlockDoctore = ({ children, doctorInfo }) => {
    const [appModal, setAppModal] = useState(false);

    const personalLoc = useLocation().pathname.startsWith(`/doctor/personal/${ident}`);

    return (
        <Card>
            <Badge> {doctorInfo.role}</Badge>
            <StarRating value={doctorInfo.rating} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <ProfileImage avatar={doctorInfo.avatarURL} personalLoc={personalLoc} />
                <div style={{ textAlign: 'center' }}>
                    <ul className={css.list}>
                        <li className={css.item}>
                            Name:
                            <p className={css.data}>{doctorInfo.name}</p>
                        </li>
                        {personalLoc && (
                            <li className={css.item}>
                                Gender:<p className={css.data}>{doctorInfo.gender}</p>
                            </li>
                        )}

                        <li className={css.item}>
                            Date of birth:
                            <p className={css.data}>{moment(doctorInfo.birthday).format('DD.MM.YYYY')}</p>
                        </li>
                        <li className={css.item}>
                            Phone number:<p className={css.data}>{doctorInfo.number}</p>
                        </li>
                        <li className={css.item}>
                            Price:<p className={css.data}>{doctorInfo.price} UAH /1 hour</p>
                        </li>
                    </ul>
                </div>
                {personalLoc && (
                    <Button color="primary" onClick={() => setAppModal(!appModal)}>
                        <UilPen style={{ width: '20px', height: '20px' }} />
                        <Typography color="text.black" sx={{ lineHeight: 1.285, textTransform: 'none' }}>
                            Edit profile
                        </Typography>
                    </Button>
                )}
                {children}
            </div>
            <EditDoctorProfileModal open={appModal} setApp={setAppModal} />
        </Card>
    );
};
