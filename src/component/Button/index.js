import classed from "../ClassedComponent";

export default classed.button(
    "bg-orange-500",
    "cursor-pointer",
    "no-underline",
    "p-3",
    "text-base",
    "text-white",
    "h-50",
    "my-2",
    "hover:bg-orange-700",
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
