import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = buildSvgLoader();
  const babelLoader = {
    test: /\.(jsx|tsx|jx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  };
  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };
  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: '/node_modules',
  };
  const sassLoader = buildCssLoader(isDev);
  return [babelLoader, tsLoader, sassLoader, svgLoader, fileLoader];
}
