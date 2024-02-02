import isMobile from "../isMobile";
import xpContent from "../../configs/xpContent.json";
import { flattenDeep } from "lodash";

const mob = isMobile();

const imgUrls = flattenDeep(xpContent.map((chapter) => chapter.collage ?? []))
  .map((asset: string) =>
    asset.includes(".jpg") && mob ? asset.replace(".jpg", "-mob.jpg") : asset
  )
  .map((asset: string) => ({
    path: `/img/${asset}`,
    type: asset.includes(".jpg") ? "jpg" : "mp4",
  }));

export default imgUrls;
