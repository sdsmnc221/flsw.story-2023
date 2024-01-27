<template>
  <div
    class="paw-cursor"
    :class="{ '--mobile': mobile }"
    :style="{ top: mouse.y + 'px', left: mouse.x + 'px' }"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import isMobile from "../../helpers/isMobile";

const mobile = ref<boolean>(isMobile());

const LERP_FACTOR = 0.1;

const mouse = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const target = ref<{ x: number; y: number }>({ x: 0, y: 0 });

const updateCursorPosition = (event: any) => {
  target.value.x = event.clientX;
  target.value.y = event.clientY;
};
const updateCursor = () => {
  const dx = target.value.x - mouse.value.x;
  const dy = target.value.y - mouse.value.y;
  mouse.value.x += dx * LERP_FACTOR;
  mouse.value.y += dy * LERP_FACTOR;
};

onMounted(() => {
  mobile.value = isMobile();

  window.addEventListener("resize", () => {
    mobile.value = isMobile();
  });

  window.addEventListener("mousemove", updateCursorPosition);

  setInterval(updateCursor, 1000 / 60);
});
</script>

<style lang="scss">
body {
  &:has(.paw-cursor.--mobile) {
    cursor: auto;
  }
  &:has(.paw-cursor) {
    cursor: none;
  }
}
.paw-cursor {
  position: fixed;
  width: 32px; /* Set the width of your cursor */
  height: 32px; /* Set the height of your cursor */
  background: url("/img/cursor.png") no-repeat center center;
  background-size: cover;
  pointer-events: none; /* Allow interactions with elements beneath the cursor */
  transform: translate(-50%, -50%) rotate(-24deg);
  z-index: 98;

  &.--mobile {
    display: none;
  }
}
</style>
