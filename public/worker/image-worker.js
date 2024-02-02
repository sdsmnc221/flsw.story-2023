let countImg = 0;
self.addEventListener("message", async (event) => {
  // Grab the imageURL from the event - we'll use this both to download
  // the image and to identify which image elements to update back in the
  // UI thread
  const { imageURL, imgCount, imgIndex } = event.data;

  const response = await fetch(imageURL);
  const blob = await response.blob();
  countImg++;

  console.log({ imgCount, imgIndex, countImg });
  const isLoadingFinished = imgCount === countImg;

  // Send the image data to the UI thread!
  self.postMessage({
    imageURL: imageURL,
    blob: blob,
    isLoadingFinished,
  });
});
