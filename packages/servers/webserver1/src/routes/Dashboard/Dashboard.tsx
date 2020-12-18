import React from "react";
import Button from "@material-ui/core/Button";
import { useQuery } from "react-query";
// import { UserDocument } from "../../api/users/model";
// import { ProjectDocument } from "../../api/projects/model";
// import Checkbox from "@material-ui/core/Checkbox";
// import PropTypes from 'prop-types';

// interface Props {
//     name?: string;
// }
import usersApi from "../../api/users/api";
// import projectsApi from "../../api/projects/api";

// const apis: [Promise<UserDocument[]>, Promise<ProjectDocument[]>] = [
//     usersApi.get("usrs", {}),
//     projectsApi.get("usrs", {}),
//     // projectsApi.get("usrs", {}),
// ];

// Promise.all(apis).then(([users]) => {
//     // console.log("projects", p);
//     // console.log("users", users);
//     const da = users.map(
//         (items) =>
//             // console.log("item", items);
//             items._id
//         // return items.map((item) => item._id);
//     );
//     console.log("da", da);
// });

// function getS<T extends []>(promises: Array<Promise<T>>) {
//     return Promise.all(promises).then((ra) => {
//         const da = ra.map((items) => {
//             console.log("item", items);
//             // return items.map((item) => item._id);
//         });
//         console.log("da", da);
//         return da;
//     });
// }

const Dashboard: React.FC = () => {
    // console.log("");
    // useEffect(3() => {
    //     // usersApi.get("sd", {});
    // }, []);
    const { data } = useQuery([usersApi.name, {}], usersApi.get);
    if (!Array.isArray(data)) {
        return <div>no array</div>;
    }
    return (
        <div>
            {data.map((item) => {
                console.log("item", typeof item.createdAt);
                console.log("item", item.isActive);
                return <div key={item._id}>{item._id}</div>;
            })}
            <Button>Dashboard sds</Button>
        </div>
    );
};

// Login.propTypes = {
//
// };

export default Dashboard;
