import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://tgif.teknologiumum.com/",
	integrations: [solidJs()],
	vite: {
		resolve: {
			alias: {
				"~/*": ["src/*"],
			},
		},
		plugins: [Icons({ compiler: "solid" })],
	},
});
