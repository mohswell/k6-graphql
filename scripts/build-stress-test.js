const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: [path.resolve(__dirname, '../tests/countries-stress-test.ts')],
  bundle: true,
  outfile: path.resolve(__dirname, '../dist/countries-stress-test.bundle.js'),
  platform: 'node',
  target: 'es2020',
  format: 'cjs',
  external: [
    'k6',
    'k6/http',
    'k6/metrics',
    'k6/encoding',
    'k6/options',
  ],
  alias: {
    '@/src': path.resolve(__dirname, '../src'),
  },
  loader: {
    '.ts': 'ts',
  },
  logLevel: 'info',
}).catch(() => process.exit(1));
