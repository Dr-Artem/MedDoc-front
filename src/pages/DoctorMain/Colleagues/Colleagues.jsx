import { UilSearch } from '@iconscout/react-unicons';
import { IconButton, Input } from '@mui/material';
import BasicSelect from 'components/BasicSelect/BasicSelect';
// import { useEffect, useRef } from 'react';
import LinkViewProfile from 'components/LinkViewProfile/LinkViewProfile';
import { ProfileBlockDoctore } from 'components/ProfileBlockDoctore/ProfileBlockDoctore';
import UsersList from 'components/UsersList/UsersList';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { getAllUsersForRole } from 'redux/info/operation';
import css from './Colleagues.module.css';

const specializations = [
    'Show all',
    'Ophthalmologist',
    'Surgeon',
    'Therapist',
    'Neurologist',
    'Gynecologist',
    'Endocrinologist',
    'Psychiatrist',
    'Psychotherapist',
    'Otolaryngologist',
];
const categories = ['Show all', 'The first', 'The second', 'Higher'];
const DEBOUNCE_DELAY = 300;

const Colleagues = () => {
    const [allDoctors, setAllDoctors] = useState([]);
    const [filteredByName, setFilteredByName] = useState([]);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllUsersForRole('Doctor')).then(({ payload }) => {
            setAllDoctors(payload);
            setFilteredByName(payload);
        });
        // eslint-disable-next-line
    }, [dispatch]);

    const handleFilterName = e => {
        const inputValue = e.target.value.trim();
        const filtered = allDoctors.filter(doctor => doctor.name.startsWith(inputValue));
        setFilteredByName(filtered);
    };

    // const handleClick = event => {
    //     console.log(event.target.id);
    //     navigate(`/doctor/personal/${event.target.id}`, { replace: true });
    // };

    return (
        <>
            <div className={css.filter}>
                <div>
                    <Input
                        sx={{ minWidth: '270px' }}
                        variant="filter"
                        color="primary"
                        disableUnderline
                        type="text"
                        placeholder="Search"
                        onChange={debounce(handleFilterName, DEBOUNCE_DELAY)}
                        endAdornment={
                            <IconButton disableRipple sx={{ padding: '0px' }}>
                                <UilSearch />
                            </IconButton>
                        }
                    />
                </div>
                <div className={css.filterSelect}>
                    <BasicSelect styles={{ minWidth: '180px' }} title={'Specialization'} filter={specializations} />
                    <BasicSelect styles={{ minWidth: '150px' }} title={'Category'} filter={categories} />
                </div>
            </div>
            <UsersList listOfUsers={filteredByName}>
                <ProfileBlockDoctore>
                    <LinkViewProfile>view profile</LinkViewProfile>
                </ProfileBlockDoctore>
            </UsersList>
        </>
    );
};

export default Colleagues;
