import React, { useCallback, useState, useEffect } from "react";
import omit from "lodash/omit";
import { useWindowSize } from "react-use";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { List, ListRowProps } from "react-virtualized";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import promotionsApi from "../../api/promotions/api";
import { PromotionDocument } from "../../api/promotions/model";

const MaterialTablePromotions = function MaterialTablePromotions() {
    const { width, height } = useWindowSize();
    const [limit] = useState(100);
    const [page, setPage] = useState(0);
    const [data, setData] = useState<PromotionDocument[]>([]);

    const handleConcat = useCallback((newData: PromotionDocument[]) => data.concat(newData), [data]);

    useEffect(() => {
        promotionsApi.get(promotionsApi.name, { page, limit }).then((response) => {
            setData(page === 0 ? response : handleConcat(response));
        });
    }, [page]);

    const handleDelete = useCallback(
        (event) => {
            const { index } = event.currentTarget.dataset;
            const { _id } = data[index];
            promotionsApi.remove(_id).then((returnId) => {
                const newData = data.reduce((acc, next) => {
                    if (next._id === returnId) {
                        return acc;
                    }
                    return acc.concat(next);
                }, [] as PromotionDocument[]);
                setData(newData);
            });
        },
        [data]
    );

    const handleEdit = useCallback(
        // changes only the name to name 1
        (event) => {
            const { index } = event.currentTarget.dataset;
            const { _id } = data[index];
            promotionsApi.put({ _id, name: "Name 1" }).then((item) => {
                const newData = data.reduce((acc, next) => {
                    if (next._id === item._id) {
                        return acc.concat(item);
                    }
                    return acc.concat(next);
                }, [] as PromotionDocument[]);
                setData(newData);
            });
        },
        [data]
    );

    const handleClone = useCallback(
        (event) => {
            const { index } = event.currentTarget.dataset;
            const item = data[index];
            promotionsApi.post(omit(item, "_id")).then((newItem) => {
                setData(data.concat(newItem));
            });
        },
        [data]
    );

    const renderRow = (items: PromotionDocument[]) => ({ index, key, style }: ListRowProps) => {
        if (index === items.length - 40) {
            setPage((p) => p + 1);
        }

        return (
            <Grid
                direction="row"
                alignItems="center"
                justify="space-between"
                container
                key={key}
                style={{ ...style, border: "1px solid gray" }}
            >
                <Grid>{items[index].name}</Grid>
                <Grid>{items[index].type}</Grid>
                <Grid>{items[index].startDate}</Grid>
                <Grid>{items[index].endDate}</Grid>
                <Grid>{items[index].userGroup.name}</Grid>
                <Grid style={{ padding: "5px" }}>
                    <DeleteIcon style={{ paddingRight: "10px" }} data-index={index} onClick={handleDelete} />
                    <EditIcon style={{ paddingRight: "10px" }} data-index={index} onClick={handleEdit} />
                    <FileCopyIcon style={{ paddingRight: "10px" }} data-index={index} onClick={handleClone} />
                </Grid>
            </Grid>
        );
    };

    return (
        <Paper className="container">
            <Grid>
                <Grid item>
                    Fetched amount:
                    {data.length}
                </Grid>
            </Grid>
            <br />
            <Grid container direction="row" alignItems="center" justify="space-between">
                {data.length > 1 &&
                    Object.keys(data[0])
                        .map((next, i) => {
                            if (["_id", "__v"].includes(next)) {
                                return <></>;
                            }
                            return (
                                <Grid key={i} item>
                                    {next}
                                </Grid>
                            );
                        }, [])
                        .concat(
                            <Grid key="ko" item>
                                Actions
                            </Grid>
                        )}
            </Grid>
            <List
                width={width}
                height={height - 100}
                rowRenderer={renderRow(data)}
                rowCount={data.length}
                rowHeight={80}
            />
        </Paper>
    );
};

export default React.memo(MaterialTablePromotions);
