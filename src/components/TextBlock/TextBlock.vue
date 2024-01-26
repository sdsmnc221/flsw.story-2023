<template>
  <section
    class="text-block"
    :class="`${
      fx !== 'fx3' && id !== 'section--2' && id !== 'section--5'
        ? 'text-block--spacing'
        : ''
    } ${id}`"
    :style="`background-color: var(--${background}); color: var(--${textColor}); --pseudo-background: var(--${pseudoBackground}); --background: var(--${background}); --next-background: var(--${nextSectionBackground});`"
  >
    <collage-block
      v-if="cllgFx"
      :section-id="id"
      :collage-fx="cllgFx"
    ></collage-block>

    <div class="content-wrap" v-if="id === 'section--5'" :class="id">
      <div class="content content--layout content--layout-2">
        <div class="content__svg-wrapper --background">
          <svg
            class="content__img content__img--2"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1000 450"
          >
            <defs>
              <filter id="displacementFilter2">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.1"
                  numOctaves="1"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  result="displacement"
                  scale="100"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feMorphology
                  operator="dilate"
                  radius="2"
                  result="morph"
                  in="displacement"
                />
              </filter>
              <mask id="circleMask2">
                <circle
                  cx="50%"
                  cy="50%"
                  r="0"
                  data-value-final="950"
                  fill="white"
                  class="mask"
                  style="filter: url(#displacementFilter2)"
                />
              </mask>
            </defs>

            <foreignObject mask="url(#circleMask2)">
              <video controls>
                <source src="/img/sushi.mp4" type="video/mp4" />
              </video>
            </foreignObject>
          </svg>
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
  cllgFx?: string;
  id: string;
}

withDefaults(defineProps<Props>(), {
  background: "clear-day-white",
  textColor: "tangora-dark-blue",
  pseudoBackground: "clear-day-white",
  nextSectionBackground: "clear-day-white",
  textPosition: "center",
  fx: "fx1",
  cllgFx: "fx0",
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

  .content-wrap {
    display: flex;
    width: 100vw;
    height: 100%;
  }

  .content {
    display: flex;
    height: 100vh;
    padding-right: 16vh;
    padding-bottom: 0;
    width: 100%;
  }

  .content-wrap .content:first-child {
    height: 100vh;
  }

  .content__svg-wrapper {
    position: relative;
    width: auto;
    height: 48vh;
    aspect-ratio: 16/9;
    transform: rotate(-4deg);

    svg {
      width: 100%;
      height: 100%;
      z-index: 11;

      foreignObject,
      video {
        width: 100%;
        height: 100%;
      }

      video {
        filter: unset;
      }
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 7.2%;
      right: -7.2%;
      width: 100%;
      height: 100%;
      z-index: -1;
      display: block;
      transition: all 1.2s ease-in-out;
    }
    &::before {
      content: "";
      position: absolute;
      top: 7.2%;
      left: -7.2%;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: -1;
      display: block;
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

  .content--layout {
    justify-content: flex-end;
    align-items: flex-end;
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

      &--center {
        transform: translateY(-64%);
      }
    }

    &:has(.grid-wrap__gallery--grid10),
    &:has(.grid-wrap__gallery--grid),
    &:has(.grid-wrap__gallery--stack) {
      padding: 0;
    }

    .content {
      padding: 0;
      padding-bottom: 16vh;
      &__svg-wrapper {
        height: 28vh;
      }
    }
  }
}
</style>
