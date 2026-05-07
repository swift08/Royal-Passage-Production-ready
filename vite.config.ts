// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Lovable's TanStack preset defaults to port 8080 + host "::". Many tutorials assume Vite's 5173,
// and some environments resolve `localhost` more reliably with host `true`.
export default defineConfig({
  vite: {
    server: {
      port: 5173,
      strictPort: false,
      host: true,
    },
  },
});
