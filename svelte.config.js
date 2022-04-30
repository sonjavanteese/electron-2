import sveltePreprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';

import adapter from '@sveltejs/adapter-static';

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter({}),
		vite: {
			plugins: [WindiCSS()]
		}
	},
	preprocess: sveltePreprocess(),
};

export default config;
