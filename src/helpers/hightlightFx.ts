import { gsap } from "gsap";
import onTutoActivated from "./customEvents/tutoActivated";
import { scrollTo } from "./scrollFx";
import isSafari from "./isSafari";

const lockScroll = (e: any) => {
  e.preventDefault();
  scrollTo(window.scrollY + window.innerHeight);
};

const initHighlight = (cbOnComplete?: () => void, sectionIndex?: string) => {
  const tl = gsap
    .timeline({
      onStart: () => {
        (document.querySelector("main.app") as any)?.style?.setProperty(
          "--height-locked",
          window.scrollY + window.innerHeight + "px"
        );
        document
          .querySelector(".highlight-tutorial")
          ?.classList.remove("--hidden");

        (document.querySelector("main.app") as any)?.style?.setProperty(
          "--height-locked",
          window.scrollY + window.innerHeight + "px"
        );
        document.querySelector("main.app")?.classList.add("--carousel-locked");
        window.addEventListener("scroll", lockScroll);
      },
      onComplete: () => {
        document.querySelector("main.app")?.classList.remove("--locked");
        if (cbOnComplete) {
          cbOnComplete();
        }
        document.dispatchEvent(
          onTutoActivated({ active: false, section: sectionIndex + "" })
        );

        document
          .querySelector(".highlight-tutorial")
          ?.classList.add("--hidden");

        document
          .querySelector("main.app")
          ?.classList.remove("--carousel-locked");
        window.removeEventListener("scroll", lockScroll);

        setTimeout(() => {
          if (
            isSafari() &&
            ["4", "7"].some((id) => sectionIndex?.includes(id))
          ) {
            scrollTo(window.innerHeight);
          }
        }, 640);
      },
    })
    .pause();

  if (sectionIndex === "0") {
    tl.to(
      document.querySelector(".highlight-tutorial"),
      {
        backgroundColor: "rgba(0, 0, 0, 0.48)",
        duration: 1.6,
      },
      0
    ).from(
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
    );
  }

  if (sectionIndex === "0") {
    tl.to(
      document.querySelector(".highlight-tutorial__title") &&
        document.querySelector(".highlight-turorial__subtitle")
        ? [
            document.querySelector(".highlight-tutorial__title"),
            document.querySelector(".highlight-turorial__subtitle"),
          ]
        : [],
      { opacity: 1, duration: 1, delay: 0.36 },
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
      );
  } else if (sectionIndex === "end" || sectionIndex === "4") {
    tl.from(
      document.querySelector(".highlight-tutorial .tooltip"),
      {
        opacity: 0,
        y: "100%",
        duration: 1.2,
      },
      0
    );
  }

  tl.to(
    document.querySelector(".highlight-tutorial"),
    {
      backgroundColor: "rgba(0, 0, 0, 0.0)",
      duration: 1.6,
    },
    ">"
  );

  tl.play();
};

export default initHighlight;
