<template>
  <main class="app">
    <text-block
      v-for="(section, index) of xpContent"
      :key="`section-${section.title}-${index}`"
      :subtitle="section.subtitle"
      :title="section.title"
      :background="index % 2 === 0 ? 'clear-day-white' : 'tuscany-blue'"
      :text-color="index % 2 === 0 ? 'tangora-dark-blue' : 'clear-day-white'"
      :fx="section.fx"
    >
      {{ section.text }}
    </text-block>

    <!-- <footer
      class="app__footer"
      :style="`background-color: var(--${
        xpContent.length % 2 === 0 ? 'tuscany-blue' : 'clear-day-white'
      });`"
    /> -->
  </main>
</template>

<script setup lang="ts">
import { nextTick, onMounted } from "vue";
import { initSmoothScrolling, scroll } from "./helpers/scrollFx";
import Splitting from "splitting";

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

    initSmoothScrolling();
    scroll(fx1);
    scroll(fx2);
  }, 640);
});
</script>

<style lang="scss">
.app {
  &__footer {
    width: 100vw;
    height: 32vh;
  }
}
</style>
