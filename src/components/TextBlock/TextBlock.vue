<template>
  <section
    class="text-block"
    :class="`${id} ${spacing === 'normal' ? 'text-block--spacing' : ''} ${
      spacing === 'xl' ? 'text-block--spacing-xl' : ''
    }`"
    :style="`background-color: var(--${background}); color: var(--${textColor}); --pseudo-background: var(--${pseudoBackground}); --background: var(--${background}); --next-background: var(--${nextSectionBackground});`"
  >
    <collage-block
      v-if="cllgFx"
      :section-id="id"
      :collage-fx="cllgFx"
    ></collage-block>

    <video-block
      v-if="videoFx"
      :section-id="id"
      :video-fx="videoFx"
    ></video-block>

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
  cllgFx?: string | null;
  videoFx?: string | null;
  id: string;
  spacing?: string | null;
}

withDefaults(defineProps<Props>(), {
  background: "clear-day-white",
  textColor: "tangora-dark-blue",
  pseudoBackground: "clear-day-white",
  nextSectionBackground: "clear-day-white",
  textPosition: "center",
  fx: "fx1",
  cllgFx: null,
  videoFx: null,
  spacing: null,
});
</script>

<style lang="scss">
.text-block {
  --perspective: 1500px;
  --grid-item-ratio: 1.32;
  --grid-width: 100%;
  --grid-height: auto;
  --grid-gap: 2vw;
  --grid-columns: 4;
  --grid-inner-scale: 1;

  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;

  text-align: left;

  position: relative;
  // margin-bottom: 20vh;
  // padding-bottom: 32vh;

  background: linear-gradient(
    to bottom,
    var(--background) 0%,
    var(--next-background) 100%
  );

  &--spacing.text-block {
    padding-bottom: 32vh !important;
  }

  &--spacing-xl.text-block {
    padding-bottom: 64vh !important;
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

    z-index: 10;
    position: relative;

    &--absolute {
      position: absolute;
    }

    &--top {
      top: -4vh;
    }

    &--bottom {
      bottom: -4vh;
    }

    &--center {
      top: 50%;
      transform: translateY(-50%);
    }

    &--left {
      padding-right: 48%;
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

    .section--3 {
      .text {
        &--center {
          transform: translateY(-64%);
        }
      }
    }

    .text {
      &--left {
        padding-right: 16%;
      }

      &--center {
        transform: translateY(-50%);
      }

      &--bottom {
        bottom: 4vh;
      }
    }

    &:has(.grid-wrap__gallery--grid10),
    &:has(.grid-wrap__gallery--grid),
    &:has(.grid-wrap__gallery--stack) {
      padding: 0;
    }
  }
}
</style>
