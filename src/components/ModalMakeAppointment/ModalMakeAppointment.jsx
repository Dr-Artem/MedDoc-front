import CloseIcon from '@mui/icons-material/Close';
import { InputLabel, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { DatePickers } from 'components/DatePickers/DatePickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUserAppointments, setAppointment } from 'redux/appointment/operation';
import { getAllUsersForRole } from 'redux/info/operation';
// import { array, number, object } from 'yup';
import css from './ModalMakeAppointment.module.css';

const timeDates = ['10:00 - 11:30', '12:00 - 13:00', '15:00 - 17:00', '17:00 - 19:00'];

const buttonStyle = {
    padding: { md: '13px 32px' },
};

const modalProperty = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.main',
    outline: 'none',
    borderRadius: '16px',
    p: { sm: '20px', md: '32px' },
    maxWidth: { sm: '335px', md: '500px' },
    width: '100%',
};

const inputStyles = {
    '.MuiOutlinedInput-root ': {
        padding: '14px 18px',
        borderRadius: '8px',
        '& .MuiAutocomplete-input': { padding: '0px' },
    },
};

export const ModalMakeAppointment = ({ open, setApp }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()).format('DD.MM.YYYY'));
    const [selectedTime, setSelectedTime] = useState(null);
    const [specialization, setSpecialization] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [selectDoctor, setSelectDoctor] = useState(null);
    const [userAppointments, setUserAppointments] = useState([]);
    const [userHour, setUserHour] = useState();
    const [allDoctors, setAllDoctors] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserAppointments()).then(({ payload }) => {
            typeof payload !== 'number' ? setUserAppointments(payload) : setUserAppointments([]);
        });
        dispatch(getAllUsersForRole('Doctor')).then(({ payload }) => setAllDoctors(payload));
    }, [dispatch]);

    const doctorsWithSpecialization = allDoctors.filter(el => el.specialization !== undefined);
    [].map(el => console.log(el));

    const specs = doctorsWithSpecialization.map(el => el.specialization);
    const doctorsName = doctorsWithSpecialization.map(el => el.name);

    const uniqueSpecialization = Array.from(new Set(specs));
    // console.log(userAppointments);

    const filterAppointments = (doctorName, formattedDate) => {
        const doctorAppointments = userAppointments.filter(el => el.doctor.name === doctorName);
        const doctorAppointmentsDate = doctorAppointments.filter(el => el.date === formattedDate);
        const doctorHour = doctorAppointmentsDate.map(el => el.time);
        return doctorHour;
    };

    const handleSpecializationChange = event => {
        const doctorSpecialization = event.currentTarget.innerText;
        setSpecialization(doctorSpecialization);

        const doctorNames = doctorsWithSpecialization
            .filter(({ specialization }) => specialization === doctorSpecialization)
            .map(el => el.name);
        setDoctor(doctorNames);
        setSelectDoctor(null);
        setUserHour(null);
    };

    const handleDoctorChange = event => {
        const name = event.currentTarget.innerText;
        setSelectDoctor(name);

        const doctorHour = filterAppointments(name, selectedDate);
        setUserHour(doctorHour);
    };

    const handleTimeChange = value => {
        setSelectedTime(value.currentTarget.innerText);
    };

    const handleDateChange = formattedDate => {
        const doctorHour = filterAppointments(selectDoctor, formattedDate);
        setUserHour(doctorHour);
        setSelectedDate(formattedDate);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const requiredFields = [selectedDate, selectedTime, specialization, doctor];
        if (requiredFields.every(field => field !== null)) {
            const selectDoctorInfo = allDoctors.filter(el => el.name === selectDoctor);

            const data = {
                doctor: selectDoctorInfo[0]._id,
                specialization,
                date: selectedDate,
                time: selectedTime,
            };

            dispatch(setAppointment(data));

            setSelectedTime(null);
            setSpecialization(null);
            setUserHour(null);
            setDoctor(null);
            setSelectDoctor(null);
            setSelectedDate(dayjs(Date.now()).format('DD.MM.YYYY'));
            setApp(!open);
        } else {
            alert('Fill in all fields!');
        }
    };

    return (
        <Modal open={open} onClose={() => setApp(!open)}>
            <Box sx={modalProperty}>
                <form onSubmit={handleSubmit}>
                    <div className={css.titleWrapp}>
                        <Typography
                            variant="subtitle"
                            component="p"
                            sx={{ fontSize: { md: '20px' }, lineHeight: { md: 1.5 } }}
                        >
                            Doctor's appointment
                        </Typography>
                        <IconButton aria-label="close modal" size="small" onClick={() => setApp(!open)}>
                            <CloseIcon
                                sx={{
                                    color: 'text.black',
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                        </IconButton>
                    </div>
                    <Typography
                        variant="text"
                        color="text.gray"
                        component="p"
                        sx={{ fontSize: { md: '16px' }, lineHeight: { md: 1.5 }, mb: { xs: '40px', md: '32px' } }}
                    >
                        Choose the desired appointment time and wait for confirmation
                    </Typography>
                    <ul className={css.inputList}>
                        <li>
                            <InputLabel variant="standard" color="primary">
                                Specialization
                            </InputLabel>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={uniqueSpecialization}
                                value={specialization}
                                onChange={handleSpecializationChange}
                                sx={{ width: '100%' }}
                                renderInput={params => (
                                    <TextField {...params} sx={inputStyles} placeholder="Enter specialization" />
                                )}
                            />
                        </li>
                        <li>
                            <InputLabel variant="standard" color="primary">
                                Doctors
                            </InputLabel>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={doctor ? doctor : doctorsName}
                                value={selectDoctor}
                                onChange={handleDoctorChange}
                                sx={{ width: '100%' }}
                                renderInput={params => (
                                    <TextField {...params} sx={inputStyles} placeholder="Enter doctors" />
                                )}
                            />
                        </li>
                    </ul>
                    <DatePickers value={selectedDate} onDateSelected={handleDateChange} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginTop: { xs: '20px', md: '16px' },
                            marginBottom: { xs: '20px', md: '32px' },
                        }}
                    >
                        {timeDates?.map(e => {
                            if (!userHour?.includes(e)) {
                                return (
                                    <button type="button" key={e} className={css.timeBtn} onClick={handleTimeChange}>
                                        {e}
                                    </button>
                                );
                            } else {
                                return (
                                    <button type="button" disabled key={e} className={css.timeBtnDisable}>
                                        {e}
                                    </button>
                                );
                            }
                        })}
                    </Box>
                    <Button type="submit" variant="contained" color="secondary" disableElevation sx={buttonStyle}>
                        send
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
