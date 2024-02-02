self.addEventListener("message", async (event) => {
  // Grab the imageURL from the event - we'll use this both to download
  // the image and to identify which image elements to update back in the
  // UI thread
  const imageURL = event.data;

  const response = await fetch(imageURL);
  const blob = await response.blob();

  // Send the image data to the UI thread!
  self.postMessage({
    imageURL: imageURL,
    blob: blob,
  });
});
