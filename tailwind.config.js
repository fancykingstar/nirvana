module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: ["src/**/*"],
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
            },
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
