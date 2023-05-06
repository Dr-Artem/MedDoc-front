import { cloneElement } from 'react';
import css from './UsersList.module.css';

const UsersList = ({ listOfUsers, children }) => {
    return (
        <ul className={css.cardsList}>
            {listOfUsers.map((userInfo, index) => (
                <li key={index}>{cloneElement(children, { userInfo })}</li>
            ))}
        </ul>
    );
};

export default UsersList;
