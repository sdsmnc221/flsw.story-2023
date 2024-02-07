<template>
  <main class="app --locked" v-show="showApp" v-if="isDevMode">
    <share-button></share-button>

    <highlight-tutorial
      :title="xpMarquee.indicator.title"
      :subtitle="xpMarquee.indicator.subtitle"
      :active="highlightActive"
      @onHighlightCompleted="initScroll"
    ></highlight-tutorial>

    <marquees-container :xp-marquee="xpMarquee"></marquees-container>
    <title-block :title="xpTitle.title" :subtitle="xpTitle.subtitle" />

    <text-block
      v-for="(section, index) of xpContent"
      :key="`section--${index}`"
      :id="`section--${index}`"
      :subtitle="section.subtitle"
      :title="section.title"
      :background="
        section.backgroundColor
          ? section.backgroundColor
          : index % 2 === 0
          ? 'clear-day-white'
          : 'shakespear-blue'
      "
      :text-color="section.textColor ? section.textColor : 'tuscany-blue'"
      :pseudo-background="
        section.pseudoBackgroundColor
          ? section.pseudoBackgroundColor
          : 'clear-day-white'
      "
      v-bind="computedBindedProps(section, index)"
      :fx="section.fx"
    >
      {{ section.text }}
      <business-card v-if="section.socialMedia"></business-card>
    </text-block>
  </main>
  <main class="app" v-show="showApp" v-else>
    <share-button></share-button>
    <!-- <highlight-tutorial
      :title="xpMarquee.indicator.title"
      :subtitle="xpMarquee.indicator.subtitle"
      :active="highlightActive"
      @onHighlightCompleted="initScroll"
    ></highlight-tutorial> -->

    <marquees-container></marquees-container>
    <title-block :title="xpTitle.title" :subtitle="xpTitle.subtitle" />

    <text-block
      v-for="(section, index) of xpContent"
      :key="`section--${index}`"
      :id="`section--${index}`"
      :subtitle="section.subtitle"
      :title="section.title"
      :background="
        section.backgroundColor
          ? section.backgroundColor
          : index % 2 === 0
          ? 'clear-day-white'
          : 'shakespear-blue'
      "
      :text-color="section.textColor ? section.textColor : 'tuscany-blue'"
      :pseudo-background="
        section.pseudoBackgroundColor
          ? section.pseudoBackgroundColor
          : 'clear-day-white'
      "
      v-bind="computedBindedProps(section, index)"
      :fx="section.fx"
    >
      {{ section.text }}
      <business-card v-if="section.socialMedia"></business-card>
    </text-block>
  </main>

  <paw-cursor></paw-cursor>
</template>

<script setup lang="ts">
import { nextTick, onBeforeMount, onMounted, ref, watch } from "vue";

import {
  initSmoothScrolling,
  scroll,
  scrollGrid,
  refreshScroll,
  scrollTo,
} from "./helpers/scrollFx";

import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import xpTitle from "./configs/xpTitle.json";
import xpContent from "./configs/xpContent.json";
import xpMarquee from "./configs/xpMarquee.json";

const showApp = ref<boolean>(false);

const isDevMode = ref<boolean>(import.meta.env.DEV);

const highlightActive = ref<boolean>(false);

const assetsLoaded = ref<boolean>(false);
const loaderLoaded = ref<boolean>(false);

const computedBindedProps = (section: any, index: number) => {
  const bindedProps: any = {};

  if (section.textPosition) {
    bindedProps.textPosition = section.textPosition;
  }

  if (index < xpContent.length - 1) {
    bindedProps.nextSectionBackground = xpContent[index + 1].backgroundColor;
  }

  if (section.cllgFx) {
    bindedProps.cllgFx = section.cllgFx;
  }

  if (section.spacing) {
    bindedProps.spacing = section.spacing;
  }

  if (section.videoFx) {
    bindedProps.videoFx = section.videoFx;
  }

  if (section.collage) {
    bindedProps.collage = section.collage;
  }

  if (section.video) {
    bindedProps.video = section.video;
  }

  return bindedProps;
};

