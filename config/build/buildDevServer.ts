import { BuildOptions } from './types/types'

export const buildDevServer = (options: BuildOptions) => ({
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
})