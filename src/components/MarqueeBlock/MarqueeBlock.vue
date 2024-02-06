<template>
  <div class="marquee-block" ref="elRef">
    <div class="marquee-block-link yeseva-one-regular">
      <span>{{ title }}</span>
      +
      <span>{{ title }}</span>
      +
      <span>{{ title }}</span>
      +
      <span>{{ title }}</span>
      +
      <span>{{ title }}</span>
      +
      <span>{{ title }}</span>
      +
      <span>{{ title }}</span>
      +
      <span>{{ title }}</span>
    </div>
    <div class="marquee">
      <div class="marquee__inner-wrap">
        <div class="marquee__inner" aria-hidden="true">
          <template v-for="(cat, index) in cats" :key="`marquee-${cat}-1`">
            <span>{{ cat }}</span>
            <div
              class="marquee__img"
              :style="`background-image: url(/img/${catsImages[index]})`"
            ></div>
          </template>
          <template v-for="(cat, index) in cats" :key="`marquee-${cat}-2`">
            <span>{{ cat }}</span>
            <div
              class="marquee__img"
              :style="`background-image: url(/img/${catsImages[index]})`"
            ></div>
          </template>
          <template v-for="(cat, index) in cats" :key="`marquee-${cat}-3`">
            <span>{{ cat }}</span>
            <div
              class="marquee__img"
              :style="`background-image: url(/img/${catsImages[index]})`"
            ></div>
          </template>
          <template v-for="(cat, index) in cats" :key="`marquee-${cat}-4`">
            <span>{{ cat }}</span>
            <div
              class="marquee__img"
              :style="`background-image: url(/img/${catsImages[index]})`"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref, watch } from "vue";
import { closestEdge } from "../../helpers/marqueeCalculs";
import { gsap } from "gsap";

interface Props {
  title: string;
  cats: string[];
  catsImages: string[];
  autoExpanded: boolean;
  rotate: string;
  translateY: string | number;
  translateX: string | number;
}

const props = defineProps<Props>();

interface iDOM {
  el: HTMLElement;
  link: HTMLElement;
  marquee: HTMLElement;
  marqueeInner: HTMLElement;
}

const DOM: Ref<iDOM | any> = ref({
  el: null,
  link: null,
  marquee: null,
  marqueeInner: null,
} as unknown as iDOM);

const elRef: Ref<any> = ref(null);

const animationDefaults: Ref<any> = ref({});

const initEvents = () => {
  const onMouseEnterFn = (ev: any) => !props.autoExpanded && mouseEnter(ev);
  DOM.value.link.addEventListener("mouseenter", onMouseEnterFn);
  const onMouseLeaveFn = (ev: any) => !props.autoExpanded && mouseLeave(ev);
  DOM.value.link.addEventListener("mouseleave", onMouseLeaveFn);
};
const mouseEnter = (ev: any, autoMode = false) => {
  // find closest side to the mouse
  const edge = findClosestEdge(ev, autoMode);

  // set the initial y position for both the marquee and marqueeInner elements
  // for the reveal effect to happen, both start at opposite positions
  // the directions are different depending on the direction the cursor enters the element (bottom or top)
  gsap
    .timeline({ defaults: animationDefaults.value })
    .set(DOM.value.marquee, { y: edge === "top" ? "-101%" : "101%" }, 0)
    .set(DOM.value.marqueeInner, { y: edge === "top" ? "101%" : "-101%" }, 0)
    .to(DOM.value.el, { scale: 2, duration: 3.2 }, 0)
    .to([DOM.value.marquee, DOM.value.marqueeInner], { y: "0%" }, 0);
};
const mouseLeave = (ev: any, autoMode = false) => {
  // find closest side to the mouse
  const edge = findClosestEdge(ev, autoMode);

  gsap
    .timeline({ defaults: animationDefaults.value })
    .to(DOM.value.marquee, { y: edge === "top" ? "-101%" : "101%" }, 0)
    .to(DOM.value.marqueeInner, { y: edge === "top" ? "101%" : "-101%" }, 0)
    .to(DOM.value.el, { scale: 1, duration: 3.2 }, 0);
};
// find closest side to the mouse when entering/leaving
const findClosestEdge = (ev: any, autoMode = false) => {
  const { left, top, width, height } = DOM.value.el.getBoundingClientRect();

  const x = autoMode ? left : ev.pageX - left;
  const y = autoMode ? top : ev.pageY - top;

  return closestEdge(x, y, width, height);
};

