import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scrolling
let lenis: any;

// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {
  lenis = new Lenis({
    lerp: 0.2,
    smooth: true,
  } as any);

  lenis.on("scroll", () => ScrollTrigger.update());

  const scrollFn = (time: any) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };

  requestAnimationFrame(scrollFn);
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
            rotate: 3,
          },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: {
              trigger: title,
              start: "top bottom",
              end: "top top",
              scrub: true,
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
            "will-change": "opacity, transform",
            opacity: 0,
            rotateX: () => gsap.utils.random(-120, 120),
            z: () => gsap.utils.random(-200, 200),
          },
          {
            ease: "none",
            opacity: 1,
            rotateX: 0,
            z: 0,
            stagger: 0.072,
            scrollTrigger: {
              trigger: title,
              start: "center bottom",
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
          },
          {
            ease: "expo",
            opacity: 1,
            rotationX: 0,
            rotationY: 0,
            xPercent: 0,
            yPercent: 0,
            z: 0,
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

export { initSmoothScrolling, scroll };
