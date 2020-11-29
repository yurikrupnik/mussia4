import React, { useState } from "react";
// import PropTypes from 'prop-types';
// import api from "../api";
import { useQuery, useMutation, queryCache, MutateOptions } from "react-query";
import Context from "./context";
import api from "../api";
// import { formatData } from "../../providersHelpers";
import { IUser } from "../../../types";

interface Props {
    children: React.ReactNode;
}

// interface Callback {
//     // children: React.ReactNode;
//     onSuccess?: (id: string) => void;
// }

// type onSuccess = (id: string) => void;
//
function deleteCallback(id: string) {
    // eslint-disable-next-line
    queryCache.setQueryData(["users", {}], (old) => {
        // eslint-disable-next-line
        // @ts-ignore
        return old.reduce((acc: [], next: any) => {
            // eslint-disable-next-line no-underscore-dangle
            if (id === next._id) {
                return acc;
            }
            return acc.concat(next);
        }, []);
    });
}

interface Ars<TResult, TVariables, TError> extends MutateOptions<TResult, TVariables, TError> {
    onMutate?: (variables: TVariables) => Promise<unknown> | unknown;
    useErrorBoundary?: boolean;
}

const useDelete = (options?: Ars<string, string, Error>) => {
    const [action] = useMutation(api.remove, options);
    return action;
};

// const usersDelete = (api: any) => {
//     return () => useDelete();
// };
//
// class ProviderMethods {
//     api: any;
//     constructor(api: any) {
//         // super(props);
//         // this.api = api
//     }
//
//     createDelete() {
//         return useDelete;
//     }
// }

const UsersProvider = (props: Props) => {
    // console.log("props", props);
    const { children } = props;
    const [customQuery, setCustomQuery] = useState<Partial<IUser>>({}); // setCustomQuery
    // console.log("customQuery", customQuery);
    // const queryCache = useQueryCache();
    const { data, error } = useQuery(["users", customQuery], api.get, {
        // initialData: [],
        // manual: true,
        // refetchOnMount: true,
        // eslint-disable-next-line no-shadow
        onSuccess: (data) =>
            // console.log("data onSuccess", data);
            // console.log("formatData(data)", formatData(data));
            // return formatData(data);
            // queryCache.setQueryData("users", formatData(data));
            data as IUser[],
    });
    const [post] = useMutation(api.post, {
        // When mutate is called:
        // eslint-disable-next-line no-shadow
        onSuccess: (data) => {
            // Optimistically update to the new value
            // console.log("on success of post data", data);
            queryCache.setQueryData(
                ["users", {}],
                (old) =>
                    // console.log("oldDA", old, data);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    old.concat(data)
                // return [...old, data];
            );
        },
        onMutate: () => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            queryCache.cancelQueries("users");

            // Snapshot the previous value
            const previousTodos = queryCache.getQueryData("users");

            // Return the snapshotted value
            return () => queryCache.setQueryData("users", previousTodos);
        },
    });
    const [put] = useMutation(api.put, {});
    const remove = useDelete({ onSuccess: deleteCallback });

    return (
        <Context.Provider
            value={{
                ad: "",
                data,
                remove,
                post,
                put,
                customQuery,
                setCustomQuery,
                // setQuery,
                // get,
                // post,
                // put,
                // remove,
                error,
            }}
            // value={{
            //     data: users.data,
            //     query: customQuery,
            //     put,
            //     post: api.post,
            //     setCustomQuery,
            //     remove,
            // }}
        >
            {children}
        </Context.Provider>
    );
};

// UsersProvider.propTypes = {
//     children: PropTypes.element.isRequired
// };

export default UsersProvider;
