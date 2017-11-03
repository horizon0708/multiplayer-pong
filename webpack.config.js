var path = require('path');

module.exports = {
    entry: './client/main.ts',
    context: __dirname,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: ['/node_modules/','/server'] }
        ]
    },
    devtool: 'inline-source-map'
};