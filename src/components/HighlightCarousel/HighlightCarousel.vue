<template>
  <transition name="fade" mode="out-in">
    <div class="highlight-carousel" ref="nodeRef" v-show="active">
      <figure
        v-for="(image, index) in collage"
        :key="`hightlight-carousel-img-${image}-${index}`"
        :class="{ '--hidden': index !== imageIndex }"
      >
        <img :src="image" alt="highlight-carousel-img" />
      </figure>
    </div>
  </transition>

  <svg
    class="highlight-carousel__controller --previous"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 300"
    @click="previousImage"
  >
    <path
      fill="#c0d6df"
      d="M266.7 154.98a527.17 527.17 0 00-77.83-39.42c-2.29-.93-4.37.69-4.38 3.06-.06 17.18-.13 34.36-.19 51.54-35.3-7.03-70.9-12.5-106.68-16.39l-.57-13.99c-.15-3.58-5.15-3.47-6.01-.51-12.66-.37-25.16 1.21-37.35 4.82-2.32.69-2.51 3.8-.9 5.25l20.59 18.45c3.28 2.94 6.57 5.88 9.85 8.83 1.79 1.6 3.58 3.21 5.37 4.81 1.27 1.13 2.53 2.5 4.19 3.03 3.04.96 5.52-1.06 5.84-4.07.46-4.21-.29-8.83-.47-13.06l-.3-7.34c36.54 4.01 72.89 9.67 108.93 16.96 2.11.43 3.61-1.37 3.62-3.3.06-16.9.12-33.8.19-50.71 25.43 10.6 50 23.17 73.47 37.62 3.38 2.08 5.97-3.51 2.63-5.57zm-194.86 8.1c.15 3.79.31 7.58.46 11.38.01.29-.03 1.08-.06 1.98l-1.48-1.33-29.73-26.64c9.83-2.41 19.96-3.47 30.09-3.09.11 2.58.21 5.17.32 7.75l-.86-.09c-3.92-.4-5.05 5.65-1.11 6.06l2.22.24.15 3.76z"
    ></path>
  </svg>

  <svg
    class="highlight-carousel__controller --next"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 300"
    @click="nextImage"
  >
    <path
      fill="#c0d6df"
      d="M227.68 182.95c-20.16 4.41-40.6 7.36-61.19 8.75-9.9.67-19.9 1.17-29.82.92-6.73-.17-14.22-.92-19.96-4.79-7.49-5.05-6.75-13.98-5.35-21.87 1.74-9.84 3.07-19.7 3.58-29.69.43-8.51.93-17.73-1.98-25.9-2.62-7.37-7.96-12.78-15.22-15.65-17.34-6.87-39.26-1.01-54.55 8.23-3.57 2.16-.31 7.78 3.28 5.61 7.78-4.7 16.33-7.91 25.32-9.32 7.89-1.23 16.82-1.44 24.31 1.77 8.07 3.46 11.54 10.88 12.34 19.26.9 9.47.02 19.31-1.03 28.73-1.68 15.02-9.45 35 6.72 44.86 5.91 3.61 13.1 4.74 19.91 5.14 9.3.54 18.75 0 28.03-.54 22.65-1.28 45.19-4.41 67.35-9.26 4.08-.89 2.36-7.16-1.73-6.27z"
    ></path>
    <path
      fill="#c0d6df"
      d="M255.06 172.05l-55.25-3.36c-4.18-.25-4.16 6.25 0 6.5l50.33 3.06c-6.79 11.78-22.45 16.75-32.74 24.7-3.3 2.55 1.33 7.12 4.6 4.6 12.83-9.92 30.13-14.77 36.19-31.39.77-2.11-1.19-4-3.13-4.11z"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";

interface Props {
  collage: string[];
  active: boolean;
}

const props = defineProps<Props>();

const nodeRef = ref<any>(null);

const imageIndex = ref<number>(0);

const nextImage = () => {
  if (imageIndex.value < props.collage.length - 1) {
    imageIndex.value = imageIndex.value + 1;
  } else {
    imageIndex.value = 0;
  }

  console.log(imageIndex.value);
};

const previousImage = () => {
  if (imageIndex.value > 0) {
    imageIndex.value = imageIndex.value - 1;
  } else {
    imageIndex.value = props.collage.length - 1;
  }

  console.log(imageIndex.value);
};

// const emits = defineEmits(["onHighlightCompleted"]);

// const emitEvent = () => emits("onHighlightCompleted");

onMounted(() => {
  if (nodeRef.value) {
    nodeRef.value.click();

    setTimeout(() => {
      nodeRef.value.click();
    }, 120);
  }
});

watch(
  () => props.active,
  (newVal) => {
    if (newVal) {
      //   initHighlight();
    }
  }
);
</script>

<style lang="scss">
.collage-block:has(.highlight-carousel) {
  z-index: 11;
}

.highlight-carousel {
  position: fixed;
  width: 100%;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(3.2px);
  z-index: 10;
  pointer-events: none;
  overflow: hidden;
  transition: all 0.64s ease-in-out;

  &.--hidden {
    opacity: 0;
  }

  figure {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -64%);
    transition: opacity ease-in-out 0.64s;

    &.--hidden {
      opacity: 0;

      img {
        opacity: 0;
      }
    }

    img {
      display: inline-block;
      height: auto;
      width: 90vw;
      max-inline-size: none;
      max-block-size: none;
    }
  }

  &__controller {
    display: block;
    position: fixed;
    z-index: 10;
    width: 120px;
    height: auto;
    bottom: 12vh;
    cursor: pointer;

    &.--previous {
      left: 10%;
    }

    &.--next {
      right: 10%;
    }
  }

  @media (max-width: 768px) {
  }
}
</style>
