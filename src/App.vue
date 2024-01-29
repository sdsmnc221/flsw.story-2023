<template>
  <main class="app --locked" v-show="showApp">
    <share-button></share-button>
    <highlight-tutorial
      :title="xpMarquee.indicator.title"
      :subtitle="xpMarquee.indicator.subtitle"
      :active="highlightActive"
      @onHighlightCompleted="initScroll"
    ></highlight-tutorial>

    <section class="marquees-container">
      <marquee-block
        v-for="(marquee, index) in xpMarquee.marquees"
        :key="`marquee-block-${index}`"
        :title="marquee.title"
        :cats="marquee.cats"
      />
    </section>
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
  <!-- <transition name="fade" mode="out-in">
    <loader-block v-if="loading" :first-loading="firstLoading"></loader-block>
  </transition> -->
  <paw-cursor></paw-cursor>
</template>

<script setup lang="ts">
import { nextTick, onBeforeMount, onMounted, ref } from "vue";
import { lock, unlock } from "tua-body-scroll-lock";
import {
  initSmoothScrolling,
  scroll,
  scrollGrid,
  refreshScroll,
  scrollTo,
} from "./helpers/scrollFx";
import { preloadImages } from "./helpers/preloadAssets";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import xpTitle from "./configs/xpTitle.json";
import xpContent from "./configs/xpContent.json";
import xpMarquee from "./configs/xpMarquee.json";

const showApp = ref<boolean>(false);

const highlightActive = ref<boolean>(false);

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

  return bindedProps;
};

const initScroll = () => {
  const fx1 = {
    id: "fx1",
    nodes: [
      ...document.querySelectorAll(
        ".text-block:not(.section--2) .text-block__content.fx1[data-splitting]"
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
  };

  const collage2 = {
    id: "cllg-fx2",
    node: document.querySelector(".section--2.grid-wrap__gallery"),
    type: "collage",
  };

  const collage3 = {
    id: "cllg-fx3",
    node: document.querySelector(".section--3.grid-wrap__gallery"),
    type: "collage",
  };

  const collage4 = {
    id: "cllg-fx4",
    node: document.querySelector(".section--4.grid-wrap__gallery"),
    type: "collage",
  };

  const collage5 = {
    id: "cllg-fx1",
    node: document.querySelector(".section--6.grid"),
    type: "collage",
  };

  const collage6 = {
    id: "cllg-fx4",
    node: document.querySelector(".section--7.grid-wrap__gallery"),
    type: "collage",
  };

  const collage7 = {
    id: "cllg-fx5",
    node: document.querySelector(".section--8.grid"),
    type: "collage",
  };

  const video1 = {
    id: "video-fx1",
    node: document.querySelector(".section--5.video-block"),
    type: "video",
  };

  preloadImages([
    ".grid__item-inner",
    ".grid__item",
    ".loader-block .circle",
  ]).then(() => {
    setTimeout(() => {
      initSmoothScrolling();

      highlightActive.value = true;

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
      scroll(fx2);
      scroll(fx3);

      setTimeout(() => {
        unlock(document.querySelector("main.app") as HTMLElement);
        scrollTo(0);
      }, 200);
    }, 1000);
  });
};

onBeforeMount(() => {
  setTimeout(() => {
    showApp.value = true;
  }, 1000);
});

onMounted(() => {
  nextTick(() => {
    lock(document.querySelector("main.app") as HTMLElement);

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

    const pinSpacer = document.querySelector(
      ".app > .pin-spacer:last-of-type"
    ) as HTMLElement;
    if (pinSpacer) {
      pinSpacer.style.backgroundColor = `var(--${
        xpContent.length % 2 !== 0 ? "clear-day-white" : "shakespear-blue"
      })`;
    }

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
  });
});
</script>

<style lang="scss">
.app {
  overflow: hidden;
  position: relative;
  width: 100%;

  &.--locked {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .title-block {
      .word {
        opacity: 0;
      }
    }
  }

  .marquees-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 12vh;

    & > .marquee-block {
      transform-origin: "left";
      animation: blink ease-in-out 1.6s infinite;
      &:first-child {
        transform: rotate(6deg) translateY(20vh);
        width: 110%;
      }
      &:nth-child(2) {
        transform: rotate(0deg) translateY(22vh);
        width: 110%;
        text-align: center;
      }
      &:last-child {
        transform: rotate(-3deg) translateY(20vh) translateX(-10vw);
        width: 110%;
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
          transform: rotate(6deg) translateX(-28vw) translateY(22vh);
        }
        &__subtitle {
          font-size: 4rem;
          transform: rotate(-3deg) translateY(76vh) translateX(2.4vw);
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
