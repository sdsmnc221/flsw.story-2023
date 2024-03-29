<template>
  <section class="marquees-container" ref="nodeRef">
    <marquee-block
      v-for="(marquee, index) in xpMarquee.marquees"
      :key="`marquee-block-${index}`"
      :title="marquee.title"
      :cats="marquee.cats"
      :cats-images="marquee.img"
      :auto-expanded="marqueeExpandedIndex === index"
      :rotate="marquee.rotate"
      :translate-y="marquee.translateY"
      :translate-x="marquee.translateX"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import xpMarquee from "../../configs/xpMarquee.json";

const nodeRef = ref<HTMLElement | null>(null);

const marqueeExpandedIndex = ref<number>(
  Math.floor(Math.random() * xpMarquee.marquees.length)
);
const marqueeAutomataId = ref<number | null>(null);

const automataOn = () => {
  marqueeAutomataId.value = setInterval(() => {
    marqueeExpandedIndex.value = Math.floor(
      Math.random() * xpMarquee.marquees.length
    );
  }, 3200);
};

const automataOff = () => {
  if (marqueeAutomataId.value) {
    clearInterval(marqueeAutomataId.value);
    marqueeAutomataId.value = null;
  }
};

// Options for the Intersection Observer
const options = {
  threshold: 0.5, // Trigger the callback when 50% of the element is visible
};

// Callback function to handle intersection changes
const handleIntersection = (entries: any, _observer: any) => {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      // Element is inside the viewport
      automataOn();
    } else {
      // Element is outside the viewport
      automataOff();
    }
  });
};

onMounted(() => {
  // Create Intersection Observer instance
  const observer = new IntersectionObserver(handleIntersection, options);

  // Start observing the target element
  if (nodeRef.value) {
    observer.observe(nodeRef.value);
  }
});

onUnmounted(() => {
  automataOff();
});
</script>

<style lang="scss">
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
    // animation: blink ease-in-out 1.6s infinite;
    &:first-child {
      //transform: rotate(6deg) translateY(20vh);
      width: 110%;
    }
    &:nth-child(2) {
      //transform: rotate(0deg) translateY(22vh);
      width: 110%;
      text-align: center;
    }
    &:last-child {
      //transform: rotate(-3deg) translateY(20vh) translateX(-10vw);
      width: 110%;
    }
  }
}
</style>
