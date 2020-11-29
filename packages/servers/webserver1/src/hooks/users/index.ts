import { useContext } from "react";
import { Context } from "../../api/users/context";

const useUsers = () => useContext(Context);

export default useUsers;
