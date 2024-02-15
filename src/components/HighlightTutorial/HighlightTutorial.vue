i
<template>
  <section :class="`highlight-tutorial --${index}`" ref="nodeRef">
    <div v-if="index === '0'">
      <p
        class="highlight-tutorial__title josefin-sans-600 --stroked"
        data-splitting
      >
        {{ title }}
      </p>
      <p
        class="highlight-tutorial__subtitle josefin-sans-600 --stroked"
        data-splitting
      >
        {{ subtitle }}
      </p>
    </div>

    <div class="tooltip-container --show" v-else>
      <span class="tooltip">
        <span class="highlight-tutorial__tooltip" data-splitting>{{
          title
        }}</span>
        <span class="highlight-tutorial__tooltip" data-splitting>{{
          subtitle
        }}</span>
      </span>
    </div>

    <figure class="highlight-tutorial__illus">
      <svg
        v-if="index !== 'end'"
        class="highlight-tutorial__illus__arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
      >
        <path
          fill="#e09f3e"
          d="M174.08 274.99l.27.01c-.09 0-.18 0-.27-.01zm0-249.99h.27-.27zM174.35 275h.27-.27zm0-250c.09 0 .18 0 .27.01s-.27-.01-.27-.01zM234.53 95.74c-.23-3.91-.57-7.81-1.02-11.69-.39-3.38-.53-7.06-2-10.19-2.99-6.36-10.71-5.82-16.59-5.46-7.26.44-14.51 1.23-21.66 2.57-8.04 1.5-15.86 3.8-23.37 7.04-1.69.73-1.58 3.55 0 4.32 10.3 4.96 20.1 10.92 29.25 17.76-8.99 6.02-17.01 13.32-24.58 21.01-7.86 7.98-15.42 16.26-23.07 24.45-15.98 17.09-31.87 34.27-47.35 51.82-8.75 9.92-17.36 19.97-25.78 30.17-.86 1.04-1.02 2.52 0 3.54.88.88 2.67 1.05 3.54 0 14.83-17.99 30.28-35.46 45.99-52.68 15.52-17 31.14-33.95 47.08-50.55 8.3-8.64 16.99-17.01 27.01-23.66.48-.32.79-.73.97-1.17 2.41 1.91 4.79 3.86 7.09 5.9 3.46 3.06 6.8 6.26 10.02 9.57 2.24 2.31 5.78-1.22 3.54-3.54a181.063 181.063 0 00-38.75-30.35c-2.51-1.46-5.05-2.85-7.62-4.18 10.9-3.96 22.51-5.87 34.03-6.76 3.12-.24 6.28-.54 9.42-.47 2.09.05 4.69.32 5.98 2.19.69 1 .95 2.24 1.16 3.42.32 1.74.5 3.51.71 5.26a205.504 205.504 0 011.06 34.66c-.17 3.22 4.83 3.21 5 0 .41-7.65.4-15.32-.04-22.97z"
        ></path>
        <path
          fill="#c0d6df"
          d="M123.96 120.2c-.34-2.61-.74-5.21-1.24-7.79-.46-2.37-1.15-4.68-3.88-5.11-2.16-.34-4.63.34-6.75.75-2.27.44-4.52 1-6.73 1.68a67.291 67.291 0 00-13.11 5.65c-1.38.77-1.67 2.83-.51 3.93 3.22 3.04 6.64 5.86 10.23 8.46a359.403 359.403 0 00-36.15 35.49c-.89 1.01-1 2.54 0 3.54.91.91 2.64 1.02 3.54 0a358.96 358.96 0 0136.86-36.1c2.93 1.9 5.95 3.65 9.06 5.22 2.86 1.45 5.4-2.86 2.52-4.32a96.693 96.693 0 01-19.99-13.5c6.08-3.02 12.8-5.21 19.51-5.83.08 0 .17-.01.25-.02 0 .03.02.06.02.09.25 1.09.44 2.2.63 3.31.36 2.07.67 4.15.91 6.24.5 4.38.74 8.79.75 13.2 0 3.22 5 3.22 5 0 0-4.97-.32-9.94-.95-14.87z"
        ></path>
        <path
          fill="#c0d6df"
          d="M232.92 172.86c-.34-2.61-.74-5.21-1.24-7.79-.46-2.37-1.15-4.68-3.88-5.11-2.16-.34-4.63.34-6.75.75-2.27.44-4.52 1-6.73 1.68a67.291 67.291 0 00-13.11 5.65c-1.38.77-1.67 2.83-.51 3.93 3.22 3.04 6.64 5.86 10.23 8.46a359.403 359.403 0 00-36.15 35.49c-.89 1.01-1 2.54 0 3.54.91.91 2.64 1.02 3.54 0a358.96 358.96 0 0136.86-36.1c2.93 1.9 5.95 3.65 9.06 5.22 2.86 1.45 5.4-2.86 2.52-4.32a96.693 96.693 0 01-19.99-13.5c6.08-3.02 12.8-5.21 19.51-5.83.08 0 .17-.01.25-.02 0 .03.02.06.02.09.25 1.09.44 2.2.63 3.31.36 2.07.67 4.15.91 6.24.5 4.38.74 8.79.75 13.2 0 3.22 5 3.22 5 0 0-4.97-.32-9.94-.95-14.87z"
        ></path>
      </svg>

      <img
        v-if="index === '0'"
        class="highlight-tutorial__illus__persona"
        alt=""
        src="/img/cat2.svg"
      />
      <img
        v-else-if="index === '4'"
        class="highlight-tutorial__illus__persona"
        alt=""
        src="/img/cat3.svg"
      />
      <img
        v-else
        class="highlight-tutorial__illus__persona"
        alt=""
        src="/img/cat1.svg"
      />
    </figure>
  </section>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import initHighlight from "../../helpers/hightlightFx";
