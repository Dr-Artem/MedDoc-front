import BasicSelect from 'components/BasicSelect/BasicSelect';
import { ProfileBlockPatient } from 'components/ProfileBlockPatient/ProfileBlockPatient';
import UsersList from 'components/UsersList/UsersList';
// import { useEffect, useRef } from 'react';
import LinkViewProfile from 'components/LinkViewProfile/LinkViewProfile';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsersForRole } from 'redux/info/operation';
import css from './ListOfPatients.module.css';

const ListOfPatients = () => {
    const [allPatients, setAllPatients] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const dispatch = useDispatch();

    const frequency = ['All', 'New', 'Permanent'];

    useEffect(() => {
        dispatch(getAllUsersForRole('Patient')).then(({ payload }) => {
            setAllPatients(payload);
            setFiltered(payload);
        });
        // eslint-disable-next-line
    }, [dispatch]);

    return (
        <>
            <div className={css.filter}>
                <BasicSelect title={'Patients'} filter={frequency} />
            </div>
            <UsersList listOfUsers={filtered || allPatients}>
                <ProfileBlockPatient>
                    <LinkViewProfile>view profile</LinkViewProfile>
                </ProfileBlockPatient>
            </UsersList>
        </>
    );
};

export default ListOfPatients;
