<template>
  <transition name="fade" mode="out-in">
    <div class="loader-block" v-show="loading">
      <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
      </div>
      <div class="loader-block__status yeseva-one-regular">
        <span v-if="firstLoading === true"
          >En cours d'appeler les Chachouilles !</span
        >
        <span v-else>Un instant de réparation !</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import isMobile from "../../helpers/isMobile";
import { preloadImages } from "../../helpers/preloadAssets";

interface Props {}

defineProps<Props>();

const loading = ref<boolean>(true);
const firstLoading = ref<boolean>(true);

onMounted(() => {
  preloadImages([".grid__item-inner", ".grid__item"]).then((a) => {
    console.log(a);
    setTimeout(() => {
      loading.value = false;
      setTimeout(() => {
        firstLoading.value = false;
      }, 1000);
    }, 3200);
  });

  window.addEventListener("resize", (e: any) => {
    if (
      !isMobile() ||
      (isMobile() && window.innerWidth !== e.currentTarget.outerWidth)
    ) {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
      }, 1600);
    }
  });
});
</script>

<style lang="scss" scoped>
@import "../../styles/fonts";
@import "../../styles/animations";

.loader-block {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: var(--light-blue);
  overflow: hidden;
  z-index: 97;

  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    animation: grain 8s steps(10) infinite;
    background-image: url(/img/noise.png);
    content: "";
    height: 300%;
    left: -50%;
    opacity: 0.6;
    position: fixed;
    top: -100%;
    width: 300%;
    z-index: 16;
    pointer-events: none;
  }

  &__status {
    color: var(--tuscany-blue);
    transform: translateY(12vh);
    font-size: 0.9rem;
    letter-spacing: 2px;
  }

  .wrapper {
    width: 200px;
    height: 60px;
    position: relative;
    z-index: 1;
    transform: scale(3.2);
    transform-origin: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scale(3.2) translate(-50%, -50%);
  }

  .circle {
    width: 32px;
    height: 32px;
    position: absolute;
    border-radius: 0;
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    left: 10%;
    transform-origin: 50%;
    animation: circle7124 0.72s alternate infinite ease;

    &:nth-child(1) {
      background-image: url(/img/cat1.svg);
    }
    &:nth-child(2) {
      background-image: url(/img/cat2.svg);
    }
    &:nth-child(3) {
      background-image: url(/img/cat3.svg);
    }
  }

  @keyframes circle7124 {
    0% {
      top: 60px;
      height: 8px;
      border-radius: 0;
      transform: scaleX(1.7);
    }

    40% {
      height: 32px;
      border-radius: 0;
      transform: scaleX(1);
    }

    100% {
      top: 0%;
    }
  }

  .circle:nth-child(2) {
    left: 42%;
    animation-delay: 0.2s;
  }

  .circle:nth-child(3) {
    left: auto;
    right: 11%;
    animation-delay: 0.3s;
  }

  .shadow {
    width: 16px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.48);
    position: absolute;
    top: 62px;
    transform-origin: 50%;
    z-index: -1;
    left: 15%;
    filter: blur(1px);
    animation: shadow046 0.5s alternate infinite ease;
  }

  @keyframes shadow046 {
    0% {
      transform: scaleX(1.5);
    }

    40% {
      transform: scaleX(1);
      opacity: 0.7;
    }

    100% {
      transform: scaleX(0.2);
      opacity: 0.4;
    }
  }

  .shadow:nth-child(4) {
    left: 45%;
    animation-delay: 0.2s;
  }

  .shadow:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }

  @media (max-width: 768px) {
    .wrapper {
      transform: scale(1.8) translate(-50%, -50%);
    }
  }
}
</style>
