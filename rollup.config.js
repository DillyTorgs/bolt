import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/hax-use-case-app.js',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [nodeResolve()],
  preserveEntrySignatures: false
}