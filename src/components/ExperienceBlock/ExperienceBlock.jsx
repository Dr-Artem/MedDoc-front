// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import css from './ExperienceBlock.module.css';
// import experienceImg from '../../Image/Experience1.png';
// import AddIcon from '@mui/icons-material/Add';
// import { IconButton } from '@mui/material';
// import { RxPencil1 } from 'react-icons/rx';
// import Divider from '@mui/material/Divider';
// import { ExperienceModal } from 'components/ExperienceModal/ExperienceModal';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import { deleteUserExperience } from 'redux/info/operation';
// import moment from 'moment';
// import { UilTrashAlt } from '@iconscout/react-unicons';

// export const ExperienceBlock = ({ doctorInfo }) => {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [title, setTitle] = useState('');

//     const date = new Date(Date.parse('2011-11-10T22:00:00.000Z'));
//     const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
//     console.log(formattedDate);

//     const dispatch = useDispatch();

//     const handleModalChange = currentTitle => {
//         setModalOpen(!modalOpen);
//         setTitle(currentTitle);
//     };

//     return (
//         <div className={css.experienceBlock}>
//             <div className={css.experienceTitleWrapper}>
//                 <h2 className={css.experienceTitle}>Experience </h2>
//                 <IconButton sx={{ padding: '0' }} onClick={() => handleModalChange('Add experience')}>
//                     <AddIcon sx={{ color: '#477577' }} />
//                 </IconButton>
//             </div>
//             <ul className={css.experienceList}>
//                 {doctorInfo.experience.map(({ institution, description, startDate, endDate, _id }) => {
//                     return (
//                         <>
//                             <li className={css.experienceListItem}>
//                                 <div className={css.experienceItemWrapper}>
//                                     <div className={css.experienceImage}>
//                                         <img src={experienceImg} alt="Logo" />
//                                     </div>
//                                     <div className={css.experienceInfoItem}>
//                                         <p className={css.experienceInfoTitle}>{institution}</p>
//                                         <p className={css.experienceInfoDate}>
//                                             {moment(startDate).format('MMMM YYYY')} -
//                                             {moment(endDate).format('MMMM YYYY')}
//                                         </p>

//                                         <p className={css.experienceInfoAbout}>{description}</p>
//                                     </div>
//                                 </div>
//                                 <div style={{ display: 'flex', flexDirection: 'column' }}>
//                                     <div className={css.buttonEditWrapper}>
//                                         <p className={css.experienceInfoDateFlex}>
//                                             {moment(startDate).format('MMMM YYYY')} -
//                                             {moment(endDate).format('MMMM YYYY')}
//                                         </p>

//                                         <IconButton
//                                             sx={{ padding: '0', marginBottom: '12px' }}
//                                             onClick={() => handleModalChange('Edit experience')}
//                                         >
//                                             <RxPencil1 style={{ color: '#477577' }} />
//                                         </IconButton>
//                                     </div>

//                                     <IconButton sx={{ padding: '0', justifyContent: 'flex-end' }}>
//                                         <UilTrashAlt
//                                             onClick={() => dispatch(deleteUserExperience(_id))}
//                                             style={{ color: '#477577' }}
//                                         />
//                                     </IconButton>
//                                 </div>
//                             </li>
//                             <Divider sx={{ border: '1.5px solid rgba(209, 213, 219, 0.2)', marginBottom: '16px' }} />
//                         </>
//                     );
//                 })}
//             </ul>
//             <ExperienceModal doctorInfo={doctorInfo} open={modalOpen} setModalOpen={handleModalChange} title={title} />
//         </div>
//     );
// };
