import { Box, Button, Divider, Grid, List, ListItem } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVisits } from 'redux/visits/operation';
import { selectAllVisits } from 'redux/visits/selectors';
import { PagePagination } from '../../../components/PagePagination/PagePagination';
import plug from '../../../images/ProfileBlock/plug.png';
import css from './VisitHistory.module.css';

const gridStyles = {
    marginLeft: '0',
    marginTop: '0',
    alignItems: { md: 'center' },
    '& .MuiGrid-item': {
        paddingLeft: '0',
        paddingTop: '0',
        marginLeft: '0',
        marginTop: '0',
    },
    '& > .MuiGrid-item': {
        paddingLeft: '0',
        paddingTop: '0',
        marginLeft: '0',
        marginTop: '0',
    },
    '& .visitInfo': {
        flex: '1',
    },
    '& .btnWrapp': {
        textAlign: { md: 'right' },
        marginRight: { md: '16px', lg: '8px' },
    },
};

const buttonStyle = {
    padding: { xs: '14px 28px', md: '16px 40px' },
    fontSize: { md: '14px' },
    lineHeight: { xs: '1.17', md: '1.4' },
};

const VisitHistory = () => {
    const dispatch = useDispatch();
    const visits = useSelector(selectAllVisits);
    const [page, setPage] = useState(1);
    const [allVisits, setAllVisits] = useState(null);
    useEffect(() => {
        dispatch(getAllVisits({ page, limit: 7 }));
    }, [dispatch, page]);

    useEffect(() => {
        async function fetchVisits() {
            const { data } = await axios.get(`/visits`);
            setAllVisits(data);
        }
        fetchVisits();
    }, []);

    const handlePageOnVisits = data => {
        setPage(data);
    };
    let numberOfPaginationButton = 8;
    if (allVisits) {
        numberOfPaginationButton = Math.round(allVisits.length / 7);
    }
    return (
        <section className={css.section}>
            <List
                sx={{
                    width: '100%',
                    bgcolor: '#FAFAFA',
                    padding: { xs: '32px 16px', lg: '32px' },
                    marginBottom: { xs: '20px', md: '32px' },
                }}
            >
                {visits.map(({ patient, date, _id }, index) => {
                    return (
                        <div key={_id}>
                            <ListItem sx={{ marginBottom: { xs: '20px', md: '16px' }, padding: '0px' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{ ...gridStyles, flexWrap: { xs: 'nowrap' }, alignItems: { md: 'center' } }}
                                    >
                                        <Grid item sx={{ ...gridStyles }}>
                                            <div className={css.imgWrapper}>
                                                <img src={plug} alt="plug" className={css.photo} />
                                            </div>
                                        </Grid>
                                        <Grid item xs={11} sx={gridStyles}>
                                            <Grid container spacing={3} sx={{ ...gridStyles, width: { md: '100%' } }}>
                                                <Grid item xs={12} md={3} lg={6} sx={gridStyles}>
                                                    <div>
                                                        <span className={css.lable}>Name</span>
                                                        <p className={css.patientName}>{patient.name}</p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={5} lg={3} sx={{ ...gridStyles }}>
                                                    <div className={`${css.visitInfo} visitInfo`}>
                                                        <div className={css.infoWrapp}>
                                                            <span className={css.lable}>Last visit</span>
                                                            <p className={css.visitDate}>
                                                                {moment(date).format('MMMM DD/MM/YYYY')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={4} lg={3} sx={gridStyles}>
                                                    <div className={`${css.btnWrapp} btnWrapp`}>
                                                        <Button variant="outlined" sx={buttonStyle}>
                                                            view profile
                                                        </Button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </ListItem>
                            <Divider
                                sx={{
                                    width: '100%',
                                    marginBottom: index !== visits.length - 1 ? '32px' : '0px',
                                    borderBottom: '1px solid rgba(17, 17, 17, 0.1)',
                                }}
                            />
                        </div>
                    );
                })}
            </List>
            <PagePagination
                numberOfBtnsOnVisitsHistory={numberOfPaginationButton}
                handlePageOnVisits={handlePageOnVisits}
            />
        </section>
    );
};

export default VisitHistory;
