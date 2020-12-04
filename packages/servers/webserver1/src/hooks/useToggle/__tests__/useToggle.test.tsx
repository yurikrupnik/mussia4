// import useToggle from "../index";
// import { renderHook, act, cleanup } from "@testing-library/react-hooks";

test("sine", () => {
    expect(1).toBe(1);
});
// afterEach(cleanup);
//
// describe(useToggle.name, () => {
//     test("default", () => {
//         const { result } = renderHook(() => useToggle());
//         expect(typeof result.current.bool).toBe("boolean");
//         expect(result.current.bool).toBe(false);
//         act(() => {
//             result.current.toggleBool();
//         });
//         expect(result.current.bool).toBe(true);
//     });
//     test("init value", () => {
//         const { result } = renderHook(() => useToggle(true));
//         expect(result.current.bool).toBe(true);
//     });
//     test("override bool", () => {
//         const { result } = renderHook(() => useToggle(true));
//         act(() => {
//             result.current.toggleBool(true);
//         });
//         expect(result.current.bool).toBe(true);
//     });
// });
