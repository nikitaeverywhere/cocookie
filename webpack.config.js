module.exports = {
    entry: "./index.js",
    output: {
        filename: "./umd.js",
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    }
};