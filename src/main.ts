import { createApp } from "vue";

import "the-new-css-reset/css/reset.css";
import "./styles/index.scss";

import "./components/LoaderBlock/LoaderBlock.ce";

import App from "./App.vue";

createApp(App).mount("#app");

// Create a custom event
import onAssetsLoaded from "./helpers/customEvents/assetsLoaded";

const worker = new Worker(
  new URL("/worker/image-worker.js?type=classic&worker_file", import.meta.url)
);

// Get all of the `<img>` elements that have a `data-src` property
const imgElements = document.querySelectorAll("div[data-src]");

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
imgElements.forEach((imageElement, index) => {
  const imageURL = imageElement.getAttribute("data-src");
  const sectionIndex =
    imageElement.getAttribute("data-section")?.replace("section--", "") ??
    "unknown";
  const imgCountInCurrentSection = sectionImageCount[sectionIndex] || 0;

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
    `div[data-src='${imageData.imageURL}']`
  );

  // console.log(imageElement);

  // We can use the `Blob` as an image source! We just need to convert it
  // to an object URL first
  const objectURL = URL.createObjectURL(imageData.blob);
  if (imageData.imageURL.includes("jpg")) {
    imageElement.style.backgroundImage = `url(${objectURL})`;
  } else {
    const videoElement = imageElement.querySelector("video");
    videoElement.src = objectURL;
  }

  // Let's remove the original `data-src` attribute to make sure we don't
  // accidentally pass this image to the worker again in the future
  imageElement.removeAttribute("data-src");

  // Check if all images have been loaded
  // If they have, dispatch the custom event
  const { isLoadingFinished } = imageData;

  if (isLoadingFinished) {
    // Dispatch the custom event
    document.dispatchEvent(onAssetsLoaded);
  }
});
