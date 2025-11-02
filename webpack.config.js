/**
 * Pasta raiz aonde se encontram todos os recursos para desenvolvimento
 */
const resources_path = './resources';

/**
 * Pasta publica aonde todos os arquivos compilados serão colocados após o procesos de build
 */
const public_path	= './public';

/**
 * Pasta aonde esta localizado o arquivo de entrada
 */
const entry_path = `${resources_path}/js`;
const entry_base_path = `${resources_path}/base/js`;

/**
 * Pasta de saida dos arquivos após a compilação
 */
const output_path = `${public_path}/assets/js`;

/**
 * Pasta filha, para caso a aplicação fique dentro de um subdiretório
 */
const sub_folder = '';

/**
 * Libs
 */
const { EnvironmentPlugin } = require('webpack');
const { join, resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (_, { mode, env }) => {

    const production = mode === 'production';

    /**
	 * Utilizado caso haja necessidade de ser colocado a aplicação em uma subpasta
	 */
    const basename = production ? sub_folder : '';

    return {
        mode	: mode ? mode : 'development',
        target  : 'web',
        entry   : {
            bundle : resolve(`${entry_base_path}/`, 'App.jsx'),
        },
        output  : {
            path			: resolve(__dirname, output_path),
            filename		: `[name]${production ? '.[chunkhash:8]' : ''}.js`,
            chunkFilename   : `[name]${production ? '.[chunkhash:8]' : ''}.js`,
            publicPath      : `${basename}/assets/js/`
        },
        devServer: {
            contentBase         : join(__dirname, public_path),
            port                : 3000,
            compress            : true,
            watchContentBase    : true,
            writeToDisk         : true,
            historyApiFallback  : true,
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        },
        module  : {
            rules: [
                {
                    test    : /\.(js|jsx)$/,
                    exclude : /node_modules/,
                    use 	: [
                        {
                            loader : 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [ 'style-loader', 'css-loader' ],
                },
                {
                    test	: /\.(woff|woff2|eot|ttf)$/,
                    loader	: 'file-loader',
                    options : {
                        name 		: '[name].[ext]',
                        outputPath 	: '../fonts',
                        publicPath 	: `${basename}/assets/fonts/`,
                    },
                },
                {
                    test	: /\.(png|jpg|jpeg|svg)$/,
                    loader	: 'file-loader',
                    options : {
                        name 		: '[name].[ext]',
                        outputPath 	: '../images',
                        publicPath 	: `${basename}/assets/images/`,
                    },
                }
            ]
        },
        plugins : [
            new ESLintPlugin({
                extensions : [ 
                    '.jsx', 
                    '.js',
                    '.json'
                ]
            }),
            new HtmlWebpackPlugin({
                template 	: resolve(`${resources_path}/index.html`),
                filename 	: resolve(`${public_path}/index.html`),
                inject		: true,
                templateParameters : {
                    REACT_APP_ENV     : env ? env.REACT_APP_ENV : 'development',
                    BASENAME    : basename,
                }
            }),
            new EnvironmentPlugin({
                REACT_APP_ENV 	: env ? env.REACT_APP_ENV : 'development',
                BASENAME	: basename
            }),	
            production && new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns : [
                    resolve(output_path, '..', 'js'),
                    resolve(output_path, '..', 'fonts')
                ]
            }),
            production && new CompressionPlugin({
                algorithm	: 'gzip',
                test		: /\.(js)$/,
            })
        ].filter((plugin) => plugin),
        resolve : {
            extensions : [ 
                '.jsx', 
                '.js',
                '.json'
            ],
            modules: [
                'node_modules',
                resolve(entry_path),
                resolve(entry_base_path)
            ],
            alias: {
                ['~'] : resolve(entry_path),
                ['@'] : resolve(entry_base_path)
            }
        },
        optimization : {
            minimize : true,
            minimizer : [
                new TerserPlugin({	
                    terserOptions : {
                        output : {
                            comments : false
                        }
                    },
                    extractComments : false
                })
            ],
            splitChunks : {
                cacheGroups : {
                    default : false,
                    bundle : {
                        test	: /node_modules|resources\/(base\/)?js\/(config|hooks|utils)|resources\/(base\/)?js\/views\/(components|layouts|contexts|partials)|resources\/(base\/)?js\/Api\.js/,
                        name	: 'bundle',
                        chunks	: 'all',
                        enforce	: true
                    }
                }
            }
        }
    };
};