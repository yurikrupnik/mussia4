import React, { useCallback } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";

const styles = (theme) => ({
    flexContainer: {
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        "& .ReactVirtualized__Table__headerRow": {
            flip: false,
            paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
        },
    },
    tableRow: {
        cursor: "pointer",
    },
    tableRowHover: {
        "&:hover": {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: "initial",
    },
});

const MuiVirtualizedTableFunc = (props) => {
    const getRowClassName = useCallback((p) => {
        const { classes, onRowClick } = props;
        // return "";
        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    }, []);
};

class MuiVirtualizedTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.cellRenderer = this.cellRenderer.bind(this);
        this.getRowClassName = this.getRowClassName.bind(this);
        this.headerRenderer = this.headerRenderer.bind(this);
    }

    // static defaultProps = {
    //     headerHeight: 48,
    //     rowHeight: 48,
    // };

    getRowClassName({ index }) {
        // console.log("index", index);
        const { classes, onRowClick } = this.props;
        // return "";
        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    }

    cellRenderer({ cellData, columnIndex }) {
        // console.log("cellData", cellData);
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? "right" : "left"}
            >
                {cellData}
            </TableCell>
        );
    }

    headerRenderer({ label, columnIndex }) {
        const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? "right" : "left"}
            >
                <span>{label}</span>
            </TableCell>
        );
    }

    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        console.log("this.props", this.props);
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        // rowCount={10}
                        // checkboxSelection
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: "inherit",
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            console.log("dataKey", dataKey);
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}
MuiVirtualizedTable.defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
};
// MuiVirtualizedTable.propTypes = {
//     classes: PropTypes.object.isRequired,
//     columns: PropTypes.arrayOf(
//         PropTypes.shape({
//             dataKey: PropTypes.string.isRequired,
//             label: PropTypes.string.isRequired,
//             numeric: PropTypes.bool,
//             width: PropTypes.number.isRequired,
//         })
//     ).isRequired,
//     headerHeight: PropTypes.number,
//     onRowClick: PropTypes.func,
//     rowHeight: PropTypes.number,
// };

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const sample = [
    ["Frozen yoghurt", 159, 6.0, 24, 4.0],
    ["Ice cream sandwich", 237, 9.0, 37, 4.3],
    ["Eclair", 262, 16.0, 24, 6.0],
    ["Cupcake", 305, 3.7, 67, 4.3],
    ["Gingerbread", 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
    return { id, dessert, calories, fat, carbs, protein };
}

// const rows = [];
//
// for (let i = 0; i < 200; i += 1) {
//     const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//     rows.push(createData(i, ...randomSelection));
// }

export default function ReactVirtualizedTable(props) {
    const { rows } = props;
    return (
        <Paper style={{ height: 600, width: "100%" }}>
            <VirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                columns={[
                    {
                        width: 200,
                        label: "Name",
                        dataKey: "name",
                    },
                    {
                        width: 120,
                        label: "Type",
                        dataKey: "type",
                    },
                    {
                        width: 120,
                        label: "Start Date",
                        dataKey: "startDate",
                    },
                    {
                        width: 120,
                        label: "End Data",
                        dataKey: "endDate",
                    },
                    {
                        width: 120,
                        label: "Actions",
                        // dataKey: "protein",
                    },
                ]}
            />
        </Paper>
    );
}
