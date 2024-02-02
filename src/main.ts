import { createApp } from "vue";

import "the-new-css-reset/css/reset.css";
import "./styles/index.scss";

import "./components/LoaderBlock/LoaderBlock.ce";

import App from "./App.vue";

createApp(App).mount("#app");

const worker = new Worker(
  new URL("/worker/image-worker.js?type=classic&worker_file", import.meta.url)
);

// Get all of the `<img>` elements that have a `data-src` property
const imgElements = document.querySelectorAll("div[data-src]");

// Loop over the image elements and pass their URLs to the web worker
imgElements.forEach((imageElement) => {
  const imageURL = imageElement.getAttribute("data-src");
  worker.postMessage(imageURL);
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
});
