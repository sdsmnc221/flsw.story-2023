import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VitePluginRadar } from "vite-plugin-radar";

const env = loadEnv("all", process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePluginRadar({
      enableDev: true,
      // Google Analytics tag injection
      analytics: {
        id: env.VITE_ANALYTICS_ID,
      },
    }),
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag: any) => tag.includes("ce"),
        },
      },
    }),
    Components({
      /* options */
    }),
  ],
});
