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
import { useState } from 'react';
import css from './ModalMakeAppointment.module.css';

const doctorData = {
    names: [
        'Aksionov Pavlo Valeriyovych',
        'Sulik Roman Volodymyrovych',
        'Vergulenko Alla Olehivna',
        'Tepa Olena Valeriivna',
        'Ostapets Tatyana Ivanovna',
    ],
    specs: [
        'Ophthalmologist',
        'Surgeon',
        'Therapist',
        'Neurologist',
        'Gynecologist',
        'Endocrinologist',
        'Psychiatrist',
        'Psychotherapist',
        'Otolaryngologist',
    ],
    timeDates: ['10:00 - 11:30', '12:00 - 13:00', '15:00 - 17:00', '17:00 - 19:00'],
};

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
    const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));
    const [selectedTime, setSelectedTime] = useState(null);
    const [specialization, setSpecialization] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState(null);

    const handleSpecializationChange = value => {
        setSpecialization(value);
    };

    const handleDoctorChange = value => {
        setDoctor(value);
    };

    const handleTimeChange = value => {
        setSelectedTime(value);
    };

    const handleDateChange = formattedDate => {
        setSelectedDate(formattedDate);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const requiredFields = [selectedDate, selectedTime, specialization, doctor];
        if (requiredFields.every(field => field !== null)) {
            const timeDate = [{ date: selectedDate, time: [selectedTime] }];

            const data = {
                name: doctor,
                spec: specialization,
                timeDate,
            };

            setAppointmentDate(data);
            setSpecialization(null);
            setSelectedTime(null);
            setDoctor(null);
            setSelectedDate(dayjs(Date.now()));
            console.log(data);
            console.log(appointmentDate);

            setApp(!open);
        } else {
            alert('Fill in all fields!');
        }
    };

    return (
        <Modal open={open} onClose={() => setApp(!open)}>
            <Box sx={modalProperty}>
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
                            options={doctorData.specs}
                            value={doctorData.spec}
                            onChange={handleDoctorChange}
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
                            options={doctorData.names}
                            value={doctorData.name}
                            onChange={handleSpecializationChange}
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
                    {doctorData.timeDates.map(e => {
                        return (
                            <button type="button" key={e} className={css.timeBtn} onClick={handleTimeChange}>
                                {e}
                            </button>
                        );
                    })}
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disableElevation
                    sx={buttonStyle}
                    onClick={handleSubmit}
                >
                    send
                </Button>
            </Box>
        </Modal>
    );
};
