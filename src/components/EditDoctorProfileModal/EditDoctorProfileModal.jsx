import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, InputLabel, Modal, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from 'redux/info/operation';
import * as yup from 'yup';
import css from '../EditDoctorProfileModal/EditDoctorProfileModule.module.css';

const regex = /^\+\d{1,3}\s?s?\d{1,}\s?\d{1,}\s?\d{1,}$/;

const schema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(200, 'Username must be less than or equal to 200 characters')
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
        .required('Username is a required field'),
    gender: yup.string().min(4).max(6).required(),
    phone: yup.string().matches(regex, 'Phone number is not valid').required('Phone is a required field'),
    about: yup.string().required(),
});

const style = {
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

const EditDoctorProfileModal = ({ open, setApp }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs);

    const dispatch = useDispatch();

    function handleDateChange(date) {
        setSelectedDate(date.format('DD.MM.YYYY'));
    }

    const handleSubmitForm = values => {
        const data = {
            name: values.username,
            gender: values.gender,
            birthday: selectedDate,
            number: values.phone,
            price: values.price,
            about: values.about,
        };
        dispatch(updateUserInfo(data));
        setApp(!open);
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            gender: '',
            date: selectedDate,
            phone: '',
            price: '',
            about: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            handleSubmitForm(values);
        },
    });

    return (
        <Modal open={open} onClose={() => setApp(!open)}>
            <Box sx={style}>
                <div className={css.titleWrapper}>
                    <Typography variant="subtitle" component="p">
                        Edit profile
                    </Typography>
                    <IconButton onClick={() => setApp(!open)} size="small">
                        <CloseIcon sx={{ width: '24px', height: '24px', color: 'text.black' }} />
                    </IconButton>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <ul className={css.inputList}>
                        <li>
                            <InputLabel variant="standard" color="primary" htmlFor="name">
                                Name
                            </InputLabel>
                            <TextField
                                fullWidth
                                id="username"
                                name="username"
                                type="text"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </li>
                        <li>
                            <InputLabel variant="standard" color="primary" htmlFor="gender">
                                Gender
                            </InputLabel>
                            <TextField
                                fullWidth
                                id="gender"
                                name="gender"
                                type="text"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                helperText={formik.touched.gender && formik.errors.gender}
                            />
                        </li>
                        <li>
                            <InputLabel variant="standard" color="primary" htmlFor="date">
                                Date of birth
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem id="date" name="date" components={['DatePicker']}>
                                    <DatePicker
                                        sx={{ width: '100%' }}
                                        value={formik.values.date}
                                        onChange={value => {
                                            formik.setFieldValue(handleDateChange(value));
                                        }}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </li>
                        <li>
                            <InputLabel variant="standard" color="primary" htmlFor="phone">
                                Phone number
                            </InputLabel>
                            <TextField
                                fullWidth
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </li>
                        <li>
                            <InputLabel variant="standard" color="primary" htmlFor="about">
                                About
                            </InputLabel>
                            <TextField
                                fullWidth
                                id="about"
                                name="about"
                                type="text"
                                multiline
                                rows={4}
                                placeholder="Enter your text"
                                value={formik.values.about}
                                onChange={formik.handleChange}
                                error={formik.touched.about && Boolean(formik.errors.about)}
                                helperText={formik.touched.about && formik.errors.about}
                            />
                        </li>
                        <li>
                            <InputLabel variant="standard" color="primary" htmlFor="price">
                                Price
                            </InputLabel>
                            <TextField
                                fullWidth
                                id="price"
                                name="price"
                                type="text"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />
                        </li>
                    </ul>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        sx={{ p: { md: '13px 32px' }, marginTop: '32px' }}
                    >
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default EditDoctorProfileModal;
