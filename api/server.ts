// Vercel serverless function that fronts the TanStack Start SSR bundle.
//
// The Vite build emits `dist/server/server.js` whose default export is a
// `{ fetch(request: Request): Promise<Response> }` handler. Vercel detects
// the Web Standards (Request -> Response) signature and runs this on the
// Node.js runtime (Fluid Compute when enabled).
//
// `vercel.json` rewrites every non-static path to `/api/server`, so the
// router still sees the original URL via `request.url`.
//
// We import the built server bundle with a `.js` extension and use a
// `// @ts-ignore` because the bundle has no shipped types — its runtime
// shape is `{ fetch }`.

// @ts-ignore - generated at build time by `vite build` (no type declarations)
import server from "../dist/server/server.js";

type FetchHandler = {
  fetch: (request: Request) => Promise<Response> | Response;
};

const handler = server as FetchHandler;

export default async function vercelHandler(request: Request): Promise<Response> {
  return await handler.fetch(request);
}
