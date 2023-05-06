import { useDispatch } from 'react-redux';
import { UilBrightnessPlus } from '@iconscout/react-unicons';
import { IconButton } from '@mui/material';
import plug from '../../images/ProfileBlock/plug.png';
import css from './ProfileImage.module.css';
import { updateAvatar } from 'redux/info/operation';
const ProfileImage = ({ personalLoc }) => {
    const dispatch = useDispatch();

    const handleFileChange = evt => {
        const formData = new FormData();
        formData.append('image', evt.target.files[0]);
        dispatch(updateAvatar(formData));
    };
    const onSubmit = evt => {
        evt.preventDefault();
    };

    return (
        <div style={{ position: 'relative' }}>
            <div className={css.imgWrapper}>
                <img src={plug} alt="plug" />
                {personalLoc && (
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <IconButton
                            component="label"
                            htmlFor="file-input"
                            color="primary"
                            size="small"
                            disableRipple
                            sx={{ position: 'absolute', bottom: '-10px', right: '10px' }}
                        >
                            <UilBrightnessPlus style={{ width: '34px', height: '34px' }} />
                            <input
                                onChange={handleFileChange}
                                id="file-input"
                                type="file"
                                name="image"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: 'none' }}
                            />
                        </IconButton>
                    </form>
                )}
            </div>
        </div>
    );
};
export default ProfileImage;