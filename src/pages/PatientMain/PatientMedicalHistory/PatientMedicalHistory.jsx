import AnalysisBlock from 'components/AnalysisBlock/AnalysisBlock';
import { ProfileBlockPatient } from 'components/ProfileBlockPatient/ProfileBlockPatient';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from 'redux/info/operation';
import { selectUserInfo } from 'redux/info/selectors';

export const PatientMedicalHistory = () => {
    const dispatch = useDispatch();
    const patientInfo = useSelector(selectUserInfo);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);
    return (
        <>
            {patientInfo && (
                <>
                    <ProfileBlockPatient userInfo={patientInfo} />
                    <div>
                        <AnalysisBlock />
                    </div>
                </>
            )}
        </>
    );
};
