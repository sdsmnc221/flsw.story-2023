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
      :background="index % 2 === 0 ? 'clear-day-white' : 'shakespear-blue'"
      :text-color="
        section.fx === 'fx3' || index % 2 === 0
          ? 'tuscany-blue'
          : 'tangora-dark-blue'
      "
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

onMounted(() => {
  Splitting();

  setTimeout(() => {
    const fx1 = {
      id: "fx1",
      nodes: [
        ...document.querySelectorAll(
          ".text-block__content.fx1[data-splitting]"
        ),
      ],
    };

    const fx2 = {
      id: "fx2",
      nodes: [
        ...document.querySelectorAll(".text-block__title.fx2[data-splitting]"),
        ...document.querySelectorAll(
          ".text-block__subtitle.fx2[data-splitting]"
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

    initSmoothScrolling();

    scroll(fx1);
    scroll(fx2);
    scroll(fx3);

    scrollGrid(grid1);

    const pinSpacer = document.querySelector(".pin-spacer") as HTMLElement;
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
