<template>
  <transition name="fadeY" mode="out-in">
    <div class="loader-block" v-show="loading" ref="nodeRef">
      <div class="three-body">
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
      </div>

      <div class="loader-block__status yeseva-one-regular">
        <transition name="fade" mode="out-in">
          <span v-show="showPrompt">{{ prompt }}</span>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import isMobile from "../../helpers/isMobile";
import { preloadImages } from "../../helpers/preloadAssets";

import xpLoader from "../../configs/xpLoader.json";

import onLoaderLoaded from "../../helpers/customEvents/loaderLoaded";
import onAssetsLoaded from "../../helpers/customEvents/assetsLoaded";

interface Props {}

defineProps<Props>();

const loading = ref<boolean>(true);
const firstLoading = ref<boolean>(true);
const assetsReady = ref<boolean>(false);

const END_OF_PROMPT_DEFAULT_INDEX = 3;

const REMOVE_LOADER_AFTER = 3200;

const prompt = ref<string>(
  firstLoading.value
    ? xpLoader.firstLoadingPrompts[0]
    : xpLoader.loadingPrompts[0]
);
const intervalId = ref<number>(0);
const showPrompt = ref<boolean>(true);
const endOfPrompt = ref<boolean>(false);
const endOfDefaultPrompt = ref<boolean>(false);
const nodeRef = ref<any>(null);

const changePrompt = (restart = false, interval = 1320) => {
  let i = 0;
  const prompts = firstLoading.value
    ? restart
      ? xpLoader.firstLoadingPrompts.slice(3)
      : xpLoader.firstLoadingPrompts
    : xpLoader.loadingPrompts;

  const intervalId = setInterval(() => {
    showPrompt.value = false;
    setTimeout(() => {
      showPrompt.value = true;
      i++;

      if (i >= END_OF_PROMPT_DEFAULT_INDEX) {
        endOfDefaultPrompt.value = true;
      }

      if (i >= prompts.length) {
        i = 0;
        endOfPrompt.value = true;
      }

      prompt.value = prompts[i];
    }, interval);
  }, interval * 2);

  return intervalId;
};

const cancelPrompt = (intervalId: number) => {
  clearInterval(intervalId);
};

onMounted(() => {
  setTimeout(() => {
    if (!assetsReady.value) {
      document.dispatchEvent(onAssetsLoaded);
      g;
    }
  }, REMOVE_LOADER_AFTER);

  document.documentElement.click();

  setTimeout(() => {
    document.documentElement.click();
  }, 120);

  preloadImages([".loader-block .three-body__dot::after"]).then(() => {
    loading.value = true;
    intervalId.value = changePrompt();
  });

  // preloadImages([".grid__item-inner", ".grid__item", ".marquee__img"]).then(
  //   () => {
  //     assetsReady.value = true;
  //   }
  // );

  document.addEventListener("assetsLoaded", () => {
    // console.log("assetsLoaded");
    if (!assetsReady.value) {
      assetsReady.value = true;
    }
  });

  window.addEventListener("resize", (e: any) => {
    if (
      !isMobile() ||
      (isMobile() && window.innerWidth !== e.currentTarget.outerWidth)
    ) {
      loading.value = true;
      firstLoading.value = false;
      endOfPrompt.value = false;
      intervalId.value = changePrompt();

      setTimeout(() => {
        loading.value = false;
      }, 1600);
    }
  });
});

onUnmounted(() => {
  cancelPrompt(intervalId.value);
});

watch(
  [
    () => endOfPrompt.value,
    () => assetsReady.value,
    () => endOfDefaultPrompt.value,
  ],
  ([isAtEndOfPrompt, isAssetReady, isAtEndOfDefaultPrompt]) => {
    if (isAtEndOfPrompt) {
      cancelPrompt(intervalId.value);
      intervalId.value = changePrompt(true);
    }

    if (isAssetReady && isAtEndOfDefaultPrompt) {
      loading.value = false;

      document.dispatchEvent(onLoaderLoaded);

      if (firstLoading.value) {
        setTimeout(() => {
          firstLoading.value = false;
        }, 1000);
      }
    }
  }
);
</script>

<style lang="scss" scoped>
@import "../../styles/fonts";
@import "../../styles/animations";

.loader-block {
  position: fixed;
  width: 100vw;
  height: 100dvh;
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
    padding: 16px 12vw;
    text-align: center;
  }

  .three-body {
    --loader-size: 240px;
    --loader-speed: 1.2s;
    --loader-gap-text: 8px;
    position: fixed;
    display: inline-block;
    height: var(--loader-size);
    width: var(--loader-size);
    animation: spin calc(var(--loader-speed) * 2.5) infinite linear;
    top: calc(50vh - var(--loader-size) - var(--loader-gap-text));
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
    --loader-size: 160px;
  }
}
</style>
../../helpers/customEvents/loaderLoaded
