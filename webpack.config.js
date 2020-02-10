const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/Splain.ts',
    mode:"production",
    plugins: [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
            },
        }),
    ],
    output: {
        filename: 'splain.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "Splain",
        globalObject: "(typeof window !== 'undefined' ? window : this)"
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
