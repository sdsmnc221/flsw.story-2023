const createMedia = (path: string) => {
  return new Promise((resolve, reject) => {
    console.log(path);
    const url = new URL(path, import.meta.url).href;
    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(url);
    const isVideo = /\.(mp4|webm|ogg)$/i.test(url);

    console.log(url, path);

    if (isImage) {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    } else if (isVideo) {
      const video = document.createElement("video");
      video.onloadeddata = () => resolve(video);
      video.onerror = () => resolve(null);
      video.src = url;
    } else {
      // Unsupported file type
      reject(new Error("Unsupported media type"));
    }
  });
};

const resolveImages = (urlArray: string[]) => {
  return new Promise((resolve, _reject) => {
    const worker = new Worker(
      new URL(
        "/worker/image-worker.js?type=classic&worker_file",
        import.meta.url
      )
    );
    worker.postMessage(urlArray);
    worker.addEventListener(
      "message",
      async function (event): Promise<any> {
        const imagePromises = event.data.map(async (url: string) => {
          if (url) {
            return await createMedia(new URL(url, import.meta.url).href);
          }
        });
        const imageElements = await Promise.all(imagePromises);
        resolve(imageElements.filter(Boolean));
      },
      false
    );
  });
};

export const imageWorker = resolveImages;
