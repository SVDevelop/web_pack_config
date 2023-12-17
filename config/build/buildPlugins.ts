import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import  ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from "path";

export const buildPlugins = ({mode, paths, analyzer}: BuildOptions): Configuration['plugins'] => {
    const isDev = mode === 'development'
    
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            // favicon: path.relative(paths.public, 'favicon.ico'),
        }),
        // new DefinePlugin({
        //     platform: ''
        // }),
        new ForkTsCheckerWebpackPlugin(),
    ]
    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    } else {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
        plugins.push( new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(paths.src, 'assets'),
                    to: path.resolve(paths.output, 'assets')
                }
            ]
        }))
    }
    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }
    
    return plugins
}