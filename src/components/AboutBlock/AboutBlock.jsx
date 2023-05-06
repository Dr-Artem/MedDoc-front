import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import css from './AboutBlock.module.css';

export const AboutBlock = ({ about }) => {
    const [isVisitsVisible, setIsVisitsVisible] = useState(true);

    const handleArrowClick = () => {
        setIsVisitsVisible(!isVisitsVisible);
    };

    return (
        <div className={css.aboutBlock}>
            <div className={css.aboutBlockHeadWrapper}>
                <h2 className={css.aboutTitle}>About </h2>
                <div className={css.aboutArrowIcon}>
                    {!isVisitsVisible && (
                        <IconButton onClick={handleArrowClick}>
                            <KeyboardArrowDownIcon sx={{ color: '#111111', fontSize: '28px' }} />
                        </IconButton>
                    )}
                    {isVisitsVisible && (
                        <IconButton onClick={handleArrowClick}>
                            <KeyboardArrowUpIcon sx={{ color: '#111111', fontSize: '28px' }} />
                        </IconButton>
                    )}
                </div>
            </div>

            <div className={css.aboutWrapper}>
                {isVisitsVisible && (
                    <>
                        <svg
                            className={css.aboutDot}
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="4" cy="4" r="4" fill="#477577" />
                        </svg>

                        <p className={css.aboutText}>{about}</p>
                    </>
                )}
            </div>
        </div>
    );
};
