import { useRouter } from "next/router";

/** Prefixes public/ asset paths with the Next basePath (GitHub Pages deploys under a sub-path). */
export const useAssetPath = () => {
  const { basePath } = useRouter();
  return (path: string) => `${basePath}${path}`;
};
