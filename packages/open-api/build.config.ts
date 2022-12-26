import { defineBuildConfig } from 'unbuild';
import { resolve } from 'path';
export default defineBuildConfig({
  declaration: true,
  entries: ['src/index'],
  alias: {
    '@': resolve(__dirname, './src'),
  },
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
});
