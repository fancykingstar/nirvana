module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: ["src/**/*"],
    theme: {
        extend: {},
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
