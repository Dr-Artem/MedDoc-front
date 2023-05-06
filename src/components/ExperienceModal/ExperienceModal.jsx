import CloseIcon from '@mui/icons-material/Close';
import { Box, Input } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectInstitution } from 'redux/info/selectors';
import { addUserExperience, getAllInstitution, updateUserExperience } from '../../redux/info/operation';
import css from './ExperienceModal.module.css';

const buttonStyle = {
    padding: { xs: '12px 24px', md: '13px 32px' },
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

const datePickerStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
    },
};

export const ExperienceModal = ({ open, setModalOpen, title, doctorInfo, id }) => {
    const [selectedStartDate, setSelectedStartDate] = useState(dayjs());
    const [selectedEndDate, setSelectedEndDate] = useState(dayjs());
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const institution = useSelector(selectInstitution);

    useEffect(() => {
        dispatch(getAllInstitution());
    }, [dispatch]);

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.value += '\n';
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (!selectedInstitution && !description) {
            alert('Institution is not selected!');
            return;
        }

        const addData = {
            institution: selectedInstitution.name,
            description: description,
            startDate: selectedStartDate.format('DD.MM.YYYY'),
            endDate: selectedEndDate.format('DD.MM.YYYY'),
            institutionLogo: selectedInstitution.image,
        };

        const updateData = {
            id,
            institution: selectedInstitution.name,
            description: description,
            startDate: selectedStartDate.format('DD.MM.YYYY'),
            endDate: selectedEndDate.format('DD.MM.YYYY'),
            institutionLogo: selectedInstitution.image,
        };

        title === 'Add experience'
            ? dispatch(addUserExperience(addData))
            : dispatch(updateUserExperience(updateData)).then(({ payload }) => console.log(payload));

        setSelectedStartDate(dayjs());
        setSelectedEndDate(dayjs());
        setSelectedInstitution(null);
        setDescription('');
        setModalOpen(!open);
    };

    return (
        <Modal open={open} onClose={() => setModalOpen()}>
            <Box sx={modalProperty}>
                <div className={css.titleWrapp}>
                    <p className={css.title}>{title}</p>
                    <IconButton
                        aria-label="close modal"
                        onClick={() => setModalOpen()}
                        sx={{ '&:hover, &:focus': { background: '#EDF5F5' } }}
                    >
                        <CloseIcon
                            sx={{
                                fill: 'black',
                                width: '24px',
                                height: '24px',
                            }}
                        />
                    </IconButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <ul className={css.formWrapp}>
                        <li className={css.inputWrapp}>
                            <p htmlFor="combo-box-demo" className={css.label}>
                                Institution
                            </p>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={institution ? institution : []}
                                value={selectedInstitution}
                                onChange={(event, value) => {
                                    setSelectedInstitution(value);
                                }}
                                sx={{ width: '100%' }}
                                getOptionLabel={option => option.name}
                                renderInput={params => (
                                    <TextField {...params} sx={inputStyles} placeholder="Enter your text" />
                                )}
                            />
                        </li>
                        <li className={css.inputWrapp}>
                            <p className={css.label}>Description</p>
                            <Input
                                variant="primary"
                                color="primary"
                                type="text"
                                value={description}
                                onChange={event => {
                                    setDescription(event.target.value);
                                }}
                                onKeyDown={handleKeyDown}
                                multiline
                                disableUnderline
                            />
                        </li>
                        <li className={css.inputWrapp}>
                            <p className={css.label}>Start date</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem components={['DatePicker']}>
                                    <DatePicker
                                        sx={{ width: '100%', ...datePickerStyles }}
                                        value={selectedStartDate}
                                        onChange={date => {
                                            setSelectedStartDate(date);
                                        }}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </li>
                        <li>
                            <p className={css.label}>End date</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem components={['DatePicker']}>
                                    <DatePicker
                                        sx={{ width: '100%', ...datePickerStyles }}
                                        value={selectedEndDate}
                                        onChange={date => {
                                            setSelectedEndDate(date);
                                        }}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </li>
                    </ul>

                    <Button variant="contained" color="secondary" type="submit" sx={buttonStyle} disableElevation>
                        save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
