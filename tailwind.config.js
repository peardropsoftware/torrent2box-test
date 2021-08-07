module.exports = {
    mode: "jit",
    purge: [
        "./index.html",
        "./src/**/*.{ts,vue}",
    ],
    plugins: [
        ({addUtilities}) => {
            addUtilities({
                ".\\": {
                    // Empty
                }
            });
        }
    ]
}
