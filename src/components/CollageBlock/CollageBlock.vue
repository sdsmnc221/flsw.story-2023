<template>
  <div :class="`collage-block ${sectionId} grid --cllg-${collageFx}`">
    <div class="grid-wrap" v-if="collageFx.includes('1')">
      <div
        class="grid__item"
        v-for="(img, index) in computedCollage"
        :key="`${sectionId}-grid-item-${index}`"
      >
        <div class="grid__item-inner" :data-src="img" :data-section="sectionId">
          <video v-if="img.includes('mp4')" autoplay muted loop></video>
        </div>
      </div>
    </div>

    <div class="grid-wrap" v-if="collageFx.includes('2')">
      <div
        class="grid-wrap__gallery grid-wrap__gallery--grid10"
        :class="sectionId"
      >
        <div
          v-for="(img, index) in computedCollage"
          :key="`${sectionId}-grid-item-${index}`"
          :class="`grid__item pos-${index}`"
          :data-src="img"
          :data-section="sectionId"
        >
          <video v-if="img.includes('mp4')" autoplay muted loop></video>
        </div>
      </div>
    </div>

    <div class="grid-wrap grid-wrap--large" v-if="collageFx.includes('3')">
      <div
        class="grid-wrap__gallery grid-wrap__gallery--grid grid-wrap__gallery--breakout"
        :class="sectionId"
      >
        <div
          class="grid__item grid__item-cut"
          v-for="(img, index) in computedCollage"
          :key="`${sectionId}-grid-item-${index}`"
        >
          <div
            class="grid__item-inner"
            :data-src="img"
            :data-section="sectionId"
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
          v-for="(img, index) in computedCollage"
          :key="`${sectionId}-grid-item-${index}`"
          :data-src="img"
          :data-section="sectionId"
          @click="() => openCarousel(index)"
        ></div>
        <div class="grid__item grid__item--href" v-if="href">
          <p>{{ href.generic }}</p>
          <div>
            <a
              v-for="(link, index) in href.links"
              :key="`href-link-${sectionId}-${index}`"
              :href="link"
              :title="href.labels[index]"
              target="_blank"
              class="btn"
            >
              <span>{{ href.labels[index] }}</span>
            </a>
          </div>
        </div>
      </div>
      <highlight-carousel
        :active="carouselActive"
        :collage="computedCollage"
        :active-image-index="carouselImageActiveIndex"
        @onCloseCarousel="carouselActive = false"
        v-if="mob"
      ></highlight-carousel>
    </div>

    <div class="grid-wrap" v-if="collageFx.includes('5')">
      <div
        class="grid__item"
        v-for="(img, index) in computedCollage"
        :key="`${sectionId}-grid-item-${index}`"
      >
        <div class="grid__item-inner" :data-src="img" :data-section="sectionId">
          <video v-if="img.includes('mp4')" autoplay muted loop></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import shuffleArray from "../../helpers/shuffleArray";
import isMobile from "../../helpers/isMobile";

interface Props {
  collageFx?: string;
  sectionId: string;
  collage?: string[] | null;
  href?: any | null;
}

const props = withDefaults(defineProps<Props>(), {
  collageFx: "fx0",
  collage: null,
});

const emits = defineEmits(["onOpenCarousel", "onCloseCarousel"]);

const mob = ref<boolean>(isMobile());

const carouselActive = ref<boolean>(false);

const carouselImageActiveIndex = ref<number>(0);

const openCarousel = (index: number) => {
  carouselActive.value = true;
  carouselImageActiveIndex.value = index;
};

const computedCollage = computed<string[]>(() => {
  let collageArray: string[] = [];

  if (props.collage) {
    collageArray = [...props.collage];

    if (props.collageFx !== "fx4" && props.collageFx !== "fx3") {
      return shuffleArray(collageArray).map((img: string) => {
        if (mob.value) {
          if (props.collageFx === "fx2") {
            return `/img/${
              img.includes("mp4") ? img : img.replace(".jpg", "-mob.jpg")
            }`;
          }
        }
        return `/img/${img}`;
      });
    } else {
      return collageArray.map((img: string) => {
        if (mob.value) {
          if (props.collageFx === "fx3") {
            return `/img/${img.replace(".jpg", "-mob.jpg")}`;
          }
        }
        return `/img/${img}`;
      });
    }
  }
  return Array(24).fill("1.jpg");
});

watch(
  () => carouselActive.value,
  (active) => {
    if (active) {
      emits("onOpenCarousel");
    } else {
      emits("onCloseCarousel");
    }
  }
);
</script>

