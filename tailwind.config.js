module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: ["./src/**/*", "./node_modules/@imagine-developer/**/*"],
    theme: {
        extend: {
            gridTemplateColumns: {
                "1-auto": "repeat(1, auto)",
                "2-auto": "repeat(2, auto)",
                "3-auto": "repeat(3, auto)",
                "4-auto": "repeat(4, auto)",
                "5-auto": "repeat(5, auto)",
                "6-auto": "repeat(6, auto)",
                "7-auto": "repeat(7, auto)",
                "8-auto": "repeat(8, auto)",
                "9-auto": "repeat(9, auto)",
                "form-field-container":
                    "[label] auto [required] auto [input] 1fr [end]",
            },
            gridColumn: {
                "label-label": "label / label",
                "required-required": "required / required",
                "input-input": "input / input",
                "updated-updated": "updated / updated",
                "label-end": "label / end",
            },
            listStyleType: {
                close: "\0",
                checked: "\0",
            },
            colors: {
                "dark-blue": "#023950",
                "dark-orange": "#f8962d",
                "gray-150": "#f2f2f2",
                "gray-140": "#f3f4f6",
                "dark-red": "#e33b27",
                blue: {
                    900: "#003950",
                },
                yellow: {
                    500: "#f8962d",
                },
            },
            fontSize: {
                none: 0,
            },
            backgroundImage: () => ({
                "header-bg": "url('images/header-bg')",
            }),
            position: {},
            stroke: (theme) => ({
                white: theme("colors.white"),
            }),
            fill: (theme) => ({
                white: theme("colors.white"),
            }),
        },
    },
    variants: {
        backgroundColor: [
            "responsive",
            "first",
            "last",
            "even",
            "odd",
            "hover",
            "focus",
        ],
        textColor: [
            "responsive",
            "first",
            "last",
            "even",
            "odd",
            "hover",
            "focus",
        ],
    },
    plugins: [],
};
