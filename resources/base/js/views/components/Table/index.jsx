import React, { useMemo, useState, useCallback, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import { Table, TableBody, TableHead } from '@mui/material';

// Utils
import { reduceObject } from '@/utils/helpers';

// Style
import useStyle from './style';
  
const TableBase = memo(({ children, head, body, checkable, onCheck, ...rest }) => {

    /**
     * Styles
     */
    const classes = useStyle();

    rest.className = [
        rest.className,
        classes.table
    ].join(' ').trim();

    /**
     * Hooks
     */
    const [ tbody, setTbody ] = useState(body);

    const checkedItems = useMemo(() => tbody.filter((item) => (item.checkable === undefined || item.checkable) && item.checked), [ tbody ]);
    const checkableItems = useMemo(() => tbody.filter((item) => (item.checkable === undefined || item.checkable)), [ tbody ]);
 
    //
    const getData = () => {
 
        if (body.length || (!body.length && tbody.length)) {

            setTbody(body);
        }
    };
 
    //
    const onCheckAllItems = (e) => {
 
        const { currentTarget } = e;
 
        setTbody((old) => {
 
            old.map((item) => {
 
                item.checked = currentTarget.checked;
     
                return item;
            });
 
            return [ ...old ];
        });
 
        onCheckCallback();
    };
 
    //
    const onCheckItem = useCallback((e) => {
 
        const { currentTarget } = e;
 
        setTbody((old) => {
             
            old[currentTarget.dataset.index].checked = currentTarget.checked;
 
            return [ ...old ];
        });
 
        onCheckCallback();
    }, [ tbody ]);
 
    //
    const onCheckCallback = () => {
 
        if (typeof onCheck === 'function') {
 
            onCheck(tbody.filter((item) => (item.checkable === undefined || item.checkable) && item.checked));
        }
    };
 
    useEffect(() => {

        getData();
    }, [ body ]);

    return (
        <Table {...rest} data-testid="table">
            <TableHead className={classes.thead} data-testid="table-head">
                <tr>
                    {
                        checkable ? (
                            <th>
                                <Checkbox 
                                    className={classes.checkboxTHead} 
                                    size="small" 
                                    checked={tbody.length > 0 && checkedItems.length === checkableItems.length}
                                    indeterminate={checkedItems.length > 0 && checkedItems.length !== checkableItems.length}
                                    onChange={onCheckAllItems}
                                    data-testid="table-check-all"
                                />
                            </th>
                        ) : null
                    }
                    {
                        head.map((item, index) => (
                            <th key={index} className={`${item.name}`}>
                                { item.label }
                            </th>
                        ))
                    }
                </tr>
            </TableHead>
            <TableBody className={classes.tbody} data-testid="table-body">
                {
                    (children && !tbody.length) ? (
                        <tr>
                            <td colSpan="100%" className="text-center">
                                { children }
                            </td>
                        </tr>
                    ) : tbody.map((row, index) => <TableRow key={index} {...{ row, index, head, checkable, onCheckItem }} />)
                }
            </TableBody>
        </Table>
    );
});

TableBase.propTypes = {
    /**
	 * Recebe um array com a label de cada item do cabeçalho
	 */
    head : PropTypes.arrayOf(
        PropTypes.shape({
            label : PropTypes.string,
            name : PropTypes.string.isRequired
        })
    ).isRequired,
    /**
	 * Recebe um array de objetos referente 
	 */
    body : PropTypes.arrayOf(
        PropTypes.shape({
            checkable : PropTypes.bool
        })
    ).isRequired,
    /**
     * Define se a tabela permitirá seleção dos items
     */
    checkable : PropTypes.bool,
    /**
     * Recebe um callback que dispara sempre que um ou mais itens são marcados
     */
    onCheck : PropTypes.func
};

TableBase.defaultProps = {
    head        : [],
    body        : [],
    checkable   : false
};

TableBase.displayName = 'TableBase';

const TableRow = memo(({ row, index, head, checkable, onCheckItem }) => {

    /**
     * Styles
     */
    const classes = useStyle();

    return (
        <tr key={index}>
            {
                ((row.checkable === undefined || row.checkable) && checkable) ? (
                    <td>
                        <Checkbox 
                            className={classes.checkboxTBody} 
                            color="primary" 
                            size="small" 
                            inputProps={{
                                'data-index' : index
                            }}
                            checked={row.checked || false}
                            onChange={onCheckItem}
                        />
                    </td>
                ) : null
            }
            {
                head.map(({ name }, key) => (
                    <td key={key} className={name} colSpan={key === 0 && (!row.checkable && row.checkable !== undefined) ? 2 : 1}>
                        { reduceObject(name, row) }
                    </td>
                ))
            }
        </tr>
    );
});

TableRow.propTypes = {
    row         : PropTypes.object,
    index       : PropTypes.number,
    head        : PropTypes.array,
    checkable   : PropTypes.bool,
    onCheckItem : PropTypes.func,
};

TableRow.displayName = 'TableRow';

export default TableBase;