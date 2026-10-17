export function siteOrigin(environment) {
  if (!environment.CONTEXT || environment.CONTEXT === "production" || !environment.DEPLOY_PRIME_URL) return "https://ctlflow.com/";
  const preview = new URL(environment.DEPLOY_PRIME_URL);
  if (preview.protocol !== "https:" || preview.username || preview.password || preview.search || preview.hash || preview.pathname !== "/") throw new Error("Netlify preview URL must be an exact HTTPS origin");
  return preview.href;
}
