import imagesLoaded from "imagesloaded";
import mediasLoaded from "@maeertin/medialoaded";

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
  // const videosNodes = [...document.querySelectorAll(".grid:has(video")];

  const imagesPromise = new Promise((resolve) => {
    imagesLoaded(allNodes, { background: true }, resolve);
  });

  // const mediaPromise = new Promise((resolve) => {
  //   // mediasLoaded(videosNodes, resolve);
  // });

  return Promise.all([imagesPromise]);
};

export { preloadImages };
