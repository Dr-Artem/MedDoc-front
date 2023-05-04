import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Input, InputLabel, Modal, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useState } from 'react';
import * as yup from 'yup';
import s from './ModalEditPatientProfile.module.css';
import { updateUserInfo } from 'redux/info/operation';
import { useDispatch } from 'react-redux';

const regex = /^\+\d{1,3}\s?s?\d{1,}\s?\d{1,}\s?\d{1,}$/;

const schema = yup.object().shape({
    number: yup.string().matches(regex, 'Phone number is not valid').required('Phone is a required field'),
    name: yup.string().required('Name is required'),
    gender: yup.string().required('Gender is required'),
    birthday: yup.string().required('Date is required'),
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: [335, 500],
    p: 4,
    background: '#FFFFFF',
    boxShadow: '0px 4px 23px rgba(17, 17, 17, 0.05)',
    borderRadius: '16px',
};

const ModalEditPatientProfile = ({ open, setApp }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs);

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        birthday: '',
        number: '',
    });

    function handleDateChange(date) {
        setSelectedDate(date);
        setFormData(prevState => ({ ...prevState, birthday: date.format('YYYY-MM-DD') }));
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        console.log('🚀 ~ event.target:', event.target);
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     console.log(formData);
    //     try {
    //         schema.validateSync(formData, { abortEarly: false });
    //         // send data to backend
    //     } catch (error) {
    //         const errors = error.inner.reduce((acc, curr) => {
    //             acc[curr.path] = curr.message;
    //             return acc;
    //         }, {});
    //         setErrors(errors);
    //     }

    const handleSubmit = event => {
        console.log(formData);
        event.preventDefault();
        try {
            schema.validateSync(formData, { abortEarly: false });
            dispatch(updateUserInfo(formData));
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setErrors(errors);
        }
    };
    return (
        <Modal open={open} onClose={() => setApp(!open)}>
            <Box sx={style} className={s.box_style} validationSchema={schema}>
                <div className={s.header_wrapper}>
                    <Typography variant="subtitle" component="p">
                        Edit profile
                    </Typography>
                    <IconButton onClick={() => setApp(!open)} size="small">
                        <CloseIcon sx={{ width: '24px', height: '24px', color: 'text.black' }} />
                    </IconButton>
                </div>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <ul className={s.input_wrapper}>
                        <li>
                            <InputLabel variant="standard" color="primary" htmlFor="name">
                                Name
                            </InputLabel>
                            <Input
                                value={formData.name}
                                onChange={handleInputChange}
                                variant="primary"
                                color="primary"
                                disableUnderline
                                type="text"
                                id="name"
                                name="name"
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                            />
                        </li>
                        <li>
                            <InputLabel variant="standard" color="primary" htmlFor="gender">
                                Gender
                            </InputLabel>
                            <Input
                                value={formData.gender}
                                onChange={handleInputChange}
                                variant="primary"
                                color="primary"
                                disableUnderline
                                type="text"
                                id="gender"
                                name="gender"
                                error={Boolean(errors.gender)}
                                helperText={errors.gender}
                            />
                        </li>
                        <li>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <InputLabel variant="standard" color="primary" htmlFor="date">
                                    Date of birth
                                </InputLabel>
                                <DemoItem id="date" name="date" components={['DatePicker']}>
                                    <DatePicker
                                        sx={{ width: '100%' }}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        error={Boolean(errors.date)}
                                        helperText={errors.date}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </li>
                        <li>
                            <InputLabel variant="standard" color="primary" htmlFor="number">
                                Number
                            </InputLabel>
                            <Input
                                value={formData.number}
                                onChange={handleInputChange}
                                variant="primary"
                                color="primary"
                                type="tel"
                                disableUnderline
                                id="number"
                                name="number"
                                error={Boolean(errors.number)}
                                helperText={errors.number}
                            />
                        </li>
                    </ul>
                    <Button
                        disableElevation
                        type="submit"
                        variant="contained"
                        color="secondary"
                        sx={{ p: { md: '13px 32px' } }}
                    >
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ModalEditPatientProfile;
