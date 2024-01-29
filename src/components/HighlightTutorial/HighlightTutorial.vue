i
<template>
  <section class="highlight-tutorial">
    <p
      class="highlight-tutorial__title josefin-sans-600 --stroked"
      data-splitting
    >
      {{ title }}
    </p>
    <p
      class="highlight-tutorial__subtitle josefin-sans-600 --stroked"
      data-splitting
    >
      {{ subtitle }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { watch } from "vue";
import initHighlight from "../../helpers/hightlightFx";
interface Props {
  title: string;
  subtitle: string;
  active: boolean;
}

const props = defineProps<Props>();

// const emits = defineEmits(["onHighlightCompleted"]);

// const emitEvent = () => emits("onHighlightCompleted");

watch(
  () => props.active,
  (newVal) => {
    if (newVal) {
      initHighlight();
    }
  }
);
</script>

<style lang="scss">
.highlight-tutorial {
  position: fixed;
  width: 100%;
  height: 100vh;
  // background-color: rgba(0, 0, 0, 0.12);
  backdrop-filter: brightness(0.8);
  z-index: 10;
  pointer-events: none;
  overflow: hidden;
  transition: all 0.64s ease-in-out;

  &.--hidden {
    // background-color: rgba(0, 0, 0, 0);
    backdrop-filter: brightness(1);
    opacity: 0;
  }

  & > * {
    width: 100%;
  }

  &__subtitle {
    // opacity: 0;
    position: relative;
    font-size: 5rem;
    text-transform: lowercase;
    transform: rotate(-3deg) translateY(74vh) translateX(2.4vw);
  }

  &__title {
    // opacity: 0;
    position: relative;
    font-size: 4rem;
    left: 50%;
    transform: rotate(6deg) translateX(-20%) translateY(20vh);
  }

  .--stroked {
    letter-spacing: -0.2px;
    @supports (-webkit-text-stroke: 1px black) {
      -webkit-text-stroke: 0.72px var(--clear-day-white);
      -webkit-text-fill-color: transparent;
    }
  }

  &:not(.--hidden) ~ .marquees-container {
    .marquee-block {
      transition: filter 0.64s ease-in-out;

      &:hover {
        filter: contrast(1.6);
      }
    }
  }

  @media (max-width: 768px) {
    &__title {
      position: relative;
      font-size: 2.4rem;
      left: 0;
      transform: rotate(6deg) translateX(6vw) translateY(8vh);
      text-align: center;

      .word {
        margin-top: 12px;
      }
    }

    &__subtitle {
      font-size: 3.2rem;
      transform: rotate(-3deg) translateY(64vh) translateX(-4%);

      .word {
        margin-top: 20px;
      }
    }
  }
}
</style>
