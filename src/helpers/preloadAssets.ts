import imagesLoaded from "imagesloaded";

const flatten = (arr: any[]): any[] =>
  arr.reduce(
    (a: any, v: any) => a.concat(Array.isArray(v) ? flatten(v) : v),
    []
  );

// Preload images
const preloadImages = (selectors: string[]) => {
  const nodes = selectors.map((selector: string) => [
    ...document.querySelectorAll(selector),
  ]);
  const allNodes = flatten(nodes);
  return new Promise((resolve) => {
    imagesLoaded(allNodes, { background: true }, resolve);
  });
};

export { preloadImages };
