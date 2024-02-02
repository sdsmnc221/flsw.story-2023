let countImg = 0;
let countImgFirstSections = 0;
self.addEventListener("message", async (event) => {
  // Grab the imageURL from the event - we'll use this both to download
  // the image and to identify which image elements to update back in the
  // UI thread
  const {
    imageURL,
    imgCount,
    imgIndex,
    sectionIndex,
    imgCountInCurrentSection,
    imgCountInFirstSections,
  } = event.data;

  const response = await fetch(imageURL);
  const blob = await response.blob();
  countImg++;

  if (sectionIndex === "1" || sectionIndex === "2") {
    countImgFirstSections++;
  }

  console.log({
    imgCount,
    imgIndex,
    countImg,
    sectionIndex,
    imgCountInCurrentSection,
  });
  const isLoadingFinished = countImg === imgCountInFirstSections;

  // Send the image data to the UI thread!
  self.postMessage({
    imageURL: imageURL,
    blob: blob,
    isLoadingFinished,
  });
});
