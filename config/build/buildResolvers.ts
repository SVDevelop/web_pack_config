import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export const buildResolver = (options: BuildOptions): Configuration['resolve'] => ({
        extensions: ['.tsx','.ts', '.js'],
        alias: {
            '@': options.paths.src,
            // 'styles/*': path.resolve(__dirname, 'src/styles'),
        }, 
    })