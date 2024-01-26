<template>
  <div class="video-block content-wrap" :class="sectionId">
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
</template>

<script setup lang="ts">
interface Props {
  sectionId: string;
  videoFx: string;
}

defineProps<Props>();
</script>

<style lang="scss">
.video-block {
  &.content-wrap {
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

  &.content-wrap .content:first-child {
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
