<template>
  <main class="app --locked" v-show="showApp" v-if="!isDevMode">
    <transition name="fade" mode="out-in">
      <share-button v-show="!carouselActive"></share-button>
    </transition>

    <highlight-tutorial
      :title="xpTutorial[highlightActiveIndex as keyof typeof xpTutorial].title"
      :subtitle="xpTutorial[highlightActiveIndex as keyof typeof xpTutorial].subtitle"
      :active="highlightActive"
      :index="highlightActiveIndex"
      @onHighlightCompleted="initScroll"
    ></highlight-tutorial>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <main class="app" v-show="showApp" v-else>
    <transition name="fade" mode="out-in">
      <share-button v-show="!carouselActive"></share-button>
    </transition>
    <!-- <highlight-tutorial
      :title="xpMarquee.indicator.title"
      :subtitle="xpMarquee.indicator.subtitle"
      :active="highlightActive"
      @onHighlightCompleted="initScroll"
    ></highlight-tutorial> -->

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" ref="el" />
      </transition>
    </router-view>
  </main>

  <paw-cursor></paw-cursor>

  <assets-preload
    v-for="(assets, index) in xpAssets"
    :key="`assets-preload-${index}`"
    :section-index="assets.sectionIndex"
    :fx="assets.fx"
    :collage="assets.collage"
  ></assets-preload>
</template>

<script setup lang="ts">
import {
  nextTick,
  onBeforeMount,
  onMounted,
  ref,
  watch,
  computed,
  toRefs,
} from "vue";

import {
  initSmoothScrolling,
  scroll,
  scrollGrid,
  refreshScroll,
  scrollTo,
} from "./helpers/scrollFx";

import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import { RouterView, useRouter } from "vue-router";
import { useScroll } from "@vueuse/core";

import xpTitle from "./configs/xpTitle.json";
import xpContent from "./configs/xpContent.json";
import xpMarquee from "./configs/xpMarquee.json";
import xpTutorial from "./configs/xpTutorial.json";

import onTutoActivated from "./helpers/customEvents/tutoActivated";
import isSafari from "./helpers/isSafari";
import { flattenDeep } from "lodash";

const router = useRouter();
const showApp = ref<boolean>(false);

const el = ref(null);

const isDevMode = ref<boolean>(import.meta.env.DEV);

const highlightActive = ref<boolean>(false);
const highlightActiveIndex = ref<string>("0");

const carouselActive = ref<boolean>(false);

const assetsLoaded = ref<boolean>(false);
const loaderLoaded = ref<boolean>(false);

const xpAssets = computed(() => {
  return xpContent.map((content, index) => ({
    sectionIndex: index,
    collage: content.collage ?? [],
    fx: content.cllgFx,
  }));
});

const computedBindedProps = (section: any, index: number) => {
  const bindedProps: any = {};

  if (section.textPosition) {
    bindedProps.textPosition = section.textPosition;
  }

  if (index < xpContent.length - 1) {
    bindedProps.nextSectionBackground = xpContent[index + 1].backgroundColor;
  }

  if (section.cllgFx) {
    bindedProps.cllgFx = section.cllgFx;
  }

  if (section.spacing) {
    bindedProps.spacing = section.spacing;
  }

  if (section.videoFx) {
    bindedProps.videoFx = section.videoFx;
  }

  if (section.collage) {
    bindedProps.collage = section.collage;
  }

  if (section.video) {
    bindedProps.video = section.video;
  }

  if (section.videoRatio) {
    bindedProps.videoRatio = section.videoRatio;
  }

  if (section.href) {
    bindedProps.href = section.href;
  }

  return bindedProps;
};

const lockScroll = (e: any) => {
  e.preventDefault();
  scrollTo(window.scrollY + window.innerHeight);
};

