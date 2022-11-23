import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';
const plugins = [
  nodeResolve(),
  json(),
  commonjs(),
  esbuild({
    target: 'node14',
  }),
];

const entries = ['src/index.ts'];

const dtsEntries = ['src/index.ts'];

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
];

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author}
 * Released under the ${pkg.license} License.
 */
`;

export default defineConfig([
  {
    input: entries,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        banner,
      },
      {
        file: pkg.module,
        format: 'esm',
        banner,
      },
    ],
    external,
    plugins,
    onwarn,
  },
  {
    input: dtsEntries,
    output: {
      file: pkg.types,
      format: 'esm',
      banner,
    },
    plugins: [dts()],
  },
]);

function onwarn(message) {
  if (['EMPTY_BUNDLE', 'CIRCULAR_DEPENDENCY'].includes(message.code)) return;
  console.error(message);
}
