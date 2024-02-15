import { gsap } from "gsap";

const initHighlight = (cbOnComplete?: () => void) => {
  gsap
    .timeline({
      onComplete: () => {
        document.querySelector("main.app")?.classList.remove("--locked");
        if (cbOnComplete) {
          cbOnComplete();
        }
      },
    })
    .from(
      [
        document.querySelector(".highlight-tutorial__illus__persona"),
        document.querySelector(".highlight-tutorial__illus__arrow"),
      ],
      {
        opacity: 0,
        y: "100%",
        duration: 1.6,
        stagger: 1,
        delay: 0.36,
      },
      0
    )
    .to(
      [
        document.querySelector(".highlight-tutorial__title"),
        document.querySelector(".highlight-turorial__subtitle"),
      ],
      { opacity: 1, duration: 1 },
      0
    )
    .fromTo(
      [...document.querySelectorAll(".highlight-tutorial__title .char")],
      {
        opacity: 0,
        rotationX: -90,
        z: () => gsap.utils.random(-200, 200),
        x: () => gsap.utils.random(-200, 200),
        top: () => gsap.utils.random(-200, 200),
        scale: () => gsap.utils.random(0.24, 2.4),
        filter: "blur(4px)",
      },
      {
        ease: "power1",
        opacity: 1,
        stagger: (i) => gsap.utils.random(0.024, 0.064) * i,
        rotationX: 0,
        z: 0,
        x: 0,
        top: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        delay: 0.36,
      },
      ">"
    )
    .fromTo(
      [...document.querySelectorAll(".highlight-tutorial__subtitle .char")],
      {
        opacity: 0,
        rotationX: -90,
        z: () => gsap.utils.random(-200, 200),
        x: () => gsap.utils.random(-200, 200),
        top: () => gsap.utils.random(-200, 200),
        scale: () => gsap.utils.random(0.24, 2.4),
        filter: "blur(4px)",
      },
      {
        ease: "power1",
        opacity: 1,
        stagger: (i) => gsap.utils.random(0.024, 0.064) * i,
        rotationX: 0,
        z: 0,
        x: 0,
        top: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
      },
      ">"
    )
    .to(
      document.querySelector(".highlight-tutorial"),
      {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        duration: 0.6,
      },
      ">"
    );
};

export default initHighlight;
