import webpack from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolver } from './buildResolvers'
import { BuildOptions } from './types/types'
import { buildDevServer } from './buildDevServer'

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
    const {mode, paths} = options
    const isDev = mode === 'development'

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolver(options),
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}