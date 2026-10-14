// Minimal types for the one KaTeX function the site uses.
declare module "katex" {
  const katex: {
    renderToString(
      tex: string,
      options?: { throwOnError?: boolean; displayMode?: boolean; macros?: Record<string, string> }
    ): string;
  };
  export default katex;
}
