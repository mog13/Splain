const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './lib/index.js',
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
            }
        ]
    }
};