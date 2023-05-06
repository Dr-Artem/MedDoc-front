import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

const defoltRate = 0;
const ratingStyles = { fontWeight: '600', fontSize: '16px', lineHeight: '1.5', marginRight: '8px' };

export const ControlledRating = ({ onSubmit, doctor }) => {
    const [value, setValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);

    const handleHover = (event, newValue) => {
        if (event.type === 'mouseleave') {
            setHoverValue(defoltRate.toFixed(1));
        } else {
            setHoverValue(newValue);
        }
    };

    const handleSubmit = (event, newValue) => {
        setValue(newValue);

        return onSubmit(newValue, doctor);
    };

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
            }}
        >
            <span style={ratingStyles}>{hoverValue || defoltRate.toFixed(1)}</span>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={handleSubmit}
                onChangeActive={handleHover}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
        </Box>
    );
};
