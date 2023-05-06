import { UilFileAlt, UilLink, UilTrashAlt } from '@iconscout/react-unicons';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Icon, IconButton, Input, InputLabel, Modal, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPDF } from 'redux/visits/operation';
import style from './ModalEditPatientResult.module.css';

export const ModalEditPatientResult = ({ open, setOpen }) => {
    const [file, setFile] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs);
    const dispatch = useDispatch();

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const handleFileDelete = () => {
        setFile(null);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('pdf', file);
        dispatch(uploadPDF({ id: '64536d7e0d6fb48460bca28c', formData: formData }));
        setFile(null);
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
    // console.log(`files123`, file);
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={modalProperty}>
                <div className={style.Modal_HeaderWrapper}>
                    <Typography
                        variant="subtitle"
                        component="p"
                        color="text.black"
                        sx={{ fontSize: { md: '20px' }, lineHeight: { md: 1.5 } }}
                    >
                        Edit data
                    </Typography>
                    <IconButton size="small" onClick={() => setOpen(false)}>
                        <CloseIcon sx={{ width: '24px', height: '24px', color: 'text.black' }} />
                    </IconButton>
                </div>
                <form className={style.Modal_Form} encType="multipart/form-data" onSubmit={handleSubmit}>
                    <ul className={style.Modal_FormList}>
                        <li className={style.Modal_FormItem}>
                            <InputLabel variant="standard" color="primary" sx={{ mb: '8px' }}>
                                Doctor
                            </InputLabel>
                            <Input
                                variant="primary"
                                color="primary"
                                disableUnderline
                                type="text"
                                id="doctor"
                                name="doctor"
                                className={style.Modal_FormInput}
                            />
                        </li>
                        <li className={style.Modal_FormItem}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoItem label="Date" components={['DatePicker']}>
                                    <DatePicker
                                        sx={{ width: '100%' }}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                </DemoItem>
                            </LocalizationProvider>
                        </li>
                        <li className={style.Modal_FormItem}>
                            <label htmlFor="fileInput" className={style.Modal_FormLabel}>
                                <UilLink style={{ width: '18px', height: '18px', transform: 'rotate(90deg)' }} />
                                Click here if you want to add your file
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                name="pdf"
                                onChange={handleFileChange}
                                className={style.Modal_FormUpload}
                            />
                        </li>
                    </ul>
                    <ul className={style.Modal_Form_UploadedFilesList} id="file-list">
                        {file && (
                            <li key={file.index} className={style.Modal_Form_UploadedFilesItem}>
                                <div className={style.Modal_Form_UploadedFilesSubItem}>
                                    <Icon sx={{ display: 'flex' }} color="primary">
                                        <UilFileAlt style={{ width: '20px', height: '20px' }} />
                                    </Icon>
                                    <span className={style.Modal_Form_UploadedFileName}>{file.name}</span>
                                </div>
                                <IconButton size="small" color="primary" onClick={() => handleFileDelete()}>
                                    <UilTrashAlt style={{ width: '20px', height: '20px' }} />
                                </IconButton>
                            </li>
                        )}
                    </ul>
                    <Button variant="contained" color="secondary" disableElevation type="submit">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};
