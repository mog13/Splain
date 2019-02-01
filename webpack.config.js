const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode:"production",
    plugins: [
        new UglifyJSPlugin()
    ],
    output: {
        filename: 'splain.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "Splain"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.ts']
    }
};