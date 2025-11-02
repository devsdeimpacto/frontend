import React, { Children, cloneElement } from 'react';
import { Tab, Tabs, Box, Badge } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Components
import List from './List';

// Context
import { useCrudContext } from '~/views/partials/Crud';
import { useMemo } from 'react';

const Records = ({ children, injectComponent }) => {

    /**
     * Styles
     */
    const { spacing } = useTheme();

    /**
     * Hooks
     */
    const { tabs : { current, info }, setCrudData } = useCrudContext();

    //
    const onChangeTab = (_, index) => {

        setCrudData((old) => {

            return {
                ...old,
                tabs : {
                    ...old.tabs,
                    current : index
                },
                pagination : {
                    ...old.pagination,
                    page : 1
                },
            };
        });
    };

    const lists = useMemo(() => Children.map(children, (child) => {

        const tabsCount = Object.keys(info).length;

        return cloneElement(child, {
            ...child.props,
            label : child.props.label ? _.camelCase(child.props.label) : `tab${tabsCount > 0 ? (tabsCount - 1) : 0}`
        });
    }), [ info ]);

    return (
        <>
            <Box display="flex" alignItems="center">
                <Box display="flex" flexGrow="1">
                    <Tabs value={current} onChange={onChangeTab} indicatorColor="primary">
                        {
                            lists.map(({ props : { label } }, index) => (
                                <Tab key={label} sx={{ width: 150 }} label={(
                                    <Badge color="secondary" max={99999} badgeContent={info && current === index ? info[label]?.total : null}>
                                        { _.startCase(label) }
                                    </Badge>
                                )} />
                            ))
                        }
                    </Tabs>
                </Box>
                <Box>
                    { injectComponent }
                </Box>
            </Box>
            <Box mt={spacing()}>
                {
                    lists.map((child, index) => current === index && child)
                }
            </Box> 
        </>
    );
};

Records.propTypes = { 
    injectComponent : PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element
    ])
};

Records.List = List;

export default Records;