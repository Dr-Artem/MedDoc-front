import AuthNav from 'components/AuthNav/AuthNav';
import InformationBlock from 'components/InformationBlock/InformationBlock';
import Logo from 'components/Logo/Logo';
import { useAuth } from 'hooks';
import { useLocation } from 'react-router-dom';
import s from '../Header/Header.module.css';

const Header = () => {
    const patientLoc = useLocation().pathname.startsWith('/patient');
    const doctortLoc = useLocation().pathname.startsWith('/doctor');

    const { user } = useAuth();

    const defaultHero = {
        name: 'MedDoc is a revolutionary web service ',
        text: 'Designed to streamline the process of connecting doctors and patients. With MedDoc, finding a doctor or medical professional is easier than ever before.',
        imageUrl: 'https://res.cloudinary.com/dmaywrdz0/image/upload/v1682867929/DNA-desctop_kbr6xd.png',
    };

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <Logo />
                <AuthNav user={user} />
            </div>
            {patientLoc || (doctortLoc && user) ? (
                <InformationBlock
                    name={user.username}
                    imageUrl={
                        patientLoc
                            ? 'https://res.cloudinary.com/dmaywrdz0/image/upload/v1682863343/Patient-medcart_pbz51a.png'
                            : 'https://res.cloudinary.com/dmaywrdz0/image/upload/v1682863503/Doctor-stetoscope_ee2igt.png'
                    }
                />
            ) : (
                <InformationBlock defaultHero={defaultHero} />
            )}
        </div>
    );
};

export default Header;
