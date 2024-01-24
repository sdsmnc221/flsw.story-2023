<template>
  <section
    class="text-block"
    :class="{ 'text-block--spacing': fx !== 'fx3' }"
    :style="`background-color: var(--${background}); color: var(--${textColor}); --pseudo-background: var(--${pseudoBackground}); --background: var(--${background}); --next-background: var(--${nextSectionBackground});`"
  >
    <div class="grid" :class="id" v-if="id === 'section--1'">
      <div class="grid-wrap">
        <div class="grid__item" v-for="index in 48" :key="`grid-item-${index}`">
          <div
            class="grid__item-inner"
            style="background-image: url(img/1.jpg)"
          ></div>
        </div>
      </div>
    </div>

    <div
      :class="`text text--${textPosition} text--left text--absolute`"
      v-if="fx !== 'fx3'"
    >
      <p
        v-if="subtitle"
        class="text-block__subtitle josefin-sans-300 fx2"
        data-splitting
      >
        {{ subtitle }}
      </p>
      <h2
        v-if="title"
        class="text-block__title yeseva-one-regular fx2"
        data-splitting
      >
        {{ title }}
      </h2>
      <div class="text-block__content" :class="`${fx}`" data-splitting>
        <slot />
      </div>
    </div>
    <div
      class="text-block__content"
      :class="`${fx} josefin-sans-600`"
      data-splitting
      v-else
    >
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  subtitle?: string;
  title?: string;
  background?: string;
  textColor?: string;
  pseudoBackground?: string;
  nextSectionBackground?: string;
  textPosition?: "bottom" | "top" | "center";
  fx?: string;
  id: string;
}

withDefaults(defineProps<Props>(), {
  background: "clear-day-white",
  textColor: "tangora-dark-blue",
  pseudoBackground: "clear-day-white",
  nextSectionBackground: "clear-day-white",
  textPosition: "bottom",
  fx: "fx1",
});
</script>

<style lang="scss">
.text-block {
  --perspective: 1500px;
  --grid-item-ratio: 1.5;
  --grid-width: 100%;
  --grid-height: auto;
  --grid-gap: 2vw;
  --grid-columns: 4;
  --grid-inner-scale: 1;

  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  text-align: left;

  position: relative;
  // margin-bottom: 20vh;
  // padding-bottom: 32vh;

  background: linear-gradient(
    to bottom,
    var(--background) 0%,
    var(--next-background) 100%
  );

  &--spacing {
    padding-bottom: 64vh;
  }

  &:has(.fx3) {
    background: linear-gradient(
      to top,
      var(--shakespear-blue) 0%,
      var(--clear-day-white) 100%
    );
  }

  &__title {
    width: 100%;
    font-size: 2.4rem;
    line-height: 2rem;
  }

  &__subtitle {
    align-self: flex-start;
    font-size: 1.2rem;
    line-height: 1.2rem;
    text-transform: lowercase;
  }

  &__content {
    width: 100%;
    margin-top: 32px;
    font-size: 1.2rem;
    line-height: 1.6rem;
    position: relative;

    &:not(.fx3) {
      &::after {
        content: "";
        position: absolute;
        top: 10%;
        left: 10%;
        width: 100%;
        height: 100%;
        z-index: -1;

        transition: all 1.2s ease-in-out;
      }
      &::before {
        content: "";
        position: absolute;
        top: -5%;
        left: -10%;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: -1;

        transition: all 1.2s ease-in-out;
      }

      &.--background {
        &::after {
          background-color: var(--pseudo-background);
          opacity: 1;
        }

        &::before {
          background-color: var(--pseudo-background);
          opacity: 1;
        }
      }
    }

    &.fx3 {
      text-transform: uppercase;
      font-size: 3.2rem;
      padding: 0 16%;
      text-align: center;
      line-height: 3.2rem;
      padding: 0 24%;
    }
  }

  .text {
    width: 100vw;

    padding: 16%;

    display: flex;
    text-align: left;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &--absolute {
      position: absolute;
    }

    &--bottom {
      bottom: 8vh;
    }

    &--center {
      top: 50%;
      transform: translateY(-50%);
    }

    &--left {
      padding-right: 48%;
    }
  }

  .grid {
    display: grid;
    place-items: center;
    padding: 2rem;
    width: 100%;
    perspective: var(--perspective);

    transform: translateY(-16vh);

    &-wrap {
      height: var(--grid-height);
      width: var(--grid-width);
      display: grid;
      grid-template-columns: repeat(var(--grid-columns), 1fr);
      gap: var(--grid-gap);
      transform-style: preserve-3d;
    }

    &__item {
      aspect-ratio: var(--grid-item-ratio);
      width: 100%;
      height: auto;
      overflow: hidden;
      position: relative;
      border-radius: 8px;
      display: grid;
      place-items: center;
      mix-blend-mode: color-burn;

      &-inner {
        position: relative;
        width: calc(1 / var(--grid-inner-scale) * 100%);
        height: calc(1 / var(--grid-inner-scale) * 100%);
        background-size: cover;
        background-position: 50% 50%;
      }
    }
  }

  @media (max-width: 768px) {
    /* Styles for mobile devices */
    padding: 8%;
    &__title {
      // padding: 0 12%;
      font-size: 1.2rem;
    }
    &__content {
      // padding: 0 12%;

      &.fx3 {
        text-transform: uppercase;
        font-size: 2.8rem;
        padding: 0 4.8%;
        text-align: center;
        line-height: 2.4rem;
      }
    }

    .text {
      &--left {
        padding-right: 16%;
      }
    }
  }
}
</style>
