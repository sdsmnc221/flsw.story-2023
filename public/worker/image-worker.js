let countImg = 0;
let countImgFirstSections = 0;
let isLoadingFinished = false;
self.addEventListener("message", async (event) => {
  // Grab the imageURL from the event - we'll use this both to download
  // the image and to identify which image elements to update back in the
  // UI thread
  const {
    imageURL,
    imgCount,
    // imgIndex,
    sectionIndex,
    // imgCountInCurrentSection,
    imgCountInFirstSections,
  } = event.data;

  const response = await fetch(imageURL);
  const blob = await response.blob();
  countImg++;

  if (sectionIndex === "1" || sectionIndex === "2") {
    countImgFirstSections++;
  }

  // console.log({
  //   imgCount,
  //   imgIndex,
  //   countImg,
  //   sectionIndex,
  //   imgCountInCurrentSection,
  // });

  if (!isLoadingFinished) {
    isLoadingFinished =
      countImg === imgCountInFirstSections || countImg === imgCount / 2;
  }

  // Send the image data to the UI thread!
  self.postMessage({
    imageURL: imageURL,
    blob: blob,
    ...(isLoadingFinished ? { isLoadingFinished } : {}),
  });
});
