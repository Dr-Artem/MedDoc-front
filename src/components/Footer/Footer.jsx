import React, { useState } from 'react';
import css from './Footer.module.css';
import IconButton from '@mui/material/IconButton';
import { UilInstagram } from '@iconscout/react-unicons';
import { UilFacebookF } from '@iconscout/react-unicons';
import { AiOutlineYoutube } from 'react-icons/ai';
import { useAuth } from 'hooks';
import { ModalMakeAppointment } from 'components/ModalMakeAppointment/ModalMakeAppointment';
import { useNavigate } from 'react-router-dom';
import Logo from 'components/Logo/Logo';
import logo_desk from '../../images/logo/logo_footer_desk.png';
import logo_mobile from '../../images/logo/logo_footer_mobile.png';

const iconButtonStyles = {
    width: { xs: '40px', md: '56px' },
    height: { xs: '40px', md: '56px' },
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: { xs: '6px', md: '12px' },
    '&:hover, &:focus, &:active, &:disabled': {
        backgroundColor: '#477577',
        boxShadow: 'none',
    },
    '& .MuiIconButton-label': {
        transition: 'none',
    },
};

export const Footer = () => {
    const [modalAppointment, setModalAppointment] = useState(false);

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        isLoggedIn ? setModalAppointment(!modalAppointment) : navigate('/auth/login');
    };

    const goToFacebook = () => {
        window.open('https://uk-ua.facebook.com/', '_blank');
    };

    const goToYoutube = () => {
        window.open('https://www.youtube.com/', '_blank');
    };

    const goToInstagram = () => {
        window.open('https://www.instagram.com/', '_blank');
    };
    return (
        <div className={css.section}>
            <div className={css.box}>
                <div className={css.container}>
                    <div className={css.firstpart}>
                        <div className={css.logo}>
                            <Logo footer_desc={logo_desk} footer_mob={logo_mobile} />
                        </div>
                        <p className={css.title}>Choose a doctor and make an appointment at a convenient time</p>
                        <button type="button" onClick={handleClick} className={css.btn}>
                            make an appointment
                        </button>
                    </div>

                    <div className={css.secondpart}>
                        <ul className={css.iconlist}>
                            <li className={css.listitem}>
                                <IconButton
                                    aria-label="delete"
                                    sx={iconButtonStyles}
                                    disableTouchRipple={true}
                                    onClick={goToFacebook}
                                >
                                    <UilFacebookF className={css.iconStyles} />
                                </IconButton>
                            </li>

                            <li className={css.listitem}>
                                <IconButton
                                    aria-label="delete"
                                    sx={iconButtonStyles}
                                    disableTouchRipple={true}
                                    onClick={goToYoutube}
                                >
                                    <AiOutlineYoutube className={css.iconStyles} />
                                </IconButton>
                            </li>

                            <li className={css.listitem}>
                                <IconButton
                                    aria-label="delete"
                                    sx={iconButtonStyles}
                                    disableTouchRipple={true}
                                    onClick={goToInstagram}
                                >
                                    <UilInstagram className={css.iconStyles} />
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={css.footerbottom}>
                <p className={css.footerdesc}>
                    © Meddoc, 2022 The use of materials is allowed only if there is an active link to the source
                </p>
            </div>
            <ModalMakeAppointment open={modalAppointment} setApp={setModalAppointment} />
        </div>
    );
};

export default Footer;
