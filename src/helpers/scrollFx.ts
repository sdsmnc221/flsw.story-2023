import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";

import { applyCollageAnimation } from "./collageFx";
import { applyVideoAnimation } from "./videoFx";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

// Lenis smooth scrolling
let lenis: any;

// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {
  lenis = new Lenis({
    // wrapper: document.querySelector("main.app"),
    // content: document.querySelector("main.app"),
    lerp: 0.032,
    smooth: true,
    smoothWheel: true, // Enables smooth scrolling for mouse wheel events
  } as any);

  lenis.on("scroll", () => ScrollTrigger.update());

  const scrollFn = (time: any) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };

  requestAnimationFrame(scrollFn);
};

const cancelSmoothScrolling = () => {
  cancelAnimationFrame(lenis.raf);
  lenis.destroy();
};

// GSAP Scroll Triggers
const scroll = (fx: { id: string; nodes: any[] }) => {
  switch (fx.id) {
    case "fx1":
      fx.nodes.forEach((title) => {
        gsap.fromTo(
          title,
          {
            transformOrigin: "0% 50%",
            rotate: 6,
          },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: {
              trigger: title,
              start: "top bottom",
              end: "top top",
              scrub: true,
              onUpdate: (self) => {
                const { progress } = self;

                if (progress > 0.2 && progress < 0.8) {
                  if (!title.classList.contains("--background")) {
                    title.classList.add("--background");
                  }
                }

                if (progress > 0.99) {
                  if (title.classList.contains("--background")) {
                    title.classList.remove("--background");
                  }
                }

                if (progress === 1) {
                  title.classList.add("--background");
                }
              },
            },
          }
        );

        gsap.fromTo(
          title.querySelectorAll(".word"),
          {
            "will-change": "opacity",
            opacity: 0.24,
          },
          {
            ease: "none",
            opacity: 1,
            stagger: 0.064,
            delay: () => gsap.utils.random(0.2, 0.4),
            scrollTrigger: {
              trigger: title,
              start: "top bottom-=4vh",
              end: "center center+=4vh",
              scrub: true,
            },
          }
        );
      });
      break;
    case "fx2":
      fx.nodes.forEach((title) => {
        const chars = title.querySelectorAll(".char");

        chars.forEach((char: any) =>
          gsap.set(char.parentNode, { perspective: 1000 })
        );

        gsap.fromTo(
          chars,
          {
            "will-change": "opacity, transform, background-color",
            opacity: 0,
            backgroundColor: "transparent",
            rotateX: () => gsap.utils.random(-160, 160),
            z: () => gsap.utils.random(-240, 240),
            y: () => gsap.utils.random(-120, 120),
            scale: () => gsap.utils.random(0.24, 1.2),
          },
          {
            ease: "none",
            opacity: 1,
            backgroundColor: "var(--pseudo-background)",
            rotateX: 0,
            scale: 1,
            z: 0,
            y: 0,
            stagger: () => gsap.utils.random(0.072, 0.124),
            delay: () => gsap.utils.random(0.6, 1.2),
            scrollTrigger: {
              trigger: title,
              start: "top bottom-=10vh",
              end: "center center+=16vh",
              scrub: true,
            },
          }
        );
      });
      break;
    case "fx3":
      fx.nodes.forEach((title) => {
        const words = [...title.querySelectorAll(".word")];

        words.forEach((word) =>
          gsap.set(word.parentNode, { perspective: 1000 })
        );

        gsap.fromTo(
          words,
          {
            "will-change": "opacity, transform",
            z: () => gsap.utils.random(500, 950),
            opacity: 0,
            xPercent: () => gsap.utils.random(-100, 100),
            yPercent: () => gsap.utils.random(-10, 10),
            rotationX: () => gsap.utils.random(-90, 90),
            scale: () => gsap.utils.random(0.2, 2.4),
          },
          {
            ease: "expo",
            opacity: 1,
            rotationX: 0,
            rotationY: 0,
            xPercent: 0,
            yPercent: 0,
            z: 0,
            scale: 1,
            scrollTrigger: {
              trigger: title,
              start: "center center",
              end: "+=300%",
              scrub: true,
              pin: title.parentNode,
            },
            stagger: {
              each: 0.006,
              from: "random",
            },
          }
        );
      });

      break;
    default:
      break;
  }
};

const scrollGrid = (grid: {
  id: string;
  node: Element | null;
  type: string;
}) => {
  if (grid.node) {
    if (grid.type === "collage") {
      applyCollageAnimation(
        grid.node,
        grid.id,
        [...grid.node.classList].filter((c: string) =>
          c.includes("section--")
        )[0]
      );
    } else if (grid.type === "video") {
      applyVideoAnimation(grid.node, grid.id);
    }
  }
};

const cancelScroll = () => {
  console.log(ScrollTrigger.getAll(), gsap.globalTimeline.getChildren());

  ScrollTrigger.killAll();
  gsap.globalTimeline.clear();

  console.log(ScrollTrigger.getAll(), gsap.globalTimeline.getChildren());
};

const refreshScroll = () => {
  ScrollTrigger.refresh();
};

const scrollTo = (value: number | string) => {
  lenis.scrollTo(value, { lerp: 0.032 });
};

export {
  initSmoothScrolling,
  cancelSmoothScrolling,
  scroll,
  scrollGrid,
  cancelScroll,
  refreshScroll,
  scrollTo,
};
