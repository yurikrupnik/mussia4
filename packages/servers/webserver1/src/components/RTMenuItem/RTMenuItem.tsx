import React from "react";

interface Props {
    item: {
        name: string;
    };
}

const RtMenuItem: React.FC<Props> = (props) => {
    const { item } = props;
    return <>{item.name}</>;
};

export default RtMenuItem;
