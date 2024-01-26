<template>
  <main class="app">
    <section class="marquees-container">
      <marquee-block
        v-for="(marquee, index) in xpMarquee"
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
    </text-block>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { initSmoothScrolling, scroll, scrollGrid } from "./helpers/scrollFx";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import xpTitle from "./configs/xpTitle.json";
import xpContent from "./configs/xpContent.json";
import xpMarquee from "./configs/xpMarquee.json";

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

  return bindedProps;
};

onMounted(() => {
  Splitting();

  setTimeout(() => {
    const fx1 = {
      id: "fx1",
      nodes: [
        ...document.querySelectorAll(
          ".text-block:not(.section--2) .text-block__content.fx1[data-splitting]"
        ),
      ],
    };

    const fx1Section2 = {
      id: "fx2",
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
        ...document.querySelectorAll(
          ".text-block__content.fx3[data-splitting]"
        ),
      ],
    };

    const grid1 = {
      id: "cllg-fx1",
      node: document.querySelector(".section--1.grid"),
    };

    const grid2 = {
      id: "cllg-fx2",
      node: document.querySelector(".section--2.grid-wrap__gallery"),
    };

    const grid3 = {
      id: "cllg-fx3",
      node: document.querySelector(".section--3.grid-wrap__gallery"),
    };

    const grid4 = {
      id: "cllg-fx4",
      node: document.querySelector(".section--4.gallery"),
    };

    const grid5 = {
      id: "cllg-fx5",
      node: document.querySelector(".section--5.content-wrap"),
    };

    initSmoothScrolling();

    scroll(fx1Section2);
    scroll(fx2Section2);

    scrollGrid(grid1);
    scrollGrid(grid2);
    scrollGrid(grid3);
    scrollGrid(grid4);
    scrollGrid(grid5);

    scroll(fx1);
    scroll(fx2);

    scroll(fx3);

    const pinSpacer = document.querySelector(
      ".app > .pin-spacer:last-of-type"
    ) as HTMLElement;
    if (pinSpacer) {
      pinSpacer.style.backgroundColor = `var(--${
        xpContent.length % 2 !== 0 ? "clear-day-white" : "shakespear-blue"
      })`;
    }
  }, 640);
});
</script>

<style lang="scss">
.app {
  overflow: hidden;
  position: relative;
  width: 100%;

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
      &:first-child {
        transform: rotate(6deg) translateY(20vh);
        width: 110%;
      }
      &:nth-child(2) {
        transform: rotate(0deg) translateY(20vh);
        width: 110%;
        text-align: center;
      }
      &:last-child {
        transform: rotate(-3deg) translateY(20vh) translateX(-10vw);
        width: 110%;
      }
    }
  }
}
</style>
