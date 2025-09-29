import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ envMode }) => {
	const env = loadEnv(envMode);

	return {
		plugins: [
			pluginReact(),
			pluginBabel({
				include: /\.(?:jsx|tsx)$/,
				babelLoaderOptions(opts) {
					opts.plugins?.unshift(['babel-plugin-react-compiler', { target: '18' }]);
				}
			})
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		},

		server: {
			// host: '0.0.0.0',
			port: Number(env.parsed.VITE_PORT) || 6000
		},

		source: {
			define: {
				'import.meta.env.VITE_API_URL': JSON.stringify(env.parsed.VITE_API_URL ?? ''),
				'import.meta.env.VITE_UI_URL': JSON.stringify(env.parsed.VITE_UI_URL ?? ''),
				'import.meta.env.NODE_ENVIRONMENT': JSON.stringify(env.parsed.NODE_ENVIRONMENT ?? ''),
				'import.meta.env.VITE_PORT': JSON.stringify(env.parsed.VITE_PORT ?? '')
			}
		}
	};
});