onMounted(() => {
  // .menu__item element
  DOM.value.el = elRef.value;
  // .menu__item-link element
  DOM.value.link = DOM.value.el.querySelector("div.marquee-block-link");
  // .marquee element
  DOM.value.marquee = DOM.value.el.querySelector(".marquee");
  // .marquee__inner-wrap element
  DOM.value.marqueeInner = DOM.value.marquee.querySelector(
    ".marquee__inner-wrap"
  );
  // some default options for the animation's speed and easing
  animationDefaults.value = { duration: 1.2, ease: "sine" };

  // init style
  gsap.set(DOM.value.el, {
    transformOrigin: "left",
    rotate: props.rotate,
    y: props.translateY,
    x: props.translateX,
  });

  // events initialization
  initEvents();
});

watch(
  () => props.autoExpanded,
  (expanded) => {
    if (expanded) {
      mouseEnter({ pageX: 0, pageY: 0 }, true);
    } else {
      mouseLeave({ pageX: 0, pageY: 0 }, true);
    }
  }
);
</script>

<style lang="scss">
.marquee-block {
  --color-text: var(--shakespear-blue);
  --color-link: var(--tuscany-blue);
  --color-link-hover: var(--tuscany-blue);
  --color-border: var(--clear-day-white);
  --marquee-bg: var(--shakespear-blue);
  --marquee-text: var(--clear-day-white);
  --menu-focus: var(--shakespear-blue);

  --offset: 20vw;
  --move-initial: calc(-25% + var(--offset));
  --move-final: calc(-50% + var(--offset));

  cursor: default;
  position: relative;
  overflow: hidden;
  text-align: center;
  border-top: thin solid var(--color-border);
  border-bottom: thin solid var(--color-border);

  &:nth-child(2) {
    .marquee-block-link {
      animation-direction: reverse;
    }

    .marquee__inner {
      animation-direction: reverse;
    }
  }

  &:first-child {
    .marquee-block-link {
      animation-duration: 10s;
    }
  }

  &:last-child {
    .marquee-block-link {
      animation-duration: 10s;
    }
  }

  &-link {
    display: block;
    position: relative;
    cursor: pointer;
    text-decoration: none;
    color: var(--color-link);
    text-transform: uppercase;
    white-space: nowrap;
    font-size: 3.2rem;
    line-height: 1.2;
    letter-spacing: 0.32rem;
    padding: 1vh 1vw 0;
    width: fit-content;
    animation: marquee 7.2s linear infinite;
    transform: translate3d(var(--move-initial), 0, 0);

    span {
      width: max-content;
    }

    &:focus,
    &:focus-visible {
      color: var(--menu-focus);
    }

    &:focus:not(:focus-visible) {
      color: var(--color-link);
    }

    @media (max-width: 768px) {
      font-size: 2.4rem;
      letter-spacing: 0;
    }
  }

  .marquee {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: var(--marquee-bg);
    transform: translate3d(0, 101%, 0);

    &__inner-wrap {
      height: 100%;
      width: 100%;
      transform: translate3d(0, -101%, 0);
    }

    &__inner {
      height: 100%;
      width: fit-content;
      align-items: center;
      display: flex;
      position: relative;
      animation: marquee 16s linear infinite;
      transform: translate3d(var(--move-initial), 0, 0);
      will-change: transform;
    }

    span {
      text-transform: lowercase;
      white-space: nowrap;
      font-size: 2rem;
      line-height: 1.2;
      padding: 1vh 1vw 0;
      text-align: center;
      color: var(--marquee-text);
      font-weight: 600;
    }

    &__img {
      width: 10vw;
      height: 70%;

      border-radius: 5vw;
      background-size: contain;
      background-position: 50% 50%;
      background-repeat: no-repeat;
    }
  }

  @keyframes marquee {
    0% {
      transform: translate3d(var(--move-initial), 0, 0);
    }

    100% {
      transform: translate3d(var(--move-final), 0, 0);
    }
  }
}
</style>
