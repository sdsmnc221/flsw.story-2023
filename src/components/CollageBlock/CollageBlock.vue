<template>
  <div :class="`collage-block ${sectionId} grid --cllg-${collageFx}`">
    <div class="grid-wrap" v-if="collageFx.includes('1')">
      <div
        class="grid__item"
        v-for="(img, index) in computedCollage"
        :key="`${sectionId}-grid-item-${index}`"
      >
        <div
          class="grid__item-inner"
          :style="`${
            img.includes('jpg') ? `background-image: url(${img})` : ''
          }`"
        >
          <video v-if="img.includes('mp4')" autoplay muted loop>
            <source :src="img" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>

    <div class="grid-wrap" v-if="collageFx.includes('2')">
      <div
        class="grid-wrap__gallery grid-wrap__gallery--grid10"
        :class="sectionId"
      >
        <div
          v-for="index in 16"
          :key="`${sectionId}-grid-item-${index}`"
          :class="`grid__item pos-${index}`"
          style="background-image: url(img/2.jpg)"
        ></div>
      </div>
    </div>

    <div class="grid-wrap grid-wrap--large" v-if="collageFx.includes('3')">
      <div
        class="grid-wrap__gallery grid-wrap__gallery--grid grid-wrap__gallery--breakout"
        :class="sectionId"
      >
        <div
          class="grid__item grid__item-cut"
          v-for="index in 9"
          :key="`${sectionId}-grid-item-${index}`"
        >
          <div
            class="grid__item-inner"
            style="background-image: url(img/3.jpg)"
          ></div>
        </div>
      </div>
    </div>

    <div class="grid-wrap grid-wrap--dense" v-if="collageFx.includes('4')">
      <div
        class="grid-wrap__gallery grid-wrap__gallery--stack grid-wrap__gallery--stack-inverse grid-wrap__gallery--stack-dark"
        :class="sectionId"
      >
        <div
          class="grid__item"
          v-for="index in 5"
          :key="`${sectionId}-grid-item-${index}`"
          style="background-image: url(img/4.jpg)"
        ></div>
      </div>
    </div>

    <div class="grid-wrap" v-if="collageFx.includes('5')">
      <div
        class="grid__item"
        v-for="index in 48"
        :key="`${sectionId}-grid-item-${index}`"
      >
        <div
          class="grid__item-inner"
          style="background-image: url(img/1.jpg)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import shuffleArray from "../../helpers/shuffleArray";

interface Props {
  collageFx?: string;
  sectionId: string;
  collage?: string[] | null;
}

const props = withDefaults(defineProps<Props>(), {
  collageFx: "fx0",
  collage: null,
});

const computedCollage = computed<string[]>(() => {
  if (props.collage) {
    let collageArray = [...props.collage];
    if (collageArray.length < 24) {
      collageArray = [
        ...collageArray,
        ...Array(24 - collageArray.length).fill("1.jpg"),
      ];
    }
    return shuffleArray(collageArray).map((img: string) => `/img/${img}`);
  } else {
    return Array(24).fill("/img/1.jpg");
  }
});
</script>

<style lang="scss">
.collage-block {
  --perspective: 1500px;

  --grid-width: 100%;
  --grid-height: auto;
  --grid-gap: 2vw;
  --grid-columns: 4;
  --grid-inner-scale: 1;

  transition: all 0.64s ease-in-out;

  &.grid {
    position: relative;
    width: 100%;
    height: 100%;

    &.--cllg-fx1 {
      --grid-item-ratio: 1.32;
    }

    &.--cllg-fx5 {
      --grid-item-ratio: 1.5;
    }

    &.--cllg-fx1,
    &.--cllg-fx5 {
      display: grid;
      place-items: center;
      padding: 2rem;
      width: 100%;
      perspective: var(--perspective);

      transform: translateY(-16vh);

      .grid {
        &-wrap {
          height: var(--grid-height);
          width: var(--grid-width);
          display: grid;
          grid-template-columns: repeat(var(--grid-columns), 1fr);
          gap: var(--grid-gap);
          transform-style: preserve-3d;
          place-items: center;
          overflow-y: visible;
        }

        &__item {
          aspect-ratio: var(--grid-item-ratio);
          width: 100%;
          height: auto;
          overflow: hidden;
          position: relative;
          border-radius: 16px;
          display: grid;
          place-items: center;

          &-inner {
            position: relative;
            width: calc(1 / var(--grid-inner-scale) * 100%);
            height: calc(1 / var(--grid-inner-scale) * 100%);
            background-size: cover;
            background-position: 50% 50%;
          }
        }
      }
    }

    &.--cllg-fx2 {
      .grid {
        &-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          &__gallery {
            position: relative;
            width: 100%;
            height: 100%;
            flex: none;

            &--grid10 {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 2vw;
            }
          }
        }
      }

      .grid-wrap {
        .grid-wrap__gallery--grid10.gallery--switch {
          grid-template-columns: 1fr 52vw 1fr;
          grid-template-rows: 1fr calc(52vw * 9 / 16) 1fr;
          grid-gap: 0;

          .grid__item {
            grid-area: 2 / 2 / 3 / 3;
          }
        }
      }
    }

    &.--cllg-fx3 {
      position: relative;
      width: 100%;
      height: 100%;

      .grid {
        &-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          .grid-wrap__gallery {
            position: relative;
            width: 100%;
            height: 100%;
            flex: 0 0 auto;
          }

          &--large {
            height: 110vh;
          }

          &__gallery {
            &--grid {
              height: auto;
              display: grid;
              grid-template-columns: repeat(3, auto);
              grid-template-rows: repeat(3, auto);
              row-gap: 2.5vw;
              column-gap: 3vw;

              grid__item {
                height: 33vh;
                width: 33vw;
              }
            }
          }
        }
      }

      .grid-wrap {
        .grid-wrap__gallery {
          &--breakout.gallery--switch {
            width: min-content;
            flex: none;
            height: auto;
            gap: 0;

            .grid__item {
              height: 110vh;
              width: 110vw;
              filter: brightness(0.65);
            }
          }
        }
      }
    }

    &.--cllg-fx4 {
      position: relative;
      width: 100%;
      height: 100%;

      .grid {
        &-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          &--dense {
            margin: 0;
          }

          &__gallery {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .grid-wrap__gallery--stack {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            align-items: start;
            justify-content: start;
            gap: 2rem;
            padding: 2rem;
            --offset: 1rem;
          }

          .grid-wrap__gallery--stack .grid__item {
            border-radius: 1.5vw;
            width: 25vw;
            height: 35vw;
            z-index: 1;
          }
        }
      }

      .grid-wrap__gallery--stack-glass .grid__item {
        filter: opacity(1);
      }

      .gallery--switch.grid-wrap__gallery--stack .grid__item {
        grid-area: 1 / 1 / 2 / 2;
      }

      .grid-wrap__gallery--stack-inverse .grid__item:nth-child(5) {
        z-index: 2;
      }
      .grid-wrap__gallery--stack-inverse .grid__item:nth-child(4) {
        z-index: 3;
      }
      .grid-wrap__gallery--stack-inverse .grid__item:nth-child(3) {
        z-index: 4;
      }
      .grid-wrap__gallery--stack-inverse .grid__item:nth-child(2) {
        z-index: 5;
      }
      .grid-wrap__gallery--stack-inverse .grid__item:nth-child(1) {
        z-index: 6;
      }

      .gallery--switch.grid-wrap__gallery--stack .grid__item:nth-child(2) {
        margin-left: var(--offset);
      }

      .gallery--switch.grid-wrap__gallery--stack .grid__item:nth-child(3) {
        margin-left: calc(var(--offset) * 2);
      }

      .gallery--switch.grid-wrap__gallery--stack .grid__item:nth-child(4) {
        margin-left: calc(var(--offset) * 3);
      }

      .gallery--switch.grid-wrap__gallery--stack .grid__item:nth-child(5) {
        margin-left: calc(var(--offset) * 4);
      }

      .gallery--switch.grid-wrap__gallery--stack .grid__item:nth-child(6) {
        margin-left: calc(var(--offset) * 5);
      }

      .gallery--switch.grid-wrap__gallery--stack-dark .grid__item:nth-child(2) {
        filter: brightness(0.8);
      }

      .gallery--switch.grid-wrap__gallery--stack-dark .grid__item:nth-child(3) {
        filter: brightness(0.7);
      }

      .gallery--switch.grid-wrap__gallery--stack-dark .grid__item:nth-child(4) {
        filter: brightness(0.6);
      }

      .gallery--switch.grid-wrap__gallery--stack-dark .grid__item:nth-child(5) {
        filter: brightness(0.5);
      }

      .gallery--switch.grid-wrap__gallery--stack-dark .grid__item:nth-child(6) {
        filter: brightness(0.4);
      }

      .gallery--switch.grid-wrap__gallery--stack-glass .grid__item {
        opacity: 0.7;
      }

      .gallery--switch.grid-wrap__gallery--stack-scale
        .grid__item:nth-child(2) {
        transform: scale(0.98);
      }

      .gallery--switch.grid-wrap__gallery--stack-scale
        .grid__item:nth-child(3) {
        transform: scale(0.96);
      }

      .gallery--switch.grid-wrap__gallery--stack-scale
        .grid__item:nth-child(4) {
        transform: scale(0.94);
      }

      .gallery--switch.grid-wrap__gallery--stack-scale
        .grid__item:nth-child(5) {
        transform: scale(0.92);
      }

      .gallery--switch.grid-wrap__gallery--stack-scale
        .grid__item:nth-child(6) {
        transform: scale(0.9);
      }
    }
  }

  .grid__item {
    background-position: 50% 50%;
    background-size: cover;
    flex: none;
    border-radius: 16px;
    position: relative;
    filter: brightness(1);
  }

  .grid__item-cut {
    overflow: hidden;
    display: grid;
    place-items: center;
  }

  .grid__item-inner {
    width: 100%;
    height: 100%;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;

    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center bottom;
    }
  }

  @media (max-width: 768px) {
    &.grid {
      &.--cllg-fx4 {
        .grid-wrap .grid-wrap__gallery--stack .grid__item {
          border-radius: 1.5vw;
          width: 45.7vw;
          height: 64vw;
          z-index: 1;
        }
      }
    }
  }

  @media screen and (min-width: 53em) {
    &.grid {
      &.--cllg-fx2 {
        .grid-wrap {
          .grid-wrap__gallery--grid10 {
            grid-template-columns: repeat(10, 1fr);
            grid-template-rows: repeat(4, 1fr);

            // &:not(.gallery--switch) {
            //   .pos-1 {
            //     grid-area: 1 / 1;
            //   }
            //   .pos-2 {
            //     grid-area: 1 / 2;
            //   }
            //   .pos-3 {
            //     grid-area: 1 / 4;
            //   }
            //   .pos-4 {
            //     grid-area: 1 / 5;
            //   }
            //   .pos-5 {
            //     grid-area: 3 / 6;
            //   }
            //   .pos-6 {
            //     grid-area: 1 / 7;
            //   }
            //   .pos-7 {
            //     grid-area: 1 / 9;
            //   }
            //   .pos-8 {
            //     grid-area: 3 / 10;
            //   }
            //   .pos-9 {
            //     grid-area: 2 / 8;
            //   }
            //   .pos-10 {
            //     grid-area: 4 / 9;
            //   }
            //   .pos-11 {
            //     grid-area: 3 / 8;
            //   }
            //   .pos-12 {
            //     grid-area: 2 / 2;
            //   }
            //   .pos-13 {
            //     grid-area: 3 / 1;
            //   }
            //   .pos-14 {
            //     grid-area: 3 / 4;
            //   }
            //   .pos-15 {
            //     grid-area: 4 / 3;
            //   }
            //   .pos-16 {
            //     grid-area: 4 / 7;
            //   }
            // }
          }
        }
      }

      &.--cllg-fx4 {
        .grid-wrap__gallery--stack-inverse .grid__item:nth-child(5) {
          z-index: 6;
        }
        .grid-wrap__gallery--stack-inverse .grid__item:nth-child(4) {
          z-index: 5;
        }
        .grid-wrap__gallery--stack-inverse .grid__item:nth-child(3) {
          z-index: 4;
        }
        .grid-wrap__gallery--stack-inverse .grid__item:nth-child(2) {
          z-index: 3;
        }
        .grid-wrap__gallery--stack-inverse .grid__item:nth-child(1) {
          z-index: 2;
        }
      }
    }
  }
}
</style>
