module.exports = {
    entry: "index.js",
    output: {
        path: "umd.js",
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    }
};