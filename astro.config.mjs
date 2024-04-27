import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import node from "@astrojs/node";
import Icons from "unplugin-icons/vite";
import sentry from "@sentry/astro";
import * as Sentry from "@sentry/astro";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://astro.build/config
export default defineConfig({
	integrations: [
		solidJs(),
		sentry({
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV,
			sampleRate: 1.0,
			tracesSampleRate: 0.5,
			replaysSessionSampleRate: 0.05,
			replaysOnErrorSampleRate: 0.5,
			integrations: [Sentry.httpIntegration({ tracing: true }), Sentry.nativeNodeFetchintegration()],
			tracePropagationTargets: [/teknologiumum.com/],
			sourceMapsUploadOptions: {
				project: "tgif",
				authToken: process.env.SENTRY_AUTH_TOKEN,
			},
			autoInstrumentation: {
				requestHandler: true,
			},
		}),
	],
	vite: {
		resolve: {
			alias: {
				"~/*": ["src/*"],
			},
		},
		plugins: [
			Icons({ compiler: "solid" }),
			viteStaticCopy({
				targets: [
					{
						src: "public/chats",
						dest: "",
					},
				],
			}),
		],
	},
	site: "https://tgif.teknologiumum.com/",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
});
