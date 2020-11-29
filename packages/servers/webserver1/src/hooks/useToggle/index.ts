import { useState, useCallback } from "react";

const useToggle = (initValue = false) => {
    // console.log('initValue', initValue);
    const [bool, setBool] = useState(initValue);

    const toggleBool = useCallback(
        (b?: boolean) => {
            setBool(typeof b === "boolean" ? b : !bool);
        },
        [bool]
    );
    return { bool, toggleBool };
};

export default useToggle;