const initScroll = () => {
  const fx1 = {
    id: "fx1",
    nodes: [
      ...document.querySelectorAll(
        ".text-block:not(.section--2):not(.section--3) .text-block__content.fx1[data-splitting]"
      ),
    ],
  };

  const fx1Section2 = {
    id: "fx1",
    nodes: [
      ...document.querySelectorAll(
        ".section--2 .text-block__content.fx1[data-splitting]"
      ),
    ],
    delayContent: true,
  };

  const fx1Section3 = {
    id: "fx1",
    nodes: [
      ...document.querySelectorAll(
        ".section--3 .text-block__content.fx1[data-splitting]"
      ),
    ],
    delayContent: true,
  };

  const fx2 = {
    id: "fx2",
    nodes: [
      ...document.querySelectorAll(
        ".text-block:not(.section--2) .text-block__title.fx2[data-splitting]"
      ),
      ...document.querySelectorAll(
        ".text-block:not(.section--2) .text-block__subtitle.fx2[data-splitting]"
      ),
    ],
  };

  const fx2Section2 = {
    id: "fx2",
    nodes: [
      ...document.querySelectorAll(
        ".section--2 .text-block__title.fx2[data-splitting]"
      ),
      ...document.querySelectorAll(
        ".section--2 .text-block__subtitle.fx2[data-splitting]"
      ),
    ],
  };

  const fx3 = {
    id: "fx3",
    nodes: [
      ...document.querySelectorAll(".text-block__content.fx3[data-splitting]"),
    ],
  };

  const collage1 = {
    id: "cllg-fx1",
    node: document.querySelector(".section--1.grid"),
    type: "collage",
    sectionId: 1,
  };

  const collage2 = {
    id: "cllg-fx2",
    node: document.querySelector(".section--2.grid-wrap__gallery"),
    type: "collage",
    sectionId: 2,
  };

  const collage3 = {
    id: "cllg-fx3",
    node: document.querySelector(".section--3.grid-wrap__gallery"),
    type: "collage",
    sectionId: 3,
  };

  const collage4 = {
    id: "cllg-fx4",
    node: document.querySelector(".section--4.grid-wrap__gallery"),
    type: "collage",
    sectionId: 4,
  };

  const collage5 = {
    id: "cllg-fx1",
    node: document.querySelector(".section--6.grid"),
    type: "collage",
    sectionId: 6,
  };

  const collage6 = {
    id: "cllg-fx4",
    node: document.querySelector(".section--7.grid-wrap__gallery"),
    type: "collage",
    sectionId: 7,
  };

  const collage7 = {
    id: "cllg-fx5",
    node: document.querySelector(".section--8.grid"),
    type: "collage",
    sectionId: 8,
  };

  const video1 = {
    id: "video-fx1",
    node: document.querySelector(".section--5.video-block"),
    type: "video",
    sectionId: 5,
  };

  const video2 = {
    id: "video-fx1",
    node: document.querySelector(".section--9.video-block"),
    type: "video",
    sectionId: 9,
  };

  // scroll(fx1Section2);
  // scroll(fx2Section2);

  // scrollGrid(collage1);
  // scrollGrid(collage2);
  // scrollGrid(collage3);
  // scrollGrid(collage4);
  // scrollGrid(collage5);
  // scrollGrid(collage6);
  // scrollGrid(collage7);
  // scrollGrid(video1);
  // scrollGrid(video2);

  // scroll(fx1);
  // scroll(fx1Section3);
  scroll(fx2);
  scroll(fx3);
};
const { y, directions } = useScroll(window);
const { top: toTop, bottom: toBottom } = toRefs(directions);
const currentRoute = ref(router.currentRoute.value.fullPath);
const onScroll = () => {
  let nextRoute, previousRoute;
  console.log({ y: y.value, up: toTop.value, down: toBottom.value });
  if (y.value === 1 && toTop.value) {
    switch (currentRoute.value) {
      case "/c1":
        previousRoute = "/";
        break;
      case "/c2":
        previousRoute = "/c1";
        break;
      case "/c3":
        previousRoute = "/c2";
        break;
      case "/c4":
        previousRoute = "/c3";
        break;
      case "/c5":
        previousRoute = "/c4";
        break;
      case "/c6":
        previousRoute = "/c5";
        break;
      case "/c7":
        previousRoute = "/c6";
        break;
      case "/c8":
        previousRoute = "/c7";
        break;
      case "/end-1":
        previousRoute = "/c8";
        break;
      case "/end-2":
        previousRoute = "/end-1";
        break;
      case "/end-3":
        previousRoute = "/end-2";
        break;
      default:
        break;
    }

    if (previousRoute && !["/c2", "/c3"].includes(currentRoute.value)) {
      router.push(previousRoute);
      console.log("back");

      return;
    }
  }
  console.log(
    currentRoute.value,
    window.innerHeight + y.value,
    document.body.offsetHeight
  );
  if (
    window.innerHeight + y.value >= document.body.offsetHeight &&
    toBottom.value
  ) {
    switch (currentRoute.value) {
      case "/":
        nextRoute = "/c1";
        break;
      case "/c1":
        nextRoute = "/c2";
        break;
      case "/c2":
        nextRoute = "/c3";
        break;
      case "/c3":
        nextRoute = "/c4";
        break;
      case "/c4":
        nextRoute = "/c5";
        break;
      case "/c5":
        nextRoute = "/c6";
        break;
      case "/c6":
        nextRoute = "/c7";
        break;
      case "/c7":
        nextRoute = "/c8";
        break;
      case "/c8":
        nextRoute = "/end-1";
        break;
      case "/end-1":
        nextRoute = "/end-2";
        break;
      case "/end-2":
        nextRoute = "/end-3";
        break;
      default:
        break;
    }

    console.log(nextRoute);

    if (nextRoute && !["/c2", "/c3"].includes(currentRoute.value)) {
      router.push(nextRoute);
      window.removeEventListener("scroll", onScroll);
      console.log("next");
      return;
    }
  }
};

