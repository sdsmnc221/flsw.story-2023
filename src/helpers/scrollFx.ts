import { getGrid } from "./getGrid";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scrolling
let lenis: any;

// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {
  lenis = new Lenis({
    lerp: 0.1,
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

const applyCollageAnimation = (grid: any, animationType: string) => {
  // Child elements of grid
  const gridWrap = grid.querySelector(".grid-wrap");
  const gridItems = grid.querySelectorAll(".grid__item");
  const gridItemsInner = [...gridItems].map((item) =>
    item.querySelector(".grid__item-inner")
  );

  // Define GSAP timeline with ScrollTrigger
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: gridWrap,
      start: "top bottom+=5%",
      end: "bottom top-=5%",
      scrub: true,
    },
  });

  // Apply different animations based on type
  switch (animationType) {
    case "cllg-fx1":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", "120%");
      grid.style.setProperty("--grid-columns", "8");
      grid.style.setProperty("--grid-gap", "0");

      const gridObj = getGrid(gridItems);

      timeline
        .set(gridWrap, {
          rotationX: 50,
        })
        .to(gridWrap, {
          rotationX: 30,
        })
        .fromTo(
          gridItems,
          {
            filter: "brightness(72%) contrast(0.7)",
          },
          {
            filter: "brightness(100%) contrast(2)",
          },
          0
        )
        .to(
          gridObj.rows("even"),
          {
            xPercent: -100,
            ease: "power1",
          },
          0
        )
        .to(
          gridObj.rows("odd"),
          {
            xPercent: 100,
            ease: "power1",
          },
          0
        )
        .addLabel("rowsEnd", ">-=0.15")
        .to(
          gridItems,
          {
            ease: "power1",
            yPercent: () => gsap.utils.random(-100, 200),
          },
          "rowsEnd"
        );
      break;

    default:
      console.error("Unknown animation type.");
      break;
  }
};

// GSAP Scroll Triggers
const scroll = (fx: { id: string; nodes: any[] }, scrollGrid = false) => {
  switch (fx.id) {
    case "fx1":
      function getProgress(t) {
        const currProgress = t;
        console.log(t);
      }

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

                if (progress > 0.2) {
                  if (!title.classList.contains("--background")) {
                    title.classList.add("--background");
                  }
                }

                if (progress > 0.8) {
                  if (title.classList.contains("--background")) {
                    title.classList.remove("--background");
                  }
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
            "will-change": "opacity, transform, backgorund-color",
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
            backgroundColor: "var(--clear-day-white)",
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

const scrollGrid = (grid: { id: string; node: any }) => {
  if (grid.node) {
    applyCollageAnimation(grid.node, grid.id);
  }
};

export { initSmoothScrolling, scroll, scrollGrid };
