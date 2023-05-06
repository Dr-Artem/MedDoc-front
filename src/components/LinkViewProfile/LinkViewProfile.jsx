import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LinkViewProfile = ({ children, id }) => {
    return (
        <Link to={`${id}`}>
            <Button variant="outlined" color="primary">
                {children}
            </Button>
        </Link>
    );
};

export default LinkViewProfile;
