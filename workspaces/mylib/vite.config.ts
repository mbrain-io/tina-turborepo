import react from '@vitejs/plugin-react'
import path from 'node:path';
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';
const pkg = require('./package.json');

const UMD_LIB_NAME = 'mylib'; // Only letters and numbers are allowed
const SOURCEMAP = false;
const PORT = 3003;
const MINIFY: false | 'esbuild' | 'terser' = 'esbuild'; // It does not minify whitespaces when using the 'es' format in lib mode, as it removes pure annotations and breaks tree-shaking
const EXTERNAL = Object.keys(pkg.peerDependencies); // External packages will not be bundled

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: PORT,
        open: false, // Open browser on run
    },
    plugins: [
        react({
            jsxRuntime: 'classic', // Don't bundle JSX runtime (https://bit.ly/3nuBY4O)
        }),
        dts(),
    ],
    build: {
        sourcemap: SOURCEMAP,
        minify: MINIFY,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: UMD_LIB_NAME,
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: EXTERNAL,
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
})
