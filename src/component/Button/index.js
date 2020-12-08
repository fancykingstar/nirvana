import classed from "../ClassedComponent";

export default classed.button(
    "bg-gray-600",
    "cursor-pointer",
    "no-underline",
    "px-2",
    "py-1",
    "rounded",
    "shadow",
    "text-base",
    "text-white",

    "hover:bg-gray-700",
    "hover:shadow-md",
    "hover:text-gray-100",

    ({ color, disabled }) => ({
        ["bg-blue-500 hover:bg-blue-600"]: color === "blue" && !disabled,
        ["bg-green-500 hover:bg-green-600"]: color === "green" && !disabled,
        ["bg-orange-500 hover:bg-orange-600"]: color === "orange" && !disabled,
        ["bg-red-500 hover:bg-red-600"]: color === "red" && !disabled,

        ["bg-blue-200"]: color === "blue" && disabled,
        ["bg-green-200"]: color === "green" && disabled,
        ["bg-orange-200"]: color === "orange" && disabled,
        ["bg-red-200"]: color === "red" && disabled,
    }),
);
