const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getCacheGroupTestReg(path) {
    return new RegExp(path.split('/').join('[\\\\/\]'));
}

module.exports = (_, args) => {
    const isProd = args.mode === 'production';
    const isDev = !isProd;

    return {
        entry: './index.ts',

        devtool: isDev ? 'source-map' : false,

        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].[contenthash:8].bundle.js',
            chunkFilename: '[name].[contenthash:8].chunk.js'
        },

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            host: '192.168.1.185',
            port: 8080,
            disableHostCheck: true,
            watchContentBase: true,
            progress: true,
            hot: true,
            open: true,
            historyApiFallback: true
        },

        resolve: {
            extensions: ['.ts', '.js'],

            alias: {
                '@core': path.resolve(__dirname, 'core'),
                '@client': path.resolve(__dirname, 'client'),
                '@components': path.resolve(__dirname, 'client/components'),
                '@static': path.resolve(__dirname, 'client/static')
            }
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                },

                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '/'
                            }
                        },
                        
                        'css-loader',
                        'sass-loader'
                    ]
                },

                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts'
                            }
                        }
                    ]
                },

                {
                    test: /\.svg$/,
                    use: 'raw-loader'
                },

                {
                    test: /\.html$/i,
                    loader: 'html-loader'
                }
            ]
        },

        plugins: [
            new BundleAnalyzerPlugin(),

            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'client/public/index.html'),
                favicon: path.resolve(__dirname, 'client/public/favicon.png')
            }),

            new MiniCssExtractPlugin({
                filename: '[name].bundle.[contenthash:8].css',
                chunkFilename: '[name].chunk.[contenthash:8].css'
            })
        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: getCacheGroupTestReg('/node_modules/'),
                        name: 'vendors',
                        chunks: 'all',
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    core: {
                        test: getCacheGroupTestReg('/arch/core/'),
                        name: 'core',
                        chunks: 'initial'
                    },

                    client: {
                        test: getCacheGroupTestReg('/arch/client/'),
                        name: 'client',
                        chunks: 'initial'
                    }
                }
            },

            runtimeChunk: {
                name: entrypoint => `runtime-${entrypoint.name}`
            }
        }
    };
};