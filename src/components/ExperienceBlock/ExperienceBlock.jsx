import { UilTrashAlt } from '@iconscout/react-unicons';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
// import Divider from '@mui/material/Divider';
import { ExperienceModal } from 'components/ExperienceModal/ExperienceModal';
import moment from 'moment';
import { useState } from 'react';
import { RxPencil1 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { deleteUserExperience } from 'redux/info/operation';
import experienceImg from '../../Image/Experience1.png';
import css from './ExperienceBlock.module.css';

export const ExperienceBlock = ({ doctorInfo }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [id, setId] = useState(null);

    const dispatch = useDispatch();

    const handleModalChange = (currentTitle, _id) => {
        setModalOpen(!modalOpen);
        setTitle(currentTitle);

        _id ? setId(_id) : setId(null);
    };

    return (
        <div className={css.experienceBlock}>
            <div className={css.experienceTitleWrapper}>
                <h2 className={css.experienceTitle}>Experience </h2>
                <IconButton sx={{ padding: '0' }} onClick={() => handleModalChange('Add experience')}>
                    <AddIcon sx={{ color: '#477577' }} />
                </IconButton>
            </div>
            <ul className={css.experienceList}>
                {doctorInfo.experience.map(
                    ({ institution, description, startDate, endDate, _id, institutionLogo }, index, array) => {
                        return (
                            <li key={index} className={css.experienceListItem}>
                                <div className={css.experienceItemWrapper}>
                                    <div className={institutionLogo ? css.experienceImage : css.plugLogo}>
                                        <img
                                            className={css.image}
                                            src={institutionLogo ? institutionLogo : experienceImg}
                                            alt="Logo"
                                        />
                                    </div>
                                    <div className={css.experienceInfoItem}>
                                        <p className={css.experienceInfoTitle}>{institution}</p>
                                        <p className={css.experienceInfoDate}>
                                            {moment(startDate).format('MMMM YYYY')} -
                                            {moment(endDate).format('MMMM YYYY')}
                                        </p>

                                        <p className={css.experienceInfoAbout}>{description}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className={css.buttonEditWrapper}>
                                        <p className={css.experienceInfoDateFlex}>
                                            {moment(startDate).format('MMMM YYYY')} -
                                            {moment(endDate).format('MMMM YYYY')}
                                        </p>

                                        <IconButton
                                            sx={{ padding: '0', marginBottom: '12px' }}
                                            onClick={() => {
                                                handleModalChange('Edit experience', _id);
                                            }}
                                        >
                                            <RxPencil1 style={{ color: '#477577' }} />
                                        </IconButton>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton
                                            size="small"
                                            sx={{ padding: '0', justifyContent: 'flex-end', marginLeft: 'auto' }}
                                            onClick={() => dispatch(deleteUserExperience(_id))}
                                        >
                                            <UilTrashAlt style={{ color: '#477577', fontSize: '18px' }} />
                                        </IconButton>
                                    </div>
                                </div>
                                {/* {index !== array.length - 1 && (
                                    <Divider
                                        sx={{
                                            border: '1.5px solid rgba(209, 213, 219, 0.2)',
                                            marginBottom: '16px',
                                        }}
                                    />
                                )} */}
                            </li>
                        );
                    }
                )}
            </ul>
            <ExperienceModal
                doctorInfo={doctorInfo}
                open={modalOpen}
                setModalOpen={handleModalChange}
                title={title}
                id={id}
            />
        </div>
    );
};
