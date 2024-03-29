<template>
  <section class="title-block">
    <p class="title-block__subtitle josefin-sans-600" data-splitting>
      {{ subtitle }}
    </p>
    <h1 class="title-block__title yeseva-one-regular" data-splitting>
      <span v-for="(part, index) in title" :key="`title-part-${index}`">{{
        part
      }}</span>
    </h1>
  </section>
</template>

<script setup lang="ts">
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { gsap } from "gsap";
import { onMounted } from "vue";
import isRetina from "../../helpers/isRetina";
import isSafari from "../../helpers/isSafari";

interface Props {
  title: string[];
  subtitle: string;
}

defineProps<Props>();

onMounted(() => {
  Splitting({});

  // console.log("retina", isRetina());
  if (isRetina()) {
    document.querySelector("main.app")?.classList.add("--retina");
  }

  if (isSafari()) {
    document.querySelector("main.app")?.classList.add("--safari");
  }

  [
    document.querySelector(".title-block__subtitle"),
    document.querySelector(".title-block__title"),
  ].forEach((title, index) => {
    if (title) {
      const chars = title.querySelectorAll(".char");

      chars.forEach((char) => gsap.set(char.parentNode, { perspective: 2400 }));

      gsap.fromTo(
        chars,
        {
          "will-change": "opacity, transform",
          transformOrigin: "50% 0%",
          opacity: 0,
          rotationX: -90,
          z: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-200, 200),
        },
        {
          ease: "power1",
          opacity: 1,
          stagger: 0.05,
          rotationX: 0,
          z: 0,
          y: 0,
          duration: 0.64,
          delay: 1.2 * (index + 1),
          scrollTrigger: {
            trigger: title,
            start: "0 72%",
            end: "0 20%",
            scrub: true,
          },
        }
      );
    }
  });
});
</script>

<style lang="scss">
.title-block {
  width: 100vw;
  height: 148vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  background-color: var(--shakespear-blue);
  color: var(--tuscany-blue);
  background: linear-gradient(
    to bottom,
    var(--shakespear-blue) 0%,
    var(--clear-day-white) 100%
  );

  padding-bottom: 12vh;

  gap: 3.2rem;

  &__subtitle {
    width: 100%;
    line-height: 10rem;
    font-size: 12rem;
    text-transform: lowercase;
    color: var(--shakespear-blue);
  }

  &__title {
    width: 100%;
    font-size: 6.4rem;
    line-height: 6rem;
    margin-top: 24px;
    letter-spacing: 2px;

    & > span {
      display: block;
    }
  }

  span.char {
    display: inline-block;
    margin-left: -1.2px;
  }

  @media (min-width: 1440px) {
    height: 160vh;

    &__title {
      // transform: translateY(22vh);
    }
    &__subtitle {
      transform: translateY(10vh);
    }
  }

  @media (max-width: 1024px) {
    gap: 0;
    padding: 0 2%;
    text-align: left;

    &__subtitle {
      font-size: 6.4rem;
      line-height: 4.8rem;
      text-transform: uppercase;
    }

    &__title {
      font-size: 4rem;
      line-height: 4rem;
      text-transform: lowercase;
    }
  }

  // Media query for mobile devices
  @media (max-width: 767px) {
    gap: 0;
    padding: 0 3.2%;
    padding-top: 6.4%;
    text-align: left;

    &__subtitle {
      font-size: 2.8rem;
      line-height: 2rem;
      text-transform: uppercase;
    }

    &__title {
      font-size: 4rem;
      line-height: 3.6rem;
      text-transform: lowercase;
      margin-top: 0;
      letter-spacing: 0;
    }
  }
}
</style>