interface Props {
  title: string;
  subtitle: string;
  active: boolean;
  index: string;
}

const props = defineProps<Props>();

const nodeRef = ref<any>(null);

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
    if (newVal === true) {
      document
        .querySelector(".highlight-tutorial")
        ?.classList.remove("--hidden");

      initHighlight(() => {}, props.index);
    }
  }
);
</script>

<style lang="scss">
.highlight-tutorial {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100svh;
  // backdrop-filter: brightness(0.8);
  z-index: 72;

  overflow: hidden;
  transition: all 0.64s ease-in-out;
  pointer-events: none;

  &.--hidden {
    // background-color: rgba(0, 0, 0, 0);
    // backdrop-filter: brightness(1);
    opacity: 0;
  }

  & > * {
    width: 100%;
  }

  &__subtitle {
    // opacity: 0;
    position: relative;
    padding: 0 10%;
    font-size: clamp(2.4rem, 10vw, 3.2rem);
    line-height: clamp(2rem, 10vw, 3rem);
    text-transform: lowercase;
    transform: rotate(-3deg) translateY(80vh) translateX(2.4vw);
    text-align: center;
  }

  &__title {
    // opacity: 0;
    position: relative;
    font-size: clamp(3.2rem, 12vw, 3.6rem);
    left: 54%;
    transform: rotate(6deg) translateX(-16%) translateY(20vh);
  }

  &__illus {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100svh;
    overflow: hidden;

    svg {
      opacity: 0;
    }

    img {
      display: block;
      position: absolute;
      height: 12vh;
      width: auto;
      bottom: 6vh;
      left: 8vw;
    }
  }

  &.--end {
    img {
      left: 50%;
      transform: translate(-50%, 0);
    }

    .tooltip-container {
      bottom: 18vh;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }

  .--stroked {
    letter-spacing: -0.2px;
    @supports (-webkit-text-stroke: 1px black) {
      -webkit-text-stroke: 0.72px var(--clear-day-white);
      -webkit-text-fill-color: transparent;
    }
  }

  &:not(.--hidden) ~ .marquees-container {
    .marquee-block {
      transition: filter 0.64s ease-in-out;
    }
  }

  @media (max-width: 768px) {
    &__title {
      position: relative;
      font-size: 2rem;
      line-height: 1.6rem;
      left: 0;
      transform: rotate(6deg) translateX(4vw) translateY(22svh);
      text-align: center;

      .word {
        margin-top: 12px;
      }
    }

    &__subtitle {
      padding: 0 3.2%;
      font-size: 2rem;
      line-height: 1.6rem;
      transform: rotate(-3deg) translateY(43svh) translateX(-4%);
      text-align: left;

      .word {
        margin-top: 20px;
      }
    }

    &__illus {
      img {
        height: 8svh;
        width: auto;
        bottom: 4svh;
        left: 50%;
        transform: translate(-50%, 0);
      }

      svg {
        display: block;
        opacity: 1;
        height: 12svh;
        width: auto;
        left: 50%;
        transform: translate(-50%, 0) rotate(-20deg);
        position: absolute;
      }
    }

    &.--0 {
      svg {
        bottom: 12svh;
      }
    }

    &.--4,
    &.--end {
      .tooltip-container {
        bottom: 24svh;
      }

      svg {
        bottom: auto;
        top: 32%;
        height: 24svh;
      }
    }
  }

  .tooltip-container {
    min-width: 72px;
    max-width: 72vw;
    min-height: 24px;
    transition: all 0.3s;
    cursor: pointer;
    padding: 12px 24px;

    position: fixed;
    bottom: 24vh;
    left: 50%;
    transform: translateX(-50%);

    &.--show {
      .tooltip {
        top: -100%;
        opacity: 1;
        visibility: visible;
      }
    }

    .tooltip {
      pointer-events: none;
      position: absolute;
      min-width: calc(0.84rem * 8);
      text-align: center;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.3em 0.6em;
      opacity: 1;
      pointer-events: none;
      transition: all 0.3s;
      background-color: rgb(255, 255, 255);
      border-radius: 12px;
      color: rgb(34, 34, 34);
      font-size: 0.84rem;
      word-break: keep-all;

      &::before {
        position: absolute;
        content: "";
        height: 0.6em;
        width: 0.6em;
        bottom: -0.2em;
        left: 50%;
        transform: translate(-50%) rotate(45deg);
        background-color: rgb(255, 255, 255);
      }

      & > span {
        display: block;

        span {
          display: block;
        }
      }
    }
  }
}
</style>
