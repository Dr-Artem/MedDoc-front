import { IconButton } from '@mui/material';
import { ModalEditDoctorSpecs } from 'components/ModalEditDoctorSpecs/ModalEditDoctorSpecs';
import { useState } from 'react';
import { RxPencil1 } from 'react-icons/rx';
import css from './SpecializationBlock.module.css';

export const SpecializationBlock = ({ specialization, category }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={css.specializationBlock}>
            <ul className={css.specializationList}>
                <li className={css.specializationItem}>
                    Specialization:<span className={css.specializationText}>{specialization}</span>
                </li>
                <li className={css.specializationItem}>
                    Category:
                    <span className={css.specializationText}>{category}</span>
                </li>
            </ul>
            <IconButton onClick={() => setOpen(!open)} sx={{ position: 'absolute', top: '16px', right: '16px' }}>
                <RxPencil1 style={{ color: '#477577' }} />
            </IconButton>
            <ModalEditDoctorSpecs open={open} setOpen={setOpen} />
        </div>
    );
};
