const TerserPlugin = require('terser-webpack-plugin');
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode:"production",
    plugins: [
        new TypescriptDeclarationPlugin(
            {out: "splain.d.ts"}
        ),
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
            },
        }),
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'splain.js',
        library: 'Splain',
        libraryTarget: 'umd',
        globalObject: 'this',
        libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.mjs', '.js', '.json', '.ts']
    }
};
