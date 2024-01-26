import { getGrid } from "./getGrid";
import isMobile from "./isMobile";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

// Lenis smooth scrolling
let lenis: any;

// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {
  lenis = new Lenis({
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

const applyCollageAnimation = (grid: any, animationType: string) => {
  // Child elements of grid
  const gridWrap = grid.querySelector(".grid-wrap");
  const gridItems = grid.querySelectorAll(".grid__item");
  const gridItemsInner = [...gridItems].map((item) =>
    item.querySelector(".grid__item-inner")
  );

  if (gridItemsInner.length) {
    //
  }

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
      grid.style.setProperty("--grid-width", isMobile() ? "320%" : "100%");
      grid.style.setProperty("--grid-height", "auto");
      grid.style.setProperty("--grid-columns", "4");
      grid.style.setProperty("--grid-gap", "10%");

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
            filter: "brightness(100%) contrast(1)",
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
            ...(isMobile() && { scale: 2 }),
          },
          "rowsEnd"
        );

      break;

    case "cllg-fx2":
    case "cllg-fx3":
    case "cllg-fx4":
      // Default settings for Flip and ScrollTrigger
      let settings = {
        flip: {
          absoluteOnLeave: false,
          absolute: false,
          scale: true,
          simple: true,
          //...
        },
        scrollTrigger: {
          start: "center center",
          end: "+=300%",
        },
        stagger: 0,
      };

      // Merge default settings with options provided when calling the function
      settings = Object.assign(
        {},
        settings,
        animationType === "cllg-fx2"
          ? {
              flip: { absolute: true, scale: false },
              scrollTrigger: { start: "center center", end: "+=320%" },
              stagger: 0.05,
            }
          : {}
      );

      // Select elements within the gallery that will be animated

      const galleryItems = grid.querySelectorAll(".gallery__item");
      const galleryItemsInner = [...galleryItems]
        .map((item) => (item.children.length > 0 ? [...item.children] : []))
        .flat();

      // Temporarily add the final class to capture the final state
      grid.classList.add("gallery--switch");
      const flipstate = Flip.getState([galleryItems], {
        props: "filter, opacity",
      });

      // Remove the final class to revert to the initial state
      grid.classList.remove("gallery--switch");

      // Create the Flip animation timeline
      const tl = Flip.to(flipstate, {
        ease: "none",
        absoluteOnLeave: settings.flip.absoluteOnLeave,
        absolute: settings.flip.absolute,
        scale: settings.flip.scale,
        simple: settings.flip.simple,
        scrollTrigger: {
          trigger: grid,
          start: settings.scrollTrigger.start,
          end: settings.scrollTrigger.end,
          pin: document.querySelector(
            `.text-block.section--${animationType.replace("cllg-fx", "")}`
          ),
          scrub: true,
        },
        stagger: settings.stagger,
      });

      // If there are inner elements in the gallery items, animate them too
      if (galleryItemsInner.length) {
        tl.fromTo(
          galleryItemsInner,
          {
            scale: 2,
          },
          {
            scale: 1,
            scrollTrigger: {
              trigger: grid,
              start: settings.scrollTrigger.start,
              end: settings.scrollTrigger.end,
              scrub: true,
            },
          },
          0
        );
      }
      break;
    case "cllg-fx5":
      let DOM: any = {};
      // flipstate saves the current state of title elements
      let flipstate_ = null;
      DOM.el = grid;

      if (DOM.el !== null) {
        DOM.content = [...DOM.el.querySelectorAll(".content")];
        DOM.svg = DOM.el.querySelector(".content__img");
        DOM.mask = DOM.svg.querySelector(".mask");
        DOM.image = DOM.svg.querySelector("video");

        // Save current state
        flipstate_ = Flip.getState(
          document.querySelector(
            `.text-block.section--${animationType.replace("cllg-fx", "")}`
          )
        );

        // Check if the mask element is a circle or a path
        const isCircle = DOM.mask.tagName.toLowerCase() === "circle";

        // Create the Flip.from that we'll pass into the ScrollTrigger animation property
        const flip = Flip.from(flipstate_, {
          ease: "none",
          simple: true,
        })
          .fromTo(
            DOM.mask,
            {
              attr: isCircle
                ? { r: DOM.mask.getAttribute("r") }
                : { d: DOM.mask.getAttribute("d") },
            },
            {
              ease: "none",
              attr: isCircle
                ? { r: DOM.mask.dataset.valueFinal }
                : { d: DOM.mask.dataset.valueFinal },
            },
            0
          )
          // Also scale up the image element
          .fromTo(
            DOM.image,
            {
              transformOrigin: "50% 50%",
              filter: "brightness(100%)",
            },
            {
              ease: "none",
              scale: isCircle ? 1.2 : 1,
              filter: "brightness(150%)",
            },
            0
          );

        ScrollTrigger.create({
          trigger: grid.querySelector(".content--layout-2"),
          start: "top center",
          end: "+=64%",
          scrub: true,
          animation: flip,
        });
      }

      break;
    default:
      console.error("Unknown animation type.");
      break;
  }
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

const scrollGrid = (grid: { id: string; node: any }) => {
  if (grid.node) {
    applyCollageAnimation(grid.node, grid.id);
  }
};

export { initSmoothScrolling, scroll, scrollGrid };
