import React, { useCallback, useEffect, useMemo, useState, createContext, useContext } from 'react';
import { Box } from '@mui/material';
import { Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';

// Components
import Table from '@/views/components/Table';
import Pagination from '@/views/components/Pagination';

// Context
import { useCrudContext } from '~/views/partials/Crud';

// Hooks
import useFetch from '@/hooks/useFetch';

// Utils
import { queryParamsStringfy } from '@/utils/formatters';
import { getCookie, sanitizeObject } from '@/utils/helpers';

// Partials
import NoData from '@/views/partials/NoData';

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
    const { loading, records, setCheckList, tabLabel, props : { columns, checkable } } = useRecordListContext();
    const { tabs, setCrudData } = useCrudContext();

    //
    const onCheck = useCallback((list) => {
 
        setCheckList(list);
    }, []);
 
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

    return (
        <>
            <Table head={columns} body={records} checkable={checkable} onCheck={onCheck} skeleton={loading}>
                {
                    loading ? (
                        <Skeleton variant="text" width="100%" height='30px'/> 
                    ) : !records.length && <NoData color="primary" variant="h3" />
                }
            </Table>
            {
                tabs.info[tabLabel] && tabs.info[tabLabel]?.pages > 1 ? (
                    <Box mt={spacing(2)} display="flex" justifyContent="center">
                        <Pagination count={tabs.info[tabLabel]?.pages} page={tabs.info[tabLabel]?.current} color="primary" onChange={onPagination} disabled={loading} />
                    </Box>
                ) : null
            }
        </>
    );
};

export default List;