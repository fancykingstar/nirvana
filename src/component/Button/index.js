import classed from "../ClassedComponent";

export default classed.button(
    "bg-gray-600",
    "cursor-pointer",
    "px-2",
    "py-1",
    "rounded",
    "shadow",
    "text-white",

    "hover:bg-gray-700",
    "hover:shadow-md",
    "hover:text-gray-100",
    ({ color }) =>
        ({
            blue: ["bg-blue-500", "hover:bg-blue-600"],
            green: ["bg-green-500", "hover:bg-green-600"],
            orange: ["bg-orange-500", "hover:bg-orange-600"],
            red: ["bg-red-500", "hover:bg-red-600"],
        }[color]),
);
