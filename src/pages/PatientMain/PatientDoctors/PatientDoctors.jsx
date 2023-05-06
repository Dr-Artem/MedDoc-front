import { Button } from '@mui/material';
import BasicSelect from 'components/BasicSelect/BasicSelect';
import { PagePagination } from 'components/PagePagination/PagePagination';
import { ProfileBlockDoctore } from 'components/ProfileBlockDoctore/ProfileBlockDoctore';
import UsersList from 'components/UsersList/UsersList';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsersForRole } from 'redux/info/operation';
import style from './PatientDoctors.module.css';

const sorting = ['Name', 'Rating', 'Price'];

export const PatientDoctors = () => {
    const [allDoctors, setAllDoctors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersForRole('Doctor')).then(({ payload }) => {
            setAllDoctors(payload);
        });
    }, [dispatch]);

    const sortDoctors = selectedValue => {
        switch (selectedValue) {
            case 'Name': {
                const filtered = allDoctors.slice().sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                setAllDoctors(filtered);
                break;
            }
            case 'Rating': {
                const filtered = allDoctors.slice().sort((a, b) => b.rating - a.rating);
                setAllDoctors(filtered);
                break;
            }
            case 'Price': {
                const filtered = allDoctors.slice().sort((a, b) => b.price - a.price);
                setAllDoctors(filtered);
                break;
            }
            default:
                console.log('');
        }
    };

    return (
        <>
            <div className={style.filter}>
                <div className={style.filterSelect}>
                    <BasicSelect
                        styles={{ minWidth: '180px' }}
                        title={'Sorting'}
                        filter={sorting}
                        sortDoctors={sortDoctors}
                        allDoctors={allDoctors}
                        setAllDoctors={setAllDoctors}
                    />
                </div>
            </div>
            <UsersList listOfUsers={allDoctors}>
                <ProfileBlockDoctore>
                    <Button variant="outlined" color="primary">
                        make an appointment
                    </Button>
                </ProfileBlockDoctore>
            </UsersList>
            <PagePagination />
        </>
    );
};
