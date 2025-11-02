import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';

// Components
import Pagination from '@/views/components/Pagination';

// Context
import { useCrudContext } from '~/views/partials/Crud';

// Hooks
import useFetch from '@/hooks/useFetch';
import useModal from '@/hooks/useModal';

// Utils
import { queryParamsStringfy } from '@/utils/formatters';
import { getCookie, sanitizeObject } from '@/utils/helpers';

// Partials
import NoData from '@/views/partials/NoData';
import { VisibilityOutlined } from '@mui/icons-material';
import EmblaCarousel from '~/components/CarrosselPaginado/EmblaCarousel';
import { NavLink } from 'react-router-dom';
import { useRoute } from 'react-router-mapping';

const propTypes = {
    path : PropTypes.string,
    label : PropTypes.string,
    params : PropTypes.object,
    beforeOnRender : PropTypes.func,
};

const defaultProps = {
    path : '',
    checkable  : true,
    params : {}
};

const RecordListContext = createContext({});

export const useRecordListContext = () => useContext(RecordListContext);

const RecordListProvider = ({ children, ...props }) => {

    const { path, params, label, beforeOnRender } = props;

    /**
     * Hooks
     */
    const { api, tabs, filter, pagination, forceUpdate, setCrudData } = useCrudContext();

    const [ records, setRecords ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ checkList, setCheckList ] = useState([]);

    const [ request, { abort: crudAbort, headers: crudHeaders } ] = useFetch(api);

    const tabLabel = useMemo(() => {

        const tabsCount = Object.keys(tabs.info).length;

        return label ? _.camelCase(label) : `tab${tabsCount > 0 ? (tabsCount - 1) : 0}`;
    }, [ tabs ]);

    //
    const getData = async () => {

        if (!loading) {

            setLoading(true);
        }

        setCheckList([]);

        let queryParams = {
            page: pagination?.page
        };

        if (params && Object.keys(params).length) {
            queryParams = { ...queryParams, ...params };
        }

        if (filter && Object.keys(filter).length) {
            queryParams = { ...queryParams, ...filter };
        }

        try {

            let list = [];
            
            const response = await request(`${path}${Object.keys(queryParams).length ? `?${queryParamsStringfy(sanitizeObject(queryParams))}` : '' }`, {
                timeout : 30000,
                method: 'GET',
                headers : {
                    ...crudHeaders(),
                    'Authorization'	: `Bearer ${getCookie('access_token')}`,
                    'X-Pagination-Cursor' : pagination?.cursor ? pagination.cursor : '',
                },
                //body: JSON.stringify({})
            });

            const data = await response.json();

            list = data || [];

            if (data && beforeOnRender) {

                list = await beforeOnRender(data);
            }

            setRecords(list);

            setCrudData((old) => {

                old.tabs.info[tabLabel] = {
                    ...old.info,
                    label   : _.startCase(tabLabel),
                    count   : list.length,
                    pages   : data.pages,
                    total   : data.total,
                    current : data.page,
                    cursor  : response.headers.get('X-Pagination-Cursor') ? response.headers.get('X-Pagination-Cursor') : ''
                };

                return { ...old };
            });

            window.scroll({
                top: 0,
                behavior : 'smooth'
            });
        } catch (error) {

            console.warn(error);
        }

        setLoading(false);
    };

    useEffect(() => {

        getData();

        return () => crudAbort();
    }, [ forceUpdate, filter, api ]);

    return (
        <RecordListContext.Provider value={{ loading, records, checkList, setCheckList, tabLabel, props }}>
            { children }
        </RecordListContext.Provider>
    );
};

RecordListProvider.propTypes = { 
    ...propTypes,
    columns : PropTypes.array.isRequired,
    checkable : PropTypes.bool,
    system: PropTypes.string
};

RecordListProvider.defaultProps = { 
    ...defaultProps,
    defaultProps 
};

const List = ({ children, path, params, label, beforeOnRender, columns, checkable, system }) => {

    const props = {
        path, 
        params, 
        label, 
        beforeOnRender, 
        columns, 
        checkable,
        system
    };

    return (
        <RecordListProvider {...props}>
            <TableList />
            { children }
        </RecordListProvider>
    );
};

List.propTypes = { 
    ...propTypes,
    columns : PropTypes.array.isRequired,
    checkable : PropTypes.bool,
    system: PropTypes.string
};

List.defaultProps = { 
    ...defaultProps,
    defaultProps 
};

const TableList = () => {

    /**
     * Styles
     */
    const { spacing } = useTheme();

    /**
     * Hooks
     */
    const { route } = useRoute();
    const { loading, records, tabLabel } = useRecordListContext();
    const { tabs, setCrudData } = useCrudContext();
    const [ Modal, toggle ] = useModal();

    const [ pages, setPages ] = useState([]);
 
    //
    const onPagination = (_, page) => {
         
        setCrudData((old) => ({
            ...old,
            pagination : {
                ...old.pagination,
                page,
                cursor: old.tabs.info[tabLabel]?.cursor || '',
            },
            forceUpdate : !old.forceUpdate
        }));
    };

    //
    const onPages = (pages) => {
        setPages(pages);
        toggle();
    };

    return (
        <>  
            {
                loading ? ( 
                    <Skeleton variant="text" width="100%" height='240px'/>  
                )
                    : !records.length ? 
                        <NoData color="primary" variant="h3" />
                        :  
                        <Grid container spacing={spacing(2)} mt={spacing(4)}>
                            { records.map((record) => (
                                <Grid item xs={12} sm={6} md={4} key={record.id}>
                                    <Card sx={{ position: 'relative', height: 240, color: '#fff', overflow: 'hidden' }}>
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundImage: `url(${record?.pages[0]})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                zIndex: 0,
                                                '&::after': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'linear-gradient(to top, rgba(0,0,0,1), transparent)',
                                                },
                                            }}
                                        />
                                        <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                            <Typography color='white' variant="h6" mb={spacing(2)}>
                                                { record?.nome }
                                            </Typography>
                                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                                <Button variant="contained" color="secondary" component={NavLink} to={route('documentoCreate', { templateId : record.id })}>
                                                    Usar
                                                </Button>
                                                <IconButton sx={{ color: '#fff' }} onClick={() => onPages(record?.pages)}>
                                                    <VisibilityOutlined />
                                                </IconButton>
                                            </CardActions>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )) }
                        </Grid>
            }
            {
                tabs.info[tabLabel] && tabs.info[tabLabel]?.pages > 1 ? (
                    <Box mt={spacing(2)} display="flex" justifyContent="center">
                        <Pagination count={tabs.info[tabLabel]?.pages} page={tabs.info[tabLabel]?.current} color="primary" onChange={onPagination} disabled={loading} />
                    </Box>
                ) : null
            }
            <Modal>
                <Grid container>
                    <Grid item sm={12}>
                        <EmblaCarousel slides={pages} options={{}} />
                    </Grid>
                </Grid>
            </Modal>
        </>
    );
};

export default List;