const carouselLockApp = () => {
  (document.querySelector("main.app") as any)?.style?.setProperty(
    "--height-locked",
    window.scrollY + window.innerHeight + "px"
  );
  document.querySelector("main.app")?.classList.add("--carousel-locked");
  window.addEventListener("scroll", lockScroll);
};

const carouselUnlockApp = () => {
  document.querySelector("main.app")?.classList.remove("--carousel-locked");
  window.removeEventListener("scroll", lockScroll);
};

onBeforeMount(() => {
  initSmoothScrolling();

  showApp.value = true;
});

onMounted(() => {
  nextTick(() => {
    Splitting();

    initScroll();

    window.addEventListener("resize", () => {
      // cancelScroll();
      // cancelSmoothScrolling();

      // setTimeout(() => {
      //   initScroll();
      // }, 2000);

      refreshScroll();
    });

    document.addEventListener("assetsLoaded", () => {
      assetsLoaded.value = true;
    });

    document.addEventListener("loaderLoaded", () => {
      loaderLoaded.value = true;
    });

    document.addEventListener("tutoActivated", (e: any) => {
      const { active, section } = e.detail as unknown as {
        active: boolean;
        section: number;
      };
      highlightActive.value = active;
      highlightActiveIndex.value = `${section}`;
    });

    let lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      () => {
        if (isSafari()) {
          return;
        }
        const currentScrollTop = document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop) {
          // Downward scroll
          if (window.scrollY >= 0 && window.scrollY < window.innerHeight) {
            scrollTo(window.innerHeight + 10);
          }
        } else if (currentScrollTop < lastScrollTop) {
          // Upward scroll
          if (
            window.scrollY >= window.innerHeight + 1 &&
            window.scrollY <= window.innerHeight * 2
          ) {
            // scrollTo(0);
          }
        }
      },
      { once: true }
    );

    window.addEventListener("scroll", onScroll, false);

    setTimeout(() => {
      const pinSpacer = document.querySelector(
        ".app > .pin-spacer:last-of-type"
      ) as HTMLElement;
      if (pinSpacer) {
        pinSpacer.style.backgroundColor = `var(--${
          xpContent.length % 2 !== 0 ? "clear-day-white" : "shakespear-blue"
        })`;
      }
    }, 3200);
  });
});

watch(
  [() => assetsLoaded.value, () => loaderLoaded.value],
  ([assets, loader]) => {
    if (assets && loader) {
      document.dispatchEvent(onTutoActivated({ active: true, section: "0" }));
      scrollTo(0);
    }
    // if (assets) {
    //   document.dispatchEvent(onTutoActivated({ active: true, section: "0" }));
    //   scrollTo(0);
    // }
  }
);

watch(
  () => carouselActive.value,
  (active) => {
    if (active) {
      carouselLockApp();
    } else {
      carouselUnlockApp();
    }
  }
);

watch(
  () => router.currentRoute.value.fullPath,
  (newRoute) => {
    console.log(newRoute);
    console.log(document.body.getBoundingClientRect().height);
    setTimeout(() => {
      currentRoute.value = newRoute;
      window.removeEventListener("scroll", onScroll);
      window.addEventListener("scroll", onScroll, false);
    }, 200);
  }
);
</script>

<style lang="scss">
.app {
  overflow: hidden;
  position: relative;
  width: 100%;

  &.--carousel-locked {
    overflow: hidden;
    height: var(--height-locked, 100vh);
  }

  &.--locked {
    width: 100%;
    height: 100svh;
    overflow: hidden;

    .title-block {
      .word {
        opacity: 0;
      }
    }
  }

  .title-block {
    transition: opacity 0.64s ease-in-out;
    opacity: 1;
  }

  .text-block {
    .business-card {
      position: absolute;
      right: -32vw;
    }
  }

  &.--retina {
    @media (min-width: 1440px) {
      .highlight-tutorial {
        &__title {
          transform: rotate(6deg) translateX(-28vw) translateY(20vh);
        }
        &__subtitle {
          transform: rotate(-3deg) translateY(80vh) translateX(2.4vw);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .text-block {
      &:has(.business-card) {
        height: 120vh;
      }

      .business-card {
        right: 0;
        bottom: -48vh;
      }
    }
  }
}
</style>
