import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Modal } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Card from 'components/Card/Card';
import { DatePickers } from 'components/DatePickers/DatePickers';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUserAppointments } from 'redux/appointment/operation';
import Avatar from '../../Image/Avatar.png';
import css from './WeekVisitsBlock.module.css';

export const WeekVisitsBlock = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()).format('DD.MM.YYYY'));
    const [isVisitsVisible, setIsVisitsVisible] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [dateVisits, setDateVisits] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserAppointments()).then(data => {
            setDateVisits(data.payload);
        });
    }, [dispatch]);

    const filteredArray = dateVisits.filter(item => item.date === selectedDate);

    const handleDateChange = formattedDate => {
        setSelectedDate(formattedDate);
    };

    const handleArrowClick = () => {
        setIsVisitsVisible(!isVisitsVisible);
    };

    const handleClick = item => {
        setSelectedItem(item);
        setOpen(true);
    };

    return (
        <Card>
            <div className={css.weekVisitsBlockFlexWrapper}>
                <div className={css.weekVisitsTitleWrapper}>
                    <p className={css.weekVisitsTitle}>Visits for a week </p>
                </div>
                <div className={css.weekVisitsCalendar}>
                    <div>
                        <DatePickers value={selectedDate} onDateSelected={handleDateChange} />
                    </div>

                    {!isVisitsVisible && (
                        <IconButton onClick={handleArrowClick}>
                            <KeyboardArrowDownIcon sx={{ fontSize: '28px', color: '#111111' }} />
                        </IconButton>
                    )}
                    {isVisitsVisible && (
                        <IconButton onClick={handleArrowClick}>
                            <KeyboardArrowUpIcon sx={{ fontSize: '28px', color: '#111111' }} />
                        </IconButton>
                    )}
                </div>
            </div>

            {isVisitsVisible && filteredArray.length > 0 && (
                <div>
                    <ul className={css.weekVisitList}>
                        {filteredArray.map(({ _id, date, patient, time }, index, array) => {
                            return (
                                <>
                                    <li
                                        key={_id}
                                        className={css.weekVisitItem}
                                        onClick={() => handleClick({ date, patient, time })}
                                    >
                                        <div className={css.weekVisitItemInfo}>
                                            <img className={css.weekVisitAvatar} src={patient.avatarURL} alt="avatar" />
                                            <div>
                                                <p className={css.weekVisitsName}>{patient.name}</p>
                                                <p className={css.weekVisitsNameCategory}>Patient</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className={css.weekVisitsDateTitle}>Date of visit</p>

                                            <div className={css.weekVisitsDateInfoWrapper}>
                                                <div className={css.weekVisitsDateContainer}>
                                                    <p className={css.weekVisitsDate}>{date}</p>
                                                </div>

                                                <div className={css.weekVisitsTimeContainer}>
                                                    <p className={css.weekVisitsTime}>{time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    {index !== array.length - 1 && (
                                        <Divider
                                            sx={{
                                                border: '1.5px solid rgba(209, 213, 219, 0.2)',
                                                marginBottom: { xs: '32px', md: '16px' },
                                            }}
                                        />
                                    )}
                                </>
                            );
                        })}
                    </ul>
                </div>
            )}

            <Modal open={open} onClose={() => setOpen(false)}>
                <div className={css.modalWeekVisit}>
                    <div className={css.modalWeekVisitsTitleWrapper}>
                        <p className={css.modalWeekVisitsTitle}>Doctor's appointment </p>
                        <IconButton>
                            <CloseIcon sx={{ minWidth: '12px', color: '#111111' }} onClick={() => setOpen(false)} />
                        </IconButton>
                    </div>
                    {selectedItem && (
                        <div className={css.modalWeekVisitItemInfo}>
                            <img
                                className={css.weekVisitAvatar}
                                src={selectedItem.patient.avatarURL ? selectedItem.patient.avatarURL : { Avatar }}
                                alt="avatar"
                            />
                            <div className={css.weekVisitProfile}>
                                <div className={css.modalNameFlex}>
                                    <p className={css.weekVisitsName}>{selectedItem.patient.name}</p>
                                    <p className={css.modalWeekVisitsNameCategory}>Patient</p>
                                </div>
                                <ul>
                                    <li className={css.modalWeekVisitItemInfo}>
                                        Gender:
                                        <p className={css.modalWeekVisitItemInfoText}>
                                            {selectedItem.patient.gender ? selectedItem.patient.gender : ''}
                                        </p>
                                    </li>
                                    <li className={css.modalWeekVisitItemInfo}>
                                        Date of birth:
                                        <p className={css.modalWeekVisitItemInfoText}>
                                            {selectedItem.patient.birthday ? selectedItem.patient.birthday : ''}
                                        </p>
                                    </li>
                                    <li className={css.modalWeekVisitItemInfo}>
                                        Phone number:
                                        <p className={css.modalWeekVisitItemInfoText}>{selectedItem.patient.number}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <div>
                        <p className={css.weekVisitsDateTitle}>Date of visit</p>

                        <div className={css.weekVisitsDateInfoWrapper}>
                            <div className={css.weekVisitsDateContainer}>
                                <p className={css.weekVisitsDate}>{selectedItem.date}</p>
                            </div>

                            <div className={css.weekVisitsTimeContainer}>
                                <p className={css.weekVisitsTime}>{selectedItem.time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Card>
    );
};
