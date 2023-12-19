import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/ts/app.tsx"],
            refresh: true,
        }),
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(
                    new URL("./resources/ts", import.meta.url)
                ),
            },
        ],
    },
});
