<template>
  <transition name="fade" mode="out-in">
    <div class="loader-block" v-show="loading">
      <div class="three-body">
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
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

const loading = ref<boolean>(false);
const firstLoading = ref<boolean>(true);

onMounted(() => {
  preloadImages([".loader-block .circle"]).then(() => {
    loading.value = true;
  });

  preloadImages([".grid__item-inner", ".grid__item", ".marquee__img"]).then(
    (a) => {
      console.log(a);
      setTimeout(() => {
        loading.value = false;
        setTimeout(() => {
          firstLoading.value = false;
        }, 1000);
      }, 1600);
    }
  );

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

  .three-body {
    --loader-size: 240px;
    --loader-speed: 1.2s;
    position: fixed;
    display: inline-block;
    height: var(--loader-size);
    width: var(--loader-size);
    animation: spin calc(var(--loader-speed) * 2.5) infinite linear;
    top: calc(50vh - var(--loader-size) / 1.5);
  }

  .three-body__dot {
    position: absolute;
    height: 100%;
    width: 30%;
  }

  .three-body__dot:after {
    content: "";
    position: absolute;
    height: 0%;
    width: 100%;
    padding-bottom: 100%;
    //  background-color: var(--loader-color);

    background-size: contain;
    background-repeat: no-repeat;
  }

  .three-body__dot:nth-child(1) {
    bottom: 5%;
    left: 0;
    transform: rotate(60deg);
    transform-origin: 50% 85%;
  }

  .three-body__dot:nth-child(1)::after {
    bottom: 0;
    left: 0;
    animation: wobble1 var(--loader-speed) infinite ease-in-out;
    animation-delay: calc(var(--loader-speed) * -0.3);
    background-image: url(/img/cat1.svg);
  }

  .three-body__dot:nth-child(2) {
    bottom: 5%;
    right: 0;
    transform: rotate(-60deg);
    transform-origin: 50% 85%;
  }

  .three-body__dot:nth-child(2)::after {
    bottom: 0;
    left: 0;
    animation: wobble1 var(--loader-speed) infinite
      calc(var(--loader-speed) * -0.15) ease-in-out;
    background-image: url(/img/cat2.svg);
  }

  .three-body__dot:nth-child(3) {
    bottom: -5%;
    left: 0;
    transform: translateX(116.666%);
  }

  .three-body__dot:nth-child(3)::after {
    top: 0;
    left: 0;
    animation: wobble2 var(--loader-speed) infinite ease-in-out;
    background-image: url(/img/cat3.svg);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes wobble1 {
    0%,
    100% {
      transform: translateY(0%) scale(1);
      opacity: 1;
    }

    50% {
      transform: translateY(-66%) scale(0.65);
      opacity: 0.8;
    }
  }

  @keyframes wobble2 {
    0%,
    100% {
      transform: translateY(0%) scale(1);
      opacity: 1;
    }

    50% {
      transform: translateY(66%) scale(0.65);
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
  }
}
</style>
