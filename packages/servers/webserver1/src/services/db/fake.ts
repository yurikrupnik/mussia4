import times from "lodash/times";

const createFake = (num: number, cb: () => any) => times(num).map(cb);

function a() {
    return "";
}

export { createFake, a };
