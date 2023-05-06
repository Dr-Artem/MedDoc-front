import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, InputLabel, Modal, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from 'redux/info/operation';
import css from './ModalEditDoctorSpecs.module.css';
const specializations = [
    'Cardiologist',
    'Dermatologist',
    'Endocrinologist',
    'Gastroenterologist',
    'Hematologist',
    'Neurologist',
    'Obstetrician',
    'Oncologist',
    'Ophthalmologist',
    'Orthopedist',
    'Otolaryngologist',
    'Pediatrician',
    'Psychiatrist',
    'Radiologist',
    'Urologist',
];
const categories = ['The First', 'The Second', 'Higher'];
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

export const ModalEditDoctorSpecs = ({ open, setOpen }) => {
    const [specialization, setSpecialization] = useState(null);
    const [category, setCategory] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = evt => {
        evt.preventDefault();
        const data = {
            specialization,
            category,
        };

        dispatch(updateUserInfo(data));

        setCategory(null);
        setSpecialization(null);
        setOpen(!open);
    };

    return (
        <Modal open={open} onClose={() => setOpen(!open)}>
            <Box sx={modalProperty}>
                <div className={css.titleWrapper}>
                    <Typography
                        variant="subtitle"
                        component="p"
                        color="text.black"
                        sx={{ fontSize: { md: '20px' }, lineHeight: { md: 1.5 } }}
                    >
                        Edit data
                    </Typography>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        <CloseIcon sx={{ width: '24px', height: '24px', color: 'text.black' }} />
                    </IconButton>
                </div>
                <form className={css.formWrapper} onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <InputLabel variant="standard" color="primary" sx={{ mb: '8px' }}>
                                Specialization
                            </InputLabel>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={specializations}
                                sx={{
                                    '& .MuiOutlinedInput-root .MuiAutocomplete-input': { padding: '0', height: '28px' },
                                    marginBottom: { sm: '14px', md: '16px' },
                                }}
                                value={specialization}
                                onChange={(evt, value) => setSpecialization(value)}
                                renderInput={params => <TextField {...params} />}
                            />
                        </li>
                        <li>
                            <InputLabel variant="standard" color="primary" sx={{ mb: '8px' }}>
                                Category
                            </InputLabel>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={categories}
                                sx={{
                                    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
                                        padding: '0',
                                        height: '28px',
                                    },
                                    marginBottom: { sm: '20px', md: '32px' },
                                }}
                                value={category}
                                onChange={(evt, value) => setCategory(value)}
                                renderInput={params => <TextField {...params} />}
                            />
                        </li>
                    </ul>

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        disableElevation
                        sx={{ p: { md: '13px 32px' } }}
                    >
                        save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
