const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const assetPath = (path: string) => {
  if (path.startsWith("/")) {
    return `${basePath}${path}`;
  }

  return `${basePath}/${path}`;
};