<style lang="scss" scoped>
.collage-block {
  --perspective: 1500px;

  --grid-width: 100%;
  --grid-height: auto;
  --grid-gap: 2vw;
  --grid-columns: 4;
  --grid-inner-scale: 1;

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
        width: calc(1 / var(--grid-inner-scale) * 100%) !important;
        height: calc(1 / var(--grid-inner-scale) * 100%) !important;
        background-size: contain;
        background-position: center top;
      }

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center bottom;
      }
    }
  }

  &.grid {
    position: relative;
    width: 100%;
    height: 100%;

    &.--cllg-fx1 {
      --grid-item-ratio: 1.32;
    }

    &.--cllg-fx5 {
      --grid-item-ratio: 1;
    }

    &.--cllg-fx1,
    &.--cllg-fx5 {
      display: grid;
      place-items: center;
      padding: 2rem;
      width: 100%;
      perspective: var(--perspective);

      transform: translateY(-16vh);
    }

    &.--cllg-fx2 {
      .grid {
        &-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          // display: flex;
          // align-items: center;
          // justify-content: center;
          overflow: hidden;

          &__gallery {
            position: relative;
            width: 100%;
            height: 100%;
            flex: none;

            &--grid10 {
              width: 100vw;
              height: 100vh;
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: repeat(8, 1fr);
              gap: 2vw;
            }

            .grid__item {
              background-size: cover;
              background-repeat: no-repeat;
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

              .grid__item {
                height: 33vh;
                width: 33vw;

                &__inner {
                  background-position: center bottom;
                }
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
      width: 100vw;
      height: 100%;
      overflow-x: hidden;

      .grid {
        &-wrap {
          position: relative;
          width: 100vw;
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

        &__item {
          &--href {
            display: flex;
            flex-direction: column;
            justify-content: center;

            div {
              display: flex;
              gap: 12px;
            }

            p {
              font-size: 0.64rem;
              text-transform: uppercase;
              font-weight: 700;
            }

            a {
              display: block;
            }
          }
        }
      }

      .grid-wrap__gallery--stack-glass .grid__item {
        filter: opacity(1);
      }

      .gallery--switch.grid-wrap__gallery--stack .grid__item {
        grid-area: 1 / 1 / 2 / 2;
      }

      .grid-wrap__gallery--stack-inverse .grid__item:nth-child(7) {
        position: absolute;
        bottom: 25%;

        left: 100vw;
        width: 100vw;

        opacity: 0;
        z-index: 0;
        overflow: visible;
      }

      .grid-wrap__gallery--stack-inverse .grid__item:nth-child(6) {
        z-index: 1;
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

      .grid-wrap__gallery--stack-inverse .grid__item:nth-child(1) {
        z-index: 7;
      }

      .grid-wrap__gallery--stack-inverse .grid__item:nth-child(7) {
        z-index: 8;
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

      .gallery--switch.grid-wrap__gallery--stack .grid__item:nth-child(7) {
        left: 0;
        opacity: 1;
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
    background-position: center center;
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
  }

  @media (max-width: 768px) {
    &.grid {
      &.--cllg-fx4 {
        .grid-wrap
          .grid-wrap__gallery--stack
          .grid__item:not(.grid__item--href) {
          border-radius: 1.5vw;
          width: 45.7vw;
          height: 64vw;
          z-index: 1;
        }

        .grid-wrap__gallery--stack-inverse .grid__item--href.grid__item {
          transform: scale(1);
          bottom: 72vh !important;
          left: 100vw !important;
        }

        .gallery--switch.grid-wrap__gallery--stack-inverse
          .grid__item--href.grid__item {
          bottom: 72vh !important;
          left: -10vw !important;
          opacity: 1;
          transform: scale(0.72);
        }

        .gallery--switch.grid-wrap__gallery--stack .grid__item {
          opacity: 0.24;
        }
      }

      &.--cllg-fx2 {
        .grid-wrap {
          width: 100vw;
          height: 100vh;

          .grid-wrap__gallery--grid10.gallery--switch {
            grid-template-columns: 1fr 72vw 1fr;
            grid-template-rows: 1fr calc(72vw * 9 / 16) 6fr;
            grid-gap: 0;
          }
        }
      }
    }
  }

  @media screen and (min-width: 53em) {
    &.grid {
      &.--cllg-fx2 {
        .grid-wrap {
          .grid-wrap__gallery--grid10 {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(4, 1fr);

            .grid__item {
              background-size: cover;
            }
          }
        }
      }

      &.--cllg-fx4 {
        .grid-wrap__gallery--stack-inverse .grid__item:nth-child(6) {
          z-index: 7;
        }
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

  .section--7 {
    .btn {
      width: 240px;
      font-size: 1rem;
    }
  }
  .btn {
    display: inline-block;
    border-radius: 7px;
    border: none;
    background: var(--tuscany-blue);
    color: var(--light-blue);
    text-align: center;
    font-size: 0.64rem;
    width: 120px;
    padding: 6px 12px;
    transition: all 0.4s;
    cursor: pointer;
    border-bottom: 6px solid var(--tangora-dark-blue);
    border-top: 3px solid var(--tuscany-blue);
    // border-top: 6px solid transparent;
    transition: all ease 0.64s;

    &:hover {
      background: var(--stone-blue);
      border-bottom-color: var(--stone-blue);
      border-top-color: transparent;
    }

    span {
      display: inline-block;
      position: relative;
      transition: 0.4s;
    }
  }
}
</style>
