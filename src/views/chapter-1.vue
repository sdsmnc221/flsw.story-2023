<template>
  <section class="app__chapter" ref="el">
    <text-block
      :id="`section--${index}`"
      :subtitle="xpContentData.subtitle"
      :title="xpContentData.title"
      :background="
        xpContentData.backgroundColor
          ? xpContentData.backgroundColor
          : index % 2 === 0
          ? 'clear-day-white'
          : 'shakespear-blue'
      "
      :text-color="
        xpContentData.textColor ? xpContentData.textColor : 'tuscany-blue'
      "
      :pseudo-background="
        xpContentData.pseudoBackgroundColor
          ? xpContentData.pseudoBackgroundColor
          : 'clear-day-white'
      "
      v-bind="computedBindedProps(xpContentData, index)"
      :fx="xpContentData.fx"
      @onOpenCarousel="carouselActive = true"
      @onCloseCarousel="carouselActive = false"
    >
      {{ xpContentData.text }}
    </text-block>
  </section>
</template>

<script setup lang="ts">
import {
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch,
  computed,
} from "vue";

import {
  initSmoothScrolling,
  scroll,
  scrollGrid,
  refreshScroll,
} from "../helpers/scrollFx";

import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import xpContent from "../configs/xpContent.json";

import onTutoActivated from "../helpers/customEvents/tutoActivated";

const xpContentData = computed(() => xpContent[1]);

const index = ref<number>(1);

const highlightActive = ref<boolean>(false);
const highlightActiveIndex = ref<string>("0");

const carouselActive = ref<boolean>(false);

const el = ref<HTMLElement | null>(null);

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

  if (section.videoRatio) {
    bindedProps.videoRatio = section.videoRatio;
  }

  if (section.href) {
    bindedProps.href = section.href;
  }

  return bindedProps;
};

const initScroll = () => {
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

  const video2 = {
    id: "video-fx1",
    node: document.querySelector(".section--9.video-block"),
    type: "video",
    sectionId: 9,
  };

  // scroll(fx1Section2);
  // scroll(fx2Section2);

  scrollGrid(collage1);

  // scroll(fx1);
  // scroll(fx1Section3);
  scroll(fx2);
  scroll(fx3);
};

onBeforeMount(() => {
  initSmoothScrolling();
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

    document.addEventListener("tutoActivated", (e: any) => {
      const { active, section } = e.detail as unknown as {
        active: boolean;
        section: number;
      };
      highlightActive.value = active;
      highlightActiveIndex.value = `${section}`;
    });

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

    setTimeout(() => {
      // Load assets
      const imgElements = document.querySelectorAll("div[data-source]");

      [...imgElements].forEach((element) => {
        const imageURL = element.getAttribute("data-source");
        const asset = window.assets?.find((a) => a.imageURL === imageURL);

        if (asset) {
          const objectURL = URL.createObjectURL(asset.blob);
          element.style.backgroundImage = `url(${objectURL})`;

          if (element.querySelector("video")) {
            const videoElement = element.querySelector(
              "video"
            ) as HTMLVideoElement;
            videoElement.src = objectURL;
          }
        }
      });
    }, 120);
  });
});
</script>

<style lang="scss">
.app {
  overflow: hidden;
  position: relative;
  width: 100%;

  &.--carousel-locked {
    overflow: hidden;
    height: var(--height-locked, 100vh);
  }

  &.--locked {
    width: 100%;
    height: 100svh;
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
