import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Divider, IconButton } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import css from './DatePickers.module.css';

const iconButtonStyles = {
    color: '#477577',
    '&:hover, &:focus': {
        color: '#f3672b',
        backgroundColor: 'transparent',
    },
};

export const DatePickers = ({ onDateSelected }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));

    const handleDateChange = newDate => {
        setSelectedDate(newDate);

        const formattedDate = newDate.format('DD.MM.YYYY');
        onDateSelected(formattedDate);
    };

    const onBackClick = () => {
        const newDate = dayjs(selectedDate).subtract(1, 'day');
        setSelectedDate(newDate);

        const formattedDate = newDate.format('DD.MM.YYYY');
        onDateSelected(formattedDate);
    };

    const onForwardClick = () => {
        const newDate = dayjs(selectedDate).add(1, 'day');
        setSelectedDate(newDate);

        const formattedDate = newDate.format('DD.MM.YYYY');
        onDateSelected(formattedDate);
    };
    return (
        <div className={css.wrapp}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="MMM - DD/MM/YYYY"
                    sx={{
                        border: '1px solid rgba(71, 117, 119, 0.3)',
                        borderRadius: '10000px',
                        marginRight: '8px',
                        padding: '6px 16px',
                        color: '#111111',
                        cursor: 'pointer',

                        '&:hover, &:focus': {
                            borderColor: '#477577',
                            outline: 'none',
                        },
                        '.MuiInputBase-root': {
                            padding: ' 0px',
                            outline: 'none',
                            '&:hover, &:focus': {
                                outline: 'none',
                                border: 'none',
                            },
                            '&.Mui-focused': {
                                outline: 'none',
                            },
                            '& .MuiInputBase-input': {
                                fontWeight: '600',
                                fontSize: '14px',
                                lineHeight: '1.29',
                                textAlign: 'center',
                                border: 'none',
                                '&:hover, &:focus': {
                                    cursor: 'pointer',
                                    outline: 'none',
                                    border: 'none',
                                },
                            },
                            '& .MuiInputAdornment-root': {
                                display: 'none',
                            },
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                            display: 'none',
                        },
                        outline: 'none',
                    }}
                />
            </LocalizationProvider>
            <div className={css.btnGrup}>
                <IconButton onClick={onBackClick} sx={iconButtonStyles}>
                    <ArrowBackIosNewIcon
                        sx={{
                            width: '14px',
                            height: '15px',
                        }}
                    />
                </IconButton>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        border: '1px solid rgba(220, 227, 229, 0.5)',
                    }}
                />
                <IconButton onClick={onForwardClick} sx={iconButtonStyles}>
                    <ArrowForwardIosIcon
                        sx={{
                            width: '14px',
                            height: '15px',
                        }}
                    />
                </IconButton>
            </div>
        </div>
    );
};
