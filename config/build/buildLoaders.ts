import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
    const isDev = options.mode === 'development'
    return [
        {
            test: /\.tsx?$/,
            use: {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                }
            },
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader', 
                    options: {
                        url: true,
                    }
                },
            ]
        },
        {
            test: /\.module\.s[ac]ss$/,
            exclude: /node_modules/,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        url: true,
                        importLoaders: 1,
                        modules: {
                            localIdentName: isDev ? '[name]__[local]' : '[sha1:hash:hex:7]'
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                }
            ]
        },
        {
            test: /^((?!\.module).)*s[ac]ss$/,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        url: true,
                    }
                },
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'assets/resource',
        },
        {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader:'@svgr/webpack',
                    options: {
                        icon: true,
                        svgoConfig: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    },
                }
            ],
        },
        {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: ['file-loader']
        },
    ]
}