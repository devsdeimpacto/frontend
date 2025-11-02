import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Context
const CrudContext = createContext({});

// Hooks
export const useCrudContext = () => useContext(CrudContext);

// Provider
const CrudProvider = ({ children, ...rest }) => {

    const [ crudData, setCrudData ] = useState({
        tabs : {
            current : 0,
            info : {}
        },
        filter : {},
        pagination  : {
            skip            : 1,
            pageSize        : 10,
            sortKey         : 'created_at',
            sortDirection   : 'desc'
        },
        loading : true,
        forceUpdate : false
    });

    return (
        <CrudContext.Provider value={{ setCrudData, ...rest, ...crudData }}>
            { children }
        </CrudContext.Provider>
    );
};

const Crud = ({ children, api }) => {

    return (
        <CrudProvider {...{ api }}>
            { children }
        </CrudProvider>
    );
};

Crud.propTypes = {
    api : PropTypes.string.isRequired
};

export default Crud;