const initScroll = () => {
  const fx1 = {
    id: "fx1",
    nodes: [
      ...document.querySelectorAll(
        ".text-block:not(.section--2):not(.section--3) .text-block__content.fx1[data-splitting]"
      ),
    ],
  };

  const fx1Section2 = {
    id: "fx1",
    nodes: [
      ...document.querySelectorAll(
        ".section--2 .text-block__content.fx1[data-splitting]"
      ),
    ],
    delayContent: true,
  };

  const fx1Section3 = {
    id: "fx1",
    nodes: [
      ...document.querySelectorAll(
        ".section--3 .text-block__content.fx1[data-splitting]"
      ),
    ],
    delayContent: true,
  };

  const fx2 = {
    id: "fx2",
    nodes: [
      ...document.querySelectorAll(
        ".text-block:not(.section--2) .text-block__title.fx2[data-splitting]"
      ),
      ...document.querySelectorAll(
        ".text-block:not(.section--2) .text-block__subtitle.fx2[data-splitting]"
      ),
    ],
  };

  const fx2Section2 = {
    id: "fx2",
    nodes: [
      ...document.querySelectorAll(
        ".section--2 .text-block__title.fx2[data-splitting]"
      ),
      ...document.querySelectorAll(
        ".section--2 .text-block__subtitle.fx2[data-splitting]"
      ),
    ],
  };

  const fx3 = {
    id: "fx3",
    nodes: [
      ...document.querySelectorAll(".text-block__content.fx3[data-splitting]"),
    ],
  };

  const collage1 = {
    id: "cllg-fx1",
    node: document.querySelector(".section--1.grid"),
    type: "collage",
    sectionId: 1,
  };

  const collage2 = {
    id: "cllg-fx2",
    node: document.querySelector(".section--2.grid-wrap__gallery"),
    type: "collage",
    sectionId: 2,
  };

  const collage3 = {
    id: "cllg-fx3",
    node: document.querySelector(".section--3.grid-wrap__gallery"),
    type: "collage",
    sectionId: 3,
  };

  const collage4 = {
    id: "cllg-fx4",
    node: document.querySelector(".section--4.grid-wrap__gallery"),
    type: "collage",
    sectionId: 4,
  };

  const collage5 = {
    id: "cllg-fx1",
    node: document.querySelector(".section--6.grid"),
    type: "collage",
    sectionId: 6,
  };

  const collage6 = {
    id: "cllg-fx4",
    node: document.querySelector(".section--7.grid-wrap__gallery"),
    type: "collage",
    sectionId: 7,
  };

  const collage7 = {
    id: "cllg-fx5",
    node: document.querySelector(".section--8.grid"),
    type: "collage",
    sectionId: 8,
  };

  const video1 = {
    id: "video-fx1",
    node: document.querySelector(".section--5.video-block"),
    type: "video",
    sectionId: 5,
  };

  setTimeout(() => {
    scroll(fx1Section2);
    scroll(fx2Section2);

    scrollGrid(collage1);
    scrollGrid(collage2);
    scrollGrid(collage3);
    scrollGrid(collage4);
    scrollGrid(collage5);
    scrollGrid(collage6);
    scrollGrid(collage7);
    scrollGrid(video1);

    scroll(fx1);
    scroll(fx1Section3);
    scroll(fx2);
    scroll(fx3);
  }, 1000);
};

onBeforeMount(() => {
  initSmoothScrolling();

  setTimeout(() => {
    showApp.value = true;
  }, 1000);
});

onMounted(() => {
  nextTick(() => {
    Splitting();

    initScroll();

    window.addEventListener("resize", () => {
      // cancelScroll();
      // cancelSmoothScrolling();

      // setTimeout(() => {
      //   initScroll();
      // }, 2000);

      refreshScroll();
    });

    document.addEventListener("assetsLoaded", () => {
      assetsLoaded.value = true;
    });

    document.addEventListener("loaderLoaded", () => {
      loaderLoaded.value = true;
    });

    window.addEventListener("scroll", () => {
      if (!document.querySelector("main.app")?.classList.contains("--locked")) {
        document
          .querySelector(".highlight-tutorial")
          ?.classList.add("--hidden");
      }

      if (window.scrollY <= 240) {
        // document
        //   .querySelector(".highlight-tutorial")
        //   ?.classList.remove("--hidden");
        // document.querySelector("main.app")?.classList.add("--locked");
      }
    });

    setTimeout(() => {
      const textBlocks = [...document.querySelectorAll(".text-block")];
      const BASE_INDEX = 16;
      textBlocks.forEach((block: any, index: number) => {
        if (
          block.parentElement &&
          block.parentElement.classList.contains("pin-spacer")
        ) {
          block.parentElement.style.zIndex = `${BASE_INDEX - index}`;
        } else {
          block.style.zIndex = `${BASE_INDEX - index} !important`;
        }
      });
    }, 640);

    setTimeout(() => {
      const pinSpacer = document.querySelector(
        ".app > .pin-spacer:last-of-type"
      ) as HTMLElement;
      if (pinSpacer) {
        pinSpacer.style.backgroundColor = `var(--${
          xpContent.length % 2 !== 0 ? "clear-day-white" : "shakespear-blue"
        })`;
      }
    }, 3200);
  });
});

watch(
  [() => assetsLoaded.value, () => loaderLoaded.value],
  ([assets, loader]) => {
    if (assets && loader) {
      highlightActive.value = true;
      scrollTo(0);
    }
  }
);
</script>

<style lang="scss">
.app {
  overflow: hidden;
  position: relative;
  width: 100%;

  &.--locked {
    width: 100%;
    height: 100dvh;
    overflow: hidden;

    .title-block {
      .word {
        opacity: 0;
      }
    }
  }

  .title-block {
    transition: opacity 0.64s ease-in-out;
    opacity: 1;
  }

  .text-block {
    .business-card {
      position: absolute;
      right: -32vw;
    }
  }

  &.--retina {
    @media (min-width: 1440px) {
      .highlight-tutorial {
        &__title {
          transform: rotate(6deg) translateX(-28vw) translateY(20vh);
        }
        &__subtitle {
          transform: rotate(-3deg) translateY(80vh) translateX(2.4vw);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .text-block {
      &:has(.business-card) {
        height: 120vh;
      }

      .business-card {
        right: 0;
        bottom: -48vh;
      }
    }
  }
}
</style>
