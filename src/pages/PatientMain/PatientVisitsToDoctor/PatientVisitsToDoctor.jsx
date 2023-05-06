import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import { DatePickerMonth } from 'components/DatePickers/DatePickerMonth';
import { ModalEditRating } from 'components/ModalEditRating/ModalEditRating';
import { useState } from 'react';
import { DoctorInfoCard } from '../../../components/DoctorInfoCard/DoctorInfoCard';
import plug from '../../../images/ProfileBlock/plug.png';
import css from './PatientVisitsToDoctor.module.css';

const currentAppointments = [
    {
        doctor: 'Shumeiko Timur Bohdanovich',
        specialization: 'Surgeon',
        date: 'March 8/03/2023',
        time: '10:00 - 11:30',
        rating: null,
    },
    {
        doctor: 'Petrova Olena Sergeyevna',
        specialization: 'Traumatologist',
        date: 'March 14/03/2023',
        time: '14:00 - 15:30',
        rating: null,
    },
    {
        doctor: 'Vergulenko Alla Olehivna',
        specialization: 'Gynecologist',
        date: 'March 20/03/2023',
        time: '12:00 - 13:00',
        rating: null,
    },
    {
        doctor: 'Aksyonov Pavlo Valeriyovych',
        specialization: 'Ophtalmologist',
        date: 'March 29/03/2023',
        time: '16:00 - 16:30',
        rating: null,
    },
];

export const PatientVisitsToDoctor = () => {
    const [selectedDoctorData, setSelectedDoctorData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = doctorData => {
        setSelectedDoctorData(doctorData);
        setIsOpen(true);
    };

    const closeModal = (value, doctor) => {
        setSelectedDoctorData(null);
        const currentDoc = currentAppointments.find(appointment => appointment.doctor === doctor);
        if (currentDoc) {
            currentDoc.rating = value;
        }
        setIsOpen(false);
    };

    return (
        <section className="section">
            <Typography
                variant="subtitle"
                color="text.black"
                sx={{ fontSize: { md: '20px' }, lineHeight: { md: 1.5 } }}
            >
                Visits
            </Typography>
            <DatePickerMonth />
            <ul className={css.visitsList}>
                {currentAppointments.map(({ doctor, specialization, date, time, rating }) => {
                    const doctorData = {
                        name: doctor,
                        line: specialization,
                        visitDate: date,
                        visitTime: time,
                        rating,
                    };
                    return (
                        <li className={css.visitsItem} key={`${doctor}-${date}`}>
                            <div className={css.doctorDetails}>
                                <DoctorInfoCard doctorData={doctorData} plug={plug} />
                                <div className={css.rating} onClick={() => openModal(doctorData)}>
                                    <Rating
                                        name="read-only"
                                        value={rating}
                                        readOnly
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                </div>
                            </div>
                            <div className={css.visitInfo}>
                                <p className={css.visitTitle}>Date of admission</p>
                                <span className={css.visitDate}>{date}</span>
                                <span className={css.visitDate}>{time}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {selectedDoctorData && (
                <ModalEditRating isOpen={isOpen} doctorData={selectedDoctorData} onClose={closeModal} plug={plug} />
            )}
        </section>
    );
};
