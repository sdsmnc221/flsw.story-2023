import { createApp } from "vue";

import "the-new-css-reset/css/reset.css";
import "./styles/index.scss";

// import "./components/LoaderBlock/LoaderBlock.ce";

import App from "./App.vue";

createApp(App).mount("#app");

// Create a custom event
import onAssetsLoaded from "./helpers/customEvents/assetsLoaded";

const CACHE_NAME = "assets-cache-v1";

const worker = new Worker(
  new URL("/worker/image-worker.js?type=classic&worker_file", import.meta.url)
);

// Function to fetch and cache blob assets
function fetchAndCacheBlobAsset(
  imageURL: any,
  isVideoBlock: boolean,
  otherData?: any
) {
  fetch(imageURL)
    .then((response) => response.blob())
    .then((blob) => {
      // Cache the blob asset
      caches
        .open(CACHE_NAME)
        .then((cache) => cache.put(imageURL, new Response(blob)))
        .catch((error) => console.error("Error caching blob:", error));

      worker.postMessage({
        imageURL,
        blob,
        isVideoBlock,
        ...otherData,
      });
    })
    .catch((error) => {
      console.error("Error fetching blob:", error);
    });
}

// Get all of the `<img>` elements that have a `data-src` property
const imgElements = document.querySelectorAll("div[data-src]");
const videoElements = document.querySelectorAll("video[data-src]");

// Use reduce to count the number of images in each section
const sectionImageCount = Array.from(imgElements).reduce(
  (acc: any, imageElement) => {
    const sectionIndex: string =
      imageElement.getAttribute("data-section")?.replace("section--", "") ??
      "unknown";

    // Initialize the count for the section if it doesn't exist
    acc[sectionIndex] = (acc[sectionIndex] || 0) + 1;

    return acc;
  },
  {}
);

// Loop over the image elements and pass their URLs to the web worker
videoElements.forEach((videoElement) => {
  const imageURL = videoElement.getAttribute("data-src");

  worker.postMessage({
    imageURL,
    isVideoBlock: true,
  });
  fetchAndCacheBlobAsset(imageURL, true);
});

imgElements.forEach((imageElement, index) => {
  const imageURL = imageElement.getAttribute("data-src");
  const sectionIndex =
    imageElement.getAttribute("data-section")?.replace("section--", "") ??
    "unknown";
  const imgCountInCurrentSection = sectionImageCount[sectionIndex] || 0;

  // fetchAndCacheBlobAsset(imageURL, false, {
  //   imgCount: imgElements.length,
  //   imgIndex: index,
  //   sectionIndex,
  //   imgCountInCurrentSection,
  //   imgCountInFirstSections: sectionImageCount["1"] + sectionImageCount["2"],
  // });
  worker.postMessage({
    imageURL,
    imgCount: imgElements.length,
    imgIndex: index,
    sectionIndex,
    imgCountInCurrentSection,
    imgCountInFirstSections: sectionImageCount["1"] + sectionImageCount["2"],
  });
});

worker.addEventListener("message", (event) => {
  // Grab the message data from the event
  const imageData = event.data;

  // Get the original element for this image
  const imageElement: any = document.querySelector(
    imageData.isVideoBlock
      ? `video[data-src='${imageData.imageURL}']`
      : `div[data-src='${imageData.imageURL}']`
  );

  // console.log(imageElement);

  // We can use the `Blob` as an image source! We just need to convert it
  // to an object URL first
  const objectURL = URL.createObjectURL(imageData.blob);
  if (imageElement) {
    if (imageData.imageURL.includes("jpg")) {
      imageElement.style.backgroundImage = `url(${objectURL})`;
    } else {
      const videoElement = imageData.isVideoBlock
        ? imageElement
        : imageElement.querySelector("video");
      videoElement.src = objectURL;
    }

    // Let's remove the original `data-src` attribute to make sure we don't
    // accidentally pass this image to the worker again in the future
    imageElement.removeAttribute("data-src");
  }

  // Check if all images have been loaded
  // If they have, dispatch the custom event
  const { isLoadingFinished } = imageData;

  console.log("isLoadingFinished", isLoadingFinished);
  if (isLoadingFinished) {
    // Dispatch the custom event
    document.dispatchEvent(onAssetsLoaded);
  }
});
