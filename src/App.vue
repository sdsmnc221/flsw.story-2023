<template>
  <main class="app">
    <title-block :title="xpTitle.title" :subtitle="xpTitle.subtitle" />
    <text-block
      v-for="(section, index) of xpContent"
      :key="`section-${section.title}-${index}`"
      :subtitle="section.subtitle"
      :title="section.title"
      :background="index % 2 === 0 ? 'clear-day-white' : 'shakespear-blue'"
      :text-color="
        section.fx === 'fx3' || index % 2 === 0
          ? 'tuscany-blue'
          : 'clear-day-white'
      "
      :fx="section.fx"
    >
      {{ section.text }}
    </text-block>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { initSmoothScrolling, scroll } from "./helpers/scrollFx";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import xpTitle from "./configs/xpTitle.json";
import xpContent from "./configs/xpContent.json";

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

    initSmoothScrolling();
    scroll(fx1);
    scroll(fx2);
    scroll(fx3);

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
  &__footer {
    width: 100vw;
    height: 32vh;
  }
}
</style>
