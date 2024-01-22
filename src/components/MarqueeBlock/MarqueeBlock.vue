<template>
  <div class="marquee-block" ref="elRef">
    <div class="marquee-block-link yeseva-one-regular">
      {{ title }} - {{ title }}
    </div>
    <div class="marquee">
      <div class="marquee__inner-wrap">
        <div class="marquee__inner" aria-hidden="true">
          <template v-for="cat in cats" :key="`marquee-${cat}`">
            <span>{{ cat }}</span>
            <div
              class="marquee__img"
              :style="`background-image: url(img/${cat}.jpg)`"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { closestEdge } from "../../helpers/marqueeCalculs";
import { gsap } from "gsap";

interface Props {
  title: string;
  cats: string[];
}

defineProps<Props>();

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
  const onMouseEnterFn = (ev) => mouseEnter(ev);
  DOM.value.link.addEventListener("mouseenter", onMouseEnterFn);
  const onMouseLeaveFn = (ev) => mouseLeave(ev);
  DOM.value.link.addEventListener("mouseleave", onMouseLeaveFn);
};
const mouseEnter = (ev) => {
  // find closest side to the mouse
  const edge = findClosestEdge(ev);

  // set the initial y position for both the marquee and marqueeInner elements
  // for the reveal effect to happen, both start at opposite positions
  // the directions are different depending on the direction the cursor enters the element (bottom or top)
  gsap
    .timeline({ defaults: animationDefaults.value })
    .set(DOM.value.marquee, { y: edge === "top" ? "-101%" : "101%" }, 0)
    .set(DOM.value.marqueeInner, { y: edge === "top" ? "101%" : "-101%" }, 0)
    .to([DOM.value.marquee, DOM.value.marqueeInner], { y: "0%" }, 0);
};
const mouseLeave = (ev) => {
  // find closest side to the mouse
  const edge = findClosestEdge(ev);

  gsap
    .timeline({ defaults: animationDefaults.value })
    .to(DOM.value.marquee, { y: edge === "top" ? "-101%" : "101%" }, 0)
    .to(DOM.value.marqueeInner, { y: edge === "top" ? "101%" : "-101%" }, 0);
};
// find closest side to the mouse when entering/leaving
const findClosestEdge = (ev) => {
  const x = ev.pageX - DOM.value.el.offsetLeft;
  const y = ev.pageY - DOM.value.el.offsetTop;
  return closestEdge(x, y, DOM.value.el.clientWidth, DOM.value.el.clientHeight);
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
  animationDefaults.value = { duration: 0.6, ease: "expo" };
  // events initialization
  initEvents();
});
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
    animation: marquee 7.2s linear infinite;

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
      animation: marquee 15s linear infinite;
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
      margin: 0 2vw;
      border-radius: 5vw;
      background-size: cover;
      background-position: 50% 50%;
    }
  }

  @keyframes marquee {
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  @keyframes marquee-reverse {
    100% {
      transform: translate3d(50%, 0, 0);
    }
  }
}
</style>
