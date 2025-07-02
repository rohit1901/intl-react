import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.tsx'),
            name: 'intl-react',
            fileName: (format) => `intl-react.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    },
    plugins: [react(), dts({
        insertTypesEntry: true,
        outDir: 'dist/types',
    })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});