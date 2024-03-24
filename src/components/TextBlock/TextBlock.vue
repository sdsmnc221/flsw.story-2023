<template>
  <section
    class="text-block"
    :class="`${id} ${spacing === 'normal' ? 'text-block--spacing' : ''} ${
      spacing === 'xl' ? 'text-block--spacing-xl' : ''
    } ${spacing === 'xxl' ? 'text-block--spacing-xxl' : ''}`"
    :style="`background-color: var(--${background}); color: var(--${textColor}); --pseudo-background: var(--${pseudoBackground}); --background: var(--${background}); --next-background: var(--${nextSectionBackground});`"
  >
    <collage-block
      v-if="cllgFx"
      :section-id="id"
      :collage-fx="cllgFx"
      :collage="collage"
      :href="href"
      @onOpenCarousel="emits('onOpenCarousel')"
      @onCloseCarousel="emits('onCloseCarousel')"
    ></collage-block>

    <video-block
      v-if="videoFx"
      :section-id="id"
      :video-fx="videoFx"
      :has-collage="!!cllgFx"
      :video="video"
      :ratio="videoRatio"
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
      <div
        class="text-block__content"
        :class="`${fx} --background`"
        data-splitting
      >
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
  collage?: string[] | null;
  video?: string | null;
  videoRatio?: string;
  href?: any;
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
  collage: null,
  video: null,
  videoRatio: "16/9",
  href: null,
});

const emits = defineEmits(["onOpenCarousel", "onCloseCarousel"]);
</script>

<style lang="scss">
.text-block {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;

  top: -3.2px;

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
  &--spacing-xxl.text-block {
    padding-bottom: 148vh !important;
  }

  &:has(.fx3) {
    background: linear-gradient(
      to top,
      var(--shakespear-blue) 0%,
      var(--clear-day-white) 100%
    );
  }

  &:has(.--cllg-fx5) {
    overflow: visible;
    z-index: 14;
  }

  &__title {
    width: 100%;
    font-size: 2.4rem;
    line-height: 2.4rem;
  }

  &__subtitle {
    align-self: flex-start;
    font-size: 1.2rem;
    line-height: 1.6rem;
    text-transform: lowercase;
  }

  &__content {
    width: 100%;
    margin-top: 32px;
    font-size: 1.2rem;
    line-height: 1.6rem;
    position: relative;
    padding: 16px;

    &:not(.fx3) {
      &::after {
        content: "";
        position: absolute;
        top: 10%;
        left: 10%;
        width: 104%;
        height: 100%;
        z-index: -1;
        border-radius: 16px;

        transition: all 1.2s ease-in-out;
      }
      &::before {
        content: "";
        position: absolute;
        top: -5%;
        left: -10%;
        width: 104%;
        height: 100%;
        opacity: 0;
        z-index: -1;
        border-radius: 16px;

        transition: all 1.2s ease-in-out;
      }

      &.--background {
        &::after,
        &::before {
          background-color: var(--pseudo-background);
          opacity: 0.72;
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

    pointer-events: none;

    &--absolute {
      position: absolute;
    }

    &--top {
      top: -4vh;
    }

    &--bottom {
      bottom: -12vh;
    }

    &--bottom-special {
      bottom: -24vh;
      &.text--left {
        padding-right: 20%;
      }
    }

    &--center {
      top: 50%;
      transform: translateY(-50%);
    }

    &--center-special {
      left: 50%;
      top: 50%;
      transform: translateY(-50vh) translateX(-32vw);
      padding: 0 24vw;
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

      &--center-special {
        left: 50%;
        top: 50%;
        transform: translateY(-50vh) translateX(-50vw);
      }

      &--bottom {
        bottom: 4vh;
      }

      &--bottom-special {
        bottom: 0;
        &.text--left {
          padding-right: 24px;
          padding-left: 24px;
        }
      }
    }

    &:has(.grid-wrap__gallery--grid10),
    &:has(.grid-wrap__gallery--grid),
    &:has(.grid-wrap__gallery--stack) {
      padding: 0;
    }
  }

  @media screen and (min-width: 53em) {
    &--spacing.text-block {
      padding-bottom: 48vh !important;
    }

    &--spacing-xl.text-block {
      padding-bottom: 72vh !important;
    }

    .text {
      &--left {
        padding-right: 52%;
      }
    }

    &__subtitle {
      font-size: 1.4rem;
    }

    &__title {
      font-size: 2.8rem;
      line-height: 2.8rem;
    }

    &__content {
      font-size: 1.4rem;
    }
  }
}
</style>
