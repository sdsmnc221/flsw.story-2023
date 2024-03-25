<template>
  <div class="assets-preload">
    <div
      v-for="(asset, index) in computedAssets"
      :key="`formatted-assets-${asset}-${index}`"
      :data-src="asset"
      :data-section="`section--${sectionIndex}`"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import isMobile from "../../helpers/isMobile";
import shuffleArray from "../../helpers/shuffleArray";

interface Props {
  collage: string[];
  fx: string;
  sectionIndex: number;
}

const props = defineProps<Props>();

const mob = isMobile();

const formatAssets = (collageArray: string[], collageFx: string): string[] => {
  if (collageFx !== "fx4" && collageFx !== "fx3") {
    return shuffleArray(collageArray).map((img: string) => {
      if (mob) {
        if (collageFx === "fx2") {
          return `/img/${
            img.includes("mp4") ? img : img.replace(".jpg", "-mob.jpg")
          }`;
        }
      }
      return `/img/${img}`;
    });
  } else {
    return collageArray.map((img: string) => {
      if (mob) {
        if (collageFx === "fx3") {
          return `/img/${img.replace(".jpg", "-mob.jpg")}`;
        }
      }
      return `/img/${img}`;
    });
  }
};

const computedAssets = computed(() => formatAssets(props.collage, props.fx));
</script>

<style lang="scss">
.assets-preload {
  opacity: 0;
  ppinter-events: none;
}
</style>
