const dataStructure = { ids: [], byId: {} };

const formatArray = (acc: any, next: any) => {
    acc.ids = acc.ids.concat(next._id);
    acc.byId[next._id] = next;
    return acc;
};

const formatData = (data: any) => data.reduce(formatArray, { ids: [], byId: {} });

export { formatData, dataStructure };
