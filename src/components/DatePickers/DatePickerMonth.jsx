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

export const DatePickerMonth = () => {
    const [selectedMonth, setSelectedMonth] = useState(dayjs(Date.now()).startOf('month'));

    const handleMonthChange = newDate => {
        setSelectedMonth(dayjs(newDate).startOf('month'));
    };

    const onBackClick = () => {
        const newMonth = dayjs(selectedMonth).subtract(1, 'M');
        setSelectedMonth(newMonth);
    };

    const onForwardClick = () => {
        const newMonth = dayjs(selectedMonth).add(1, 'M');
        setSelectedMonth(newMonth);
    };

    return (
        <div className={css.wrapp}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    key={selectedMonth.format('YYYY-MM')}
                    value={selectedMonth}
                    views={['year', 'month']}
                    minDate={dayjs('2015-01-01')}
                    maxDate={dayjs('2099-12-31')}
                    onChange={handleMonthChange}
                    format={`MMM D- ${dayjs(selectedMonth).endOf('month').format('D/MM/YYYY')}`}
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
