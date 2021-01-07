import React, { useRef, useMemo } from "react";
import omit from "lodash/omit";
// import isDate from "lodash/isDate";
import FileCopy from "@material-ui/icons/FileCopy";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import startCase from "lodash/startCase";
import { useToggle } from "react-use";
import MaterialTable, { Column, MTableToolbar, MaterialTableProps, Options } from "material-table";
import { useMutation, useQuery, useQueryCache } from "react-query";
import { Api } from "../../api/createApi";
import { PromotionDocument } from "../../api/promotions/model";
// import promotionsApi from "../../api/promotions/api";
import icons from "./icons";
// import { User } from "../../../api/users/model";
// import { Language } from "../../../api/languages/model";
// import { ProductType } from "../../../api/productsTypes/model";
// import { ProductType } from "../../../api/productsTypes/model";
// import { User } from "../../../api/users/model";
// import { Language } from "../../../api/languages/model";

// type Id = { _id: string };

interface Props<T extends {}> extends Partial<Omit<MaterialTableProps<T>, "icons">> {
    api: Api<T, any>;
    // context: Context<T>;
}

const filter = ["fullName", "phone", "hashPassword", "_id", "__v", "tableData"];

function ContextWrapTable<T extends PromotionDocument>(props: Props<T>) {
    const [alert, toggleAlert] = useToggle(false);
    // const [page, setPage] = useState(0);

    const queryCache = useQueryCache();
    const tableRef = useRef();
    const { api, options, editable } = props;
    const { data } = useQuery([api.name, {}], api.get);
    // data?.map((d) => {
    //     // d
    // });

    const [remove] = useMutation(api.remove, {
        onSuccess: (id) =>
            queryCache.setQueryData<PromotionDocument[], Error>([api.name, {}], (old) => {
                if (old?.length) {
                    return old.reduce((acc, next) => {
                        if (id === next._id) {
                            return acc;
                        }
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        return acc.concat(omit(next, ["tableData"]));
                    }, []);
                }
                return [];
            }),
    });
    const [post] = useMutation(api.post, {
        onSuccess: (newData) => {
            // eslint-disable-next-line
            queryCache.setQueryData([api.name, {}], (old) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return old.map((v) => omit(v, ["tableData"])).concat(newData);
            });
        },
        onMutate: () => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            queryCache.cancelQueries(api.name);

            // Snapshot the previous value
            const previousTodos = queryCache.getQueryData(api.name);

            // Return the snapshotted value
            return () => queryCache.setQueryData(api.name, previousTodos);
        },
    });
    const [put] = useMutation(api.put, {
        onSuccess: (updateData) => {
            // eslint-disable-next-line
            queryCache.setQueryData([api.name, {}], (old) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return old.map((v) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (v._id === updateData._id) {
                        return updateData;
                    }
                    return omit(v, ["tableData"]);
                });
            });
        },
        onError: (error) => {
            toggleAlert();
            console.log("sss error", error);
        },
    });

    // const shit: Record<keyof T, any> = {
    //     _id: "sd",
    //     email: "sdf",
    // };
    const cols = useMemo(() => {
        if (data?.length) {
            return Object.keys(data[0]).reduce((acc, key) => {
                if (filter.includes(key)) {
                    return acc;
                }
                re;

                acc.push({
                    title: startCase(key),
                    field: key,
                    editable: "always",
                    // type,
                    lookup: undefined,
                });
                return acc;
            }, [] as Array<Column<any>>);
        }
        return [];
    }, [data?.length]);

    const mergedOptions = useMemo<Options<T>>(
        () => ({
            ...options,
            filtering: false,
            addRowPosition: "first",
            showSelectAllCheckbox: true,
            // paginationType: "stepped",
            exportButton: false,
            pageSize: 100,
            // pageSizeOptions: [10, 20, 50, 75],
        }),
        [options]
    );

    const edits = useMemo<Partial<Pick<MaterialTableProps<T>, "editable" | "actions">>>(
        () => ({
            editable: {
                onRowAdd: post,
                onRowUpdate: (body) => put(body),
                onRowDelete: (oldData) => remove(oldData._id),
                ...editable,
            },
            actions: [
                {
                    icon: FileCopy,
                    tooltip: "Duplicate User",
                    onClick: () => {
                        console.log("s");
                    },
                },
            ],
        }),
        []
    );

    return (
        <div>
            <MaterialTable
                title={api.name}
                tableRef={tableRef}
                options={mergedOptions}
                icons={icons}
                components={{
                    Toolbar: (r) => (
                        <div style={{ backgroundColor: "#e8eaf5" }}>
                            {/* eslint-disable-next-line */}
                            <MTableToolbar {...r} />
                            items
                            {r.data.length}
                        </div>
                    ),
                }}
                columns={cols}
                editable={edits.editable}
                data={Array.isArray(data) ? data : []}
                // initialFormData={initialFormData}
                actions={edits.actions}
            />
            <Snackbar open={alert} autoHideDuration={6000}>
                <Alert severity="success">This is a success message!</Alert>
            </Snackbar>
        </div>
    );
}

ContextWrapTable.defaultProps = {};

export default ContextWrapTable